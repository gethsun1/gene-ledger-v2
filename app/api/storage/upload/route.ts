import { NextRequest, NextResponse } from 'next/server';
import { storeBytesAsFile } from '@/lib/storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get('file');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    const fileName = (file as any).name || 'dataset.bin';

    const meta = await storeBytesAsFile(bytes, fileName);

    return NextResponse.json({
      cid: meta.cid,
      fileName: meta.fileName,
      size: meta.size,
      createdAt: meta.createdAt,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Upload failed' }, { status: 500 });
  }
}


