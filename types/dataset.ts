export interface Dataset {
  id: string;
  title: string;
  description: string;
  fileSize: number;
  uploadDate: string;
  tags: string[];
  price: number;
  accessLevel: 'Open' | 'Standard' | 'Premium';
  uploader: string;
  dataType: 'CSV' | 'JSON';
  cid?: string; // IPFS CID when stored
}

export interface UploadFormData {
  title: string;
  description: string;
  tags: string[];
  file: File;
}