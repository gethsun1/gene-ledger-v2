import { NextRequest, NextResponse } from 'next/server';
import { setSessionCookie } from '@/lib/auth-server';
import { createDefaultUserProfile, UserProfile } from '@/lib/auth';
import { isFilecoinNetwork } from '@/lib/web3-config';

// In-memory user storage (replace with database in production)
const users = new Map<string, UserProfile>();

export async function POST(request: NextRequest) {
  try {
    const { address, chainId, signature } = await request.json();

    // Validate input
    if (!address || !chainId) {
      return NextResponse.json(
        { error: 'Address and chainId are required' },
        { status: 400 }
      );
    }

    // Validate network (should be Filecoin)
    if (!isFilecoinNetwork(chainId)) {
      return NextResponse.json(
        { error: 'Please connect to Filecoin network' },
        { status: 400 }
      );
    }

    // TODO: Verify signature in production
    // For now, we'll skip signature verification for development
    
    const userKey = `${address.toLowerCase()}-${chainId}`;
    
    // Get or create user profile
    let userProfile = users.get(userKey);
    
    if (!userProfile) {
      // Create new user
      userProfile = createDefaultUserProfile(address, chainId);
      users.set(userKey, userProfile);
    } else {
      // Update last login
      userProfile.lastLoginAt = new Date().toISOString();
      users.set(userKey, userProfile);
    }

    // Set session cookie
    await setSessionCookie(address, chainId);

    // Return user profile (excluding sensitive data)
    return NextResponse.json(userProfile);
  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

// Get all users (for development/admin)
export async function GET() {
  try {
    const allUsers = Array.from(users.values());
    return NextResponse.json(allUsers);
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Failed to get users' },
      { status: 500 }
    );
  }
}
