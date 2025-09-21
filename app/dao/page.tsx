'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Database, 
  Coins, 
  Vote, 
  Clock, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  FileText,
  Crown
} from 'lucide-react';
import { useWithdrawEscrow } from '@/hooks/useRegistry';

const daoMetrics = {
  totalDatasets: 1247,
  totalFilStored: 2845.67,
  activeMembers: 342,
  monthlyGrowth: 23.5
};

const proposals = [
  {
    id: 1,
    title: "Increase Storage Incentives for Rare Disease Data",
    description: "Proposal to increase FIL rewards for uploading rare disease genomic datasets to encourage more diverse data contributions.",
    status: "active",
    votesFor: 156,
    votesAgainst: 23,
    endDate: "2024-02-15",
    proposer: "Dr. Sarah Chen"
  },
  {
    id: 2,
    title: "Implement Zero-Knowledge Proof Verification",
    description: "Add ZK-proof system for dataset verification without revealing sensitive information.",
    status: "passed",
    votesFor: 203,
    votesAgainst: 45,
    endDate: "2024-01-28",
    proposer: "Research Consortium"
  },
  {
    id: 3,
    title: "Create Research Grant Pool",
    description: "Establish a community fund to support genomic research projects using DAO treasury.",
    status: "pending",
    votesFor: 89,
    votesAgainst: 12,
    endDate: "2024-02-20",
    proposer: "Dr. Marcus Williams"
  }
];

const members = [
  { name: "Dr. Sarah Chen", avatar: "SC", contributions: 47, role: "Core Researcher", reputation: 2450 },
  { name: "Dr. Marcus Williams", avatar: "MW", contributions: 35, role: "Data Scientist", reputation: 1890 },
  { name: "Research Consortium", avatar: "RC", contributions: 82, role: "Institution", reputation: 3200 },
  { name: "Dr. Emily Rodriguez", avatar: "ER", contributions: 28, role: "Bioinformatician", reputation: 1650 },
  { name: "Dr. James Park", avatar: "JP", contributions: 41, role: "Geneticist", reputation: 2100 },
  { name: "Dr. Anna Kowalski", avatar: "AK", contributions: 33, role: "Researcher", reputation: 1750 }
];

export default function DaoPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const { withdraw, isPending } = useWithdrawEscrow();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500';
      case 'passed': return 'bg-green-500';
      case 'pending': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Vote className="h-4 w-4" />;
      case 'passed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <XCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-violet-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Gene-Ledger DAO Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Collaborative governance for the global genomic research community
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/50 rounded-2xl p-1">
              <TabsTrigger value="overview" className="rounded-xl">Overview</TabsTrigger>
              <TabsTrigger value="governance" className="rounded-xl">Governance</TabsTrigger>
              <TabsTrigger value="members" className="rounded-xl">Members</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Metrics Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="glassmorphism border-0 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Datasets</p>
                        <p className="text-2xl font-bold text-gray-900">{daoMetrics.totalDatasets.toLocaleString()}</p>
                      </div>
                      <Database className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glassmorphism border-0 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">FIL Stored</p>
                        <p className="text-2xl font-bold text-gray-900">{daoMetrics.totalFilStored.toLocaleString()}</p>
                      </div>
                      <Coins className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glassmorphism border-0 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Active Members</p>
                        <p className="text-2xl font-bold text-gray-900">{daoMetrics.activeMembers}</p>
                      </div>
                      <Users className="h-8 w-8 text-violet-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glassmorphism border-0 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Monthly Growth</p>
                        <p className="text-2xl font-bold text-gray-900">+{daoMetrics.monthlyGrowth}%</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="glassmorphism border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle>Recent DAO Activity</CardTitle>
                  <CardDescription>Latest contributions and governance actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "New proposal submitted", user: "Dr. Sarah Chen", time: "2 hours ago" },
                      { action: "Dataset uploaded", user: "Research Consortium", time: "4 hours ago" },
                      { action: "Governance vote completed", user: "Community", time: "1 day ago" },
                      { action: "New member joined", user: "Dr. Alex Thompson", time: "2 days ago" }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span className="text-sm text-gray-700">{activity.action}</span>
                          <Badge variant="outline" className="rounded-full">{activity.user}</Badge>
                        </div>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Withdraw Escrow */}
              <Card className="glassmorphism border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle>Withdraw Escrow</CardTitle>
                  <CardDescription>Claim your earned FIL from dataset sales</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Withdraw all available escrow to your wallet.</p>
                    <Button onClick={() => withdraw()} disabled={isPending} className="rounded-xl">
                      {isPending ? 'Withdrawing...' : 'Withdraw'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="governance" className="space-y-6">
              <div className="grid gap-6">
                {proposals.map((proposal, index) => (
                  <motion.div
                    key={proposal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <Card className="glassmorphism border-0 rounded-2xl">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="flex items-center gap-2 mb-2">
                              {getStatusIcon(proposal.status)}
                              {proposal.title}
                            </CardTitle>
                            <CardDescription className="text-sm mb-3">
                              {proposal.description}
                            </CardDescription>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>Proposed by {proposal.proposer}</span>
                              <span>Ends {proposal.endDate}</span>
                            </div>
                          </div>
                          <Badge className={`${getStatusColor(proposal.status)} text-white rounded-full`}>
                            {proposal.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-green-600">For: {proposal.votesFor}</span>
                            <span className="text-red-600">Against: {proposal.votesAgainst}</span>
                          </div>
                          <Progress 
                            value={(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100} 
                            className="h-2"
                          />
                          {proposal.status === 'active' && (
                            <div className="flex gap-2">
                              <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-xl">
                                Vote For
                              </Button>
                              <Button variant="outline" className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-xl">
                                Vote Against
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="members" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <Card className="glassmorphism border-0 rounded-2xl hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.avatar}`} />
                            <AvatarFallback>{member.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                              {member.name}
                              {member.reputation > 2000 && <Crown className="h-4 w-4 text-yellow-500" />}
                            </h3>
                            <p className="text-sm text-gray-600">{member.role}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Contributions</span>
                            <span className="font-semibold">{member.contributions}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Reputation</span>
                            <span className="font-semibold text-blue-600">{member.reputation.toLocaleString()}</span>
                          </div>
                          <Progress value={(member.contributions / 100) * 100} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}