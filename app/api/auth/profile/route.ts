import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-server';
import { UserProfile } from '@/lib/auth';

// In-memory user storage (same as signin route - should be shared DB in production)
const users = new Map<string, UserProfile>();

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const userKey = `${session.address}-${session.chainId}`;
    const userProfile = users.get(userKey);

    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Failed to get profile' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const updates = await request.json();
    const userKey = `${session.address}-${session.chainId}`;
    const userProfile = users.get(userKey);

    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    // Validate and apply updates (prevent updating sensitive fields)
    const allowedUpdates = ['preferences', 'ensName', 'avatar'];
    const updatedProfile = { ...userProfile };

    for (const [key, value] of Object.entries(updates)) {
      if (allowedUpdates.includes(key)) {
        (updatedProfile as any)[key] = value;
      }
    }

    users.set(userKey, updatedProfile);

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
