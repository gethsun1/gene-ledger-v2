export function getIpfsGatewayBase(): string {
  return process.env.NEXT_PUBLIC_IPFS_GATEWAY || 'https://ipfs.io/ipfs/';
}

export function getIpfsHttpUrl(cid: string, path?: string): string {
  const base = getIpfsGatewayBase().replace(/\/$/, '/');
  const suffix = path ? `/${encodeURIComponent(path)}` : '';
  return `${base}${cid}${suffix}`;
}

export function isCid(value?: string | null): boolean {
  if (!value) return false;
  // Basic CID v0/v1 check (len + base58/base32 chars)
  return /^[a-zA-Z0-9]+$/.test(value) && value.length >= 46;
}


