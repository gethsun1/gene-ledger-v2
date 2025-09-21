'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { ClientAuth, UserProfile, getSignatureMessage } from '@/lib/auth';
import { useWallet } from './useWallet';

interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

interface AuthActions {
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  clearError: () => void;
}

export interface UseAuthReturn extends AuthState, AuthActions {}

export function useAuth(): UseAuthReturn {
  const { address, chainId } = useAccount();
  const { isReady } = useWallet();
  const { signMessageAsync } = useSignMessage();
  
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  const auth = ClientAuth.getInstance();

  // Load user profile on mount and wallet connection
  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        const profile = await auth.getProfile();
        
        if (mounted) {
          setState(prev => ({
            ...prev,
            user: profile,
            isAuthenticated: !!profile,
            isLoading: false,
          }));
        }
      } catch (error) {
        if (mounted) {
          setState(prev => ({
            ...prev,
            error: 'Failed to load user profile',
            isLoading: false,
          }));
        }
      }
    };

    loadProfile();

    // Subscribe to auth state changes
    const unsubscribe = auth.subscribe((profile) => {
      if (mounted) {
        setState(prev => ({
          ...prev,
          user: profile,
          isAuthenticated: !!profile,
        }));
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [address, chainId]);

  // Sign in with wallet signature
  const signIn = useCallback(async () => {
    if (!address || !chainId || !isReady) {
      setState(prev => ({ ...prev, error: 'Wallet not connected or not on Filecoin network' }));
      return;
    }

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      // Generate nonce (in production, get this from server)
      const nonce = Math.random().toString(36).substring(2, 15);
      const message = getSignatureMessage(address, nonce);

      // Request wallet signature
      const signature = await signMessageAsync({ message });

      // Authenticate with server
      const profile = await auth.signIn(address, chainId, signature);

      setState(prev => ({
        ...prev,
        user: profile,
        isAuthenticated: true,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Sign in error:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Authentication failed',
        isLoading: false,
      }));
    }
  }, [address, chainId, isReady, signMessageAsync]);

  // Sign out
  const signOut = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      await auth.signOut();
      
      setState(prev => ({
        ...prev,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Sign out error:', error);
      setState(prev => ({
        ...prev,
        error: 'Sign out failed',
        isLoading: false,
      }));
    }
  }, []);

  // Update user profile
  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    if (!state.isAuthenticated) {
      setState(prev => ({ ...prev, error: 'Not authenticated' }));
      return;
    }

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const updatedProfile = await auth.updateProfile(updates);
      
      setState(prev => ({
        ...prev,
        user: updatedProfile,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Profile update error:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Profile update failed',
        isLoading: false,
      }));
    }
  }, [state.isAuthenticated]);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    signIn,
    signOut,
    updateProfile,
    clearError,
  };
}

// Hook for checking authentication status
export function useAuthGuard() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { isReady } = useWallet();

  const canUpload = isAuthenticated && isReady;
  const canDownload = isAuthenticated && isReady;
  const canVote = isAuthenticated && isReady && (user?.reputation || 0) >= 100;
  const canCreateProposal = isAuthenticated && isReady && (user?.reputation || 0) >= 500;

  return {
    isAuthenticated,
    isLoading,
    canUpload,
    canDownload,
    canVote,
    canCreateProposal,
    user,
    isReady,
  };
}

// Hook for user statistics
export function useUserStats() {
  const { user } = useAuth();

  if (!user) {
    return {
      reputation: 0,
      datasetsUploaded: 0,
      datasetsDownloaded: 0,
      totalStaked: '0',
      joinedDaysAgo: 0,
      role: 'user' as const,
    };
  }

  const joinedDaysAgo = Math.floor(
    (Date.now() - new Date(user.joinedAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return {
    reputation: user.reputation,
    datasetsUploaded: user.datasetsUploaded,
    datasetsDownloaded: user.datasetsDownloaded,
    totalStaked: user.totalStaked,
    joinedDaysAgo,
    role: user.role,
  };
}
