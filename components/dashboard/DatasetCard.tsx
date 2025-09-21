'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Calendar, HardDrive, Coins } from 'lucide-react';
import { Dataset } from '@/types/dataset';
import { getIpfsHttpUrl, isCid } from '@/lib/ipfs';
import { useAccount } from 'wagmi';
import { useCanAccess, usePurchaseAccess } from '@/hooks/useRegistry';

interface DatasetCardProps {
  dataset: Dataset;
}

export function DatasetCard({ dataset }: DatasetCardProps) {
  const { address } = useAccount();
  const datasetId = BigInt(dataset.id);
  const priceWei = BigInt(Math.floor(dataset.price * 1e18));
  const { canAccess } = useCanAccess(address as any, datasetId);
  const { purchase, isPending } = usePurchaseAccess(datasetId, priceWei);

  const handleRetrieve = async () => {
    if (dataset.cid && isCid(dataset.cid)) {
      const url = getIpfsHttpUrl(dataset.cid);
      window.open(url, '_blank');
      return;
    }
    // Fallback to mock behavior
    console.log('No CID available for dataset:', dataset.id);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="glassmorphism border-0 rounded-2xl hover:shadow-xl transition-all duration-300 h-full">
        <CardHeader>
          <CardTitle className="text-lg mb-2 line-clamp-2">
            {dataset.title}
          </CardTitle>
          <CardDescription className="text-sm line-clamp-3">
            {dataset.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <HardDrive className="h-4 w-4" />
              <span>{formatFileSize(dataset.fileSize)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(dataset.uploadDate)}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {dataset.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-full text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Price and Retrieve Button */}
          <div className="pt-4 border-t border-gray-200/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Coins className="h-4 w-4 text-yellow-500" />
                <span className="font-semibold">{dataset.price} FIL</span>
              </div>
              <Badge variant="outline" className="rounded-full">
                {dataset.accessLevel}
              </Badge>
            </div>
            {canAccess ? (
              <Button 
                onClick={handleRetrieve}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl"
              >
                <Download className="mr-2 h-4 w-4" />
                Retrieve Dataset
              </Button>
            ) : (
              <Button 
                onClick={() => purchase()}
                disabled={isPending}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl"
              >
                {isPending ? 'Purchasing...' : `Purchase Access (${dataset.price} FIL)`}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}