'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DnaStrand } from '@/components/animations/DnaStrand';
import { HexagonPattern } from '@/components/animations/HexagonPattern';
import { Upload, Search, Users, Shield, Globe, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: 'Secure Storage',
      description: 'Military-grade encryption with decentralized storage on Filecoin'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Access your genomic data from anywhere with programmable permissions'
    },
    {
      icon: Zap,
      title: 'Instant Retrieval',
      description: 'Lightning-fast data access with smart contract verification'
    },
    {
      icon: Users,
      title: 'Data DAO',
      description: 'Collaborative governance for genomic research communities'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 hexagon-pattern opacity-50" />
      <HexagonPattern />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-500 via-green-500 to-violet-500 bg-clip-text text-transparent mb-6">
              Gene-Ledger
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4">
              Unlocking Genomic Data with Filecoin
            </p>
            <p className="text-lg text-gray-500 mb-8">
              Secure. Verifiable. Accessible.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/upload">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 text-lg rounded-2xl shadow-lg">
                <Upload className="mr-2 h-5 w-5" />
                Upload Dataset
              </Button>
            </Link>
            <Link href="/dao">
              <Button size="lg" variant="outline" className="border-2 border-violet-500 text-violet-500 hover:bg-violet-500 hover:text-white px-8 py-4 text-lg rounded-2xl">
                <Users className="mr-2 h-5 w-5" />
                Explore DataDAO
              </Button>
            </Link>
          </motion.div>

          {/* DNA Strand Animation */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
            <DnaStrand />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Revolutionizing Genomic Research
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering researchers with decentralized infrastructure for secure, 
              collaborative genomic data management
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full glassmorphism hover:shadow-xl transition-all duration-300 border-0 rounded-2xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-green-500 text-white mb-4">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-500 via-green-500 to-violet-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Genomic Research?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join the future of decentralized science and contribute to the global genomic commons
            </p>
            <Link href="/retrieve">
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg rounded-2xl shadow-lg">
                <Search className="mr-2 h-5 w-5" />
                Start Exploring
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}