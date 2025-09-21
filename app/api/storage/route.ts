import { NextResponse } from 'next/server';
import { getIpfsHttpUrl, isCid } from '@/lib/ipfs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cid = searchParams.get('cid');
  const path = searchParams.get('path') || undefined;

  if (!isCid(cid)) {
    return NextResponse.json({ error: 'Invalid CID' }, { status: 400 });
  }

  const url = getIpfsHttpUrl(cid!, path);
  return NextResponse.json({ url });
}


