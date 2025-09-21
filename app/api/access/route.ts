import { NextRequest, NextResponse } from 'next/server';

// Placeholder access check: always allow Open, require auth/payment for others in future
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const datasetId = searchParams.get('datasetId');
  const accessLevel = searchParams.get('accessLevel');

  if (!datasetId || !accessLevel) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 });
  }

  const allowed = accessLevel === 'Open';
  return NextResponse.json({ allowed });
}


