'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Settings, 
  Trophy, 
  Upload, 
  Download, 
  Coins,
  Calendar,
  Shield,
  Bell,
  Eye,
  Share
} from 'lucide-react';
import { useAuth, useUserStats } from '@/hooks/useAuth';
import { useWalletUtils } from '@/hooks/useWallet';
import { UserProfile as UserProfileType } from '@/lib/auth';

interface UserProfileProps {
  className?: string;
}

export function UserProfile({ className }: UserProfileProps) {
  const { user, updateProfile, isLoading } = useAuth();
  const { shortenAddress, getExplorerUrl } = useWalletUtils();
  const stats = useUserStats();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfileType>>({});

  if (!user) {
    return (
      <Card className={`glassmorphism border-0 rounded-2xl ${className}`}>
        <CardContent className="p-8 text-center">
          <User className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            No Profile Found
          </h3>
          <p className="text-gray-500">
            Please connect your wallet and sign in to view your profile.
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleEdit = () => {
    setFormData({
      ensName: user.ensName,
      avatar: user.avatar,
      preferences: { ...user.preferences },
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleCancel = () => {
    setFormData({});
    setIsEditing(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'researcher': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="glassmorphism border-0 rounded-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                User Profile
              </CardTitle>
              <Button
                onClick={isEditing ? handleCancel : handleEdit}
                variant="outline"
                size="sm"
                className="rounded-xl"
              >
                <Settings className="h-4 w-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar and Basic Info */}
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-lg">
                  {user.address.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-semibold">
                    {user.ensName || shortenAddress(user.address)}
                  </h2>
                  <Badge className={`${getRoleColor(user.role)} text-white rounded-full`}>
                    {user.role}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  {shortenAddress(user.address)}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    <span>{stats.reputation} reputation</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {stats.joinedDaysAgo} days ago</span>
                  </div>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
                <div className="space-y-2">
                  <Label htmlFor="ensName">ENS Name</Label>
                  <Input
                    id="ensName"
                    placeholder="yourname.eth"
                    value={formData.ensName || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, ensName: e.target.value }))}
                    className="rounded-xl"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <Input
                    id="avatar"
                    placeholder="https://..."
                    value={formData.avatar || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
                    className="rounded-xl"
                  />
                </div>
                
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-xl"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <Card className="glassmorphism border-0 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-violet-500" />
              Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <Upload className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">
                  {stats.datasetsUploaded}
                </div>
                <div className="text-sm text-gray-600">Datasets Uploaded</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <Download className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">
                  {stats.datasetsDownloaded}
                </div>
                <div className="text-sm text-gray-600">Datasets Downloaded</div>
              </div>
              
              <div className="text-center p-4 bg-violet-50 rounded-xl">
                <Trophy className="h-8 w-8 text-violet-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-violet-600">
                  {stats.reputation}
                </div>
                <div className="text-sm text-gray-600">Reputation</div>
              </div>
              
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <Coins className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">
                  {parseFloat(stats.totalStaked).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">FIL Staked</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Card className="glassmorphism border-0 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              Privacy & Preferences
            </CardTitle>
            <CardDescription>
              Manage your privacy settings and notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-500" />
                <div>
                  <Label className="text-sm font-medium">Notifications</Label>
                  <p className="text-xs text-gray-500">Receive email notifications for important updates</p>
                </div>
              </div>
              <Switch
                checked={user.preferences.notifications}
                onCheckedChange={(checked) => 
                  updateProfile({ 
                    preferences: { ...user.preferences, notifications: checked }
                  })
                }
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-gray-500" />
                <div>
                  <Label className="text-sm font-medium">Public Profile</Label>
                  <p className="text-xs text-gray-500">Make your profile visible to other users</p>
                </div>
              </div>
              <Switch
                checked={user.preferences.publicProfile}
                onCheckedChange={(checked) => 
                  updateProfile({ 
                    preferences: { ...user.preferences, publicProfile: checked }
                  })
                }
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Share className="h-5 w-5 text-gray-500" />
                <div>
                  <Label className="text-sm font-medium">Data Sharing</Label>
                  <p className="text-xs text-gray-500">Allow sharing of anonymized usage data for research</p>
                </div>
              </div>
              <Switch
                checked={user.preferences.dataSharing}
                onCheckedChange={(checked) => 
                  updateProfile({ 
                    preferences: { ...user.preferences, dataSharing: checked }
                  })
                }
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}


