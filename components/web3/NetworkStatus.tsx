'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  CheckCircle, 
  ExternalLink,
  Wallet,
  Network
} from 'lucide-react';
import { useWallet, useWalletUtils } from '@/hooks/useWallet';
import { useAuth } from '@/hooks/useAuth';
import { getChainById } from '@/lib/web3-config';

interface NetworkStatusProps {
  className?: string;
  showDetails?: boolean;
}

export function NetworkStatus({ className, showDetails = true }: NetworkStatusProps) {
  const wallet = useWallet();
  const { getExplorerUrl } = useWalletUtils();
  const { isAuthenticated, user } = useAuth();

  const getStatusIcon = () => {
    if (!wallet.isConnected) return <WifiOff className="h-5 w-5 text-gray-400" />;
    if (!wallet.isFilecoinNetwork) return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    if (!isAuthenticated) return <Wallet className="h-5 w-5 text-blue-500" />;
    return <CheckCircle className="h-5 w-5 text-green-500" />;
  };

  const getStatusText = () => {
    if (!wallet.isConnected) return 'Wallet not connected';
    if (!wallet.isFilecoinNetwork) return 'Switch to Filecoin network';
    if (!isAuthenticated) return 'Sign in to continue';
    return 'Ready to use Gene-Ledger';
  };

  const getStatusColor = () => {
    if (!wallet.isConnected) return 'text-gray-600';
    if (!wallet.isFilecoinNetwork) return 'text-orange-600';
    if (!isAuthenticated) return 'text-blue-600';
    return 'text-green-600';
  };

  const currentChain = wallet.chainId ? getChainById(wallet.chainId) : null;

  if (!showDetails) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {getStatusIcon()}
        <span className={`text-sm font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="glassmorphism border-0 rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {getStatusIcon()}
              <div>
                <h3 className={`font-semibold ${getStatusColor()}`}>
                  {getStatusText()}
                </h3>
                <p className="text-sm text-gray-500">
                  Connection status
                </p>
              </div>
            </div>
            
            {wallet.isConnected && (
              <Badge 
                variant={wallet.isFilecoinNetwork ? "default" : "destructive"}
                className="rounded-full"
              >
                {wallet.isFilecoinNetwork ? 'Filecoin' : 'Wrong Network'}
              </Badge>
            )}
          </div>

          {wallet.isConnected && (
            <div className="space-y-4">
              {/* Network Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Network className="h-4 w-4" />
                    Network
                  </div>
                  <p className="font-medium text-sm">
                    {currentChain?.name || 'Unknown'}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Wallet className="h-4 w-4" />
                    Address
                  </div>
                  <p className="font-medium text-sm">
                    {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
                  </p>
                </div>
                
                {wallet.balance && (
                  <>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Balance</p>
                      <p className="font-medium text-sm">{wallet.balance}</p>
                    </div>
                  </>
                )}
                
                {isAuthenticated && user && (
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">Reputation</p>
                    <p className="font-medium text-sm">{user.reputation}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                {!wallet.isFilecoinNetwork && (
                  <Button
                    onClick={wallet.switchToFilecoin}
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
                  >
                    <Network className="h-4 w-4 mr-2" />
                    Switch Network
                  </Button>
                )}
                
                {wallet.address && currentChain?.blockExplorers && (
                  <Button
                    onClick={() => window.open(getExplorerUrl(wallet.address!, 'address'), '_blank')}
                    size="sm"
                    variant="outline"
                    className="rounded-xl"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Explorer
                  </Button>
                )}
              </div>

              {/* Error Display */}
              {wallet.error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">Error</span>
                  </div>
                  <p className="text-sm text-red-600 mt-1">{wallet.error}</p>
                </div>
              )}
            </div>
          )}

          {/* Connection Steps for Disconnected State */}
          {!wallet.isConnected && (
            <div className="space-y-3 mt-4">
              <h4 className="font-medium text-sm text-gray-700">
                To get started:
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-medium flex items-center justify-center">
                    1
                  </div>
                  Connect your wallet (MetaMask, WalletConnect)
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-medium flex items-center justify-center">
                    2
                  </div>
                  Switch to Filecoin network
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-medium flex items-center justify-center">
                    3
                  </div>
                  Sign in to authenticate your account
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}


