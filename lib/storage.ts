import { Web3Storage, File } from 'web3.storage';

export interface StoredFileMeta {
  cid: string;
  fileName: string;
  size: number;
  createdAt: string;
}

export function getWeb3StorageClient() {
  const token = process.env.WEB3_STORAGE_TOKEN;
  if (!token) {
    throw new Error('WEB3_STORAGE_TOKEN env var missing');
  }
  return new Web3Storage({ token });
}

export async function storeBytesAsFile(bytes: Uint8Array, fileName: string): Promise<StoredFileMeta> {
  const client = getWeb3StorageClient();
  const file = new File([bytes], fileName, { type: 'application/octet-stream' });
  const cid = await client.put([file], { wrapWithDirectory: false });
  return { cid, fileName, size: bytes.byteLength, createdAt: new Date().toISOString() };
}

export async function storeBrowserFile(file: globalThis.File): Promise<StoredFileMeta> {
  const client = getWeb3StorageClient();
  const cid = await client.put([file], { wrapWithDirectory: false });
  return { cid, fileName: file.name, size: file.size, createdAt: new Date().toISOString() };
}


