// User profile interface
export interface UserProfile {
  address: string;
  chainId: number;
  ensName?: string;
  avatar?: string;
  joinedAt: string;
  lastLoginAt: string;
  role: 'user' | 'researcher' | 'admin';
  reputation: number;
  datasetsUploaded: number;
  datasetsDownloaded: number;
  totalStaked: string; // FIL amount
  preferences: {
    notifications: boolean;
    publicProfile: boolean;
    dataSharing: boolean;
  };
}

// Client-side session management
export class ClientAuth {
  private static instance: ClientAuth;
  private userProfile: UserProfile | null = null;
  private listeners: Set<(profile: UserProfile | null) => void> = new Set();

  static getInstance(): ClientAuth {
    if (!ClientAuth.instance) {
      ClientAuth.instance = new ClientAuth();
    }
    return ClientAuth.instance;
  }

  // Subscribe to auth state changes
  subscribe(listener: (profile: UserProfile | null) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // Notify all listeners of auth state change
  private notify(): void {
    this.listeners.forEach(listener => listener(this.userProfile));
  }

  // Sign in user with wallet address
  async signIn(address: string, chainId: number, signature?: string): Promise<UserProfile> {
    try {
      // Call our API to create/update user session
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, chainId, signature }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const profile: UserProfile = await response.json();
      this.userProfile = profile;
      this.notify();
      
      return profile;
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  }

  // Sign out user
  async signOut(): Promise<void> {
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      this.userProfile = null;
      this.notify();
    }
  }

  // Get current user profile
  async getProfile(): Promise<UserProfile | null> {
    if (this.userProfile) return this.userProfile;

    try {
      const response = await fetch('/api/auth/profile');
      if (response.ok) {
        this.userProfile = await response.json();
        this.notify();
      }
    } catch (error) {
      console.error('Failed to get profile:', error);
    }

    return this.userProfile;
  }

  // Update user profile
  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Profile update failed');
      }

      const updatedProfile: UserProfile = await response.json();
      this.userProfile = updatedProfile;
      this.notify();
      
      return updatedProfile;
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.userProfile !== null;
  }

  // Get current user
  getCurrentUser(): UserProfile | null {
    return this.userProfile;
  }
}

// Default user profile factory
export function createDefaultUserProfile(address: string, chainId: number): UserProfile {
  const now = new Date().toISOString();
  
  return {
    address: address.toLowerCase(),
    chainId,
    joinedAt: now,
    lastLoginAt: now,
    role: 'user',
    reputation: 0,
    datasetsUploaded: 0,
    datasetsDownloaded: 0,
    totalStaked: '0',
    preferences: {
      notifications: true,
      publicProfile: false,
      dataSharing: false,
    },
  };
}

// Message for wallet signature
export function getSignatureMessage(address: string, nonce: string): string {
  return `Welcome to Gene-Ledger!

This signature is used to verify your wallet ownership.

Address: ${address}
Nonce: ${nonce}

This request will not trigger a blockchain transaction or cost any gas fees.`;
}
