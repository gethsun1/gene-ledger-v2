'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UploadDropzone } from '@/components/forms/UploadDropzone';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Tag, Loader2, Coins, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getIpfsHttpUrl } from '@/lib/ipfs';
import { useRegisterDataset } from '@/hooks/useRegistry';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [priceFil, setPriceFil] = useState('0');
  const [accessLevel, setAccessLevel] = useState<'Open' | 'Standard' | 'Premium'>('Open');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const { register, isPending: isRegistering } = useRegisterDataset();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !title) {
      toast({
        title: "Missing Information",
        description: "Please provide a file and title for your dataset.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(10);

      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/storage/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      setUploadProgress(80);
      const data = await res.json();
      const cid = data.cid as string;

      setUploadProgress(100);

      // Register on-chain (price 0 for now; could add UI input for price)
      try {
        await register({ title, description, cid, priceFil: priceFil || '0', accessLevel });
        toast({ title: 'Registered on-chain ✅', description: `CID: ${cid}` });
      } catch (e: any) {
        toast({ title: 'On-chain registration failed', description: e?.message || 'Unknown error', variant: 'destructive' });
      }

      // Optional: open gateway link in a new tab
      const url = getIpfsHttpUrl(cid);
      console.log('Stored at:', url);

      // Reset form
      setFile(null);
      setTitle('');
      setDescription('');
      setTags('');
    } catch (err: any) {
      toast({
        title: 'Upload failed',
        description: err?.message || 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-violet-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upload Your Genomic Dataset
          </h1>
          <p className="text-lg text-gray-600">
            Securely store your genetic data on Filecoin with programmable access controls
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="glassmorphism border-0 rounded-2xl shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-blue-500" />
                Dataset Information
              </CardTitle>
              <CardDescription>
                Provide details about your genomic dataset for the research community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="file">Dataset File</Label>
                <UploadDropzone onFileSelect={handleFileSelect} selectedFile={file} />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., GWAS Study - Type 2 Diabetes Susceptibility"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of your genomic dataset, methodology, and research context..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="rounded-xl min-h-[120px]"
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags" className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Tags (comma-separated)
                </Label>
                <Input
                  id="tags"
                  placeholder="e.g., GWAS, diabetes, SNP, population-genetics"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              {/* Price (FIL) */}
              <div className="space-y-2">
                <Label htmlFor="price" className="flex items-center gap-2">
                  <Coins className="h-4 w-4" />
                  Price (FIL)
                </Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.0001"
                  placeholder="0"
                  value={priceFil}
                  onChange={(e) => setPriceFil(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              {/* Access Level */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Access Level
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Open','Standard','Premium'] as const).map(level => (
                    <Button
                      key={level}
                      type="button"
                      variant={accessLevel === level ? 'default' : 'outline'}
                      onClick={() => setAccessLevel(level)}
                      className="rounded-xl"
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <Label>Upload Progress</Label>
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-sm text-gray-600">
                    Uploading to Filecoin... {Math.round(uploadProgress)}%
                  </p>
                </div>
              )}

              {/* Upload Button */}
              <Button
                onClick={handleUpload}
                disabled={!file || !title || isUploading}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white py-6 text-lg rounded-2xl shadow-lg"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Uploading to Filecoin...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-5 w-5" />
                    Upload to Filecoin
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}