'use client';

import { useAccount, useConnect, useDisconnect, useBalance, useChainId, useSwitchChain } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { isFilecoinNetwork, getChainById, SUPPORTED_CHAINS } from '@/lib/web3-config';
import { useCallback, useEffect, useState } from 'react';

export interface WalletState {
  // Connection state
  isConnected: boolean;
  isConnecting: boolean;
  address?: string;
  
  // Network state
  chainId?: number;
  isFilecoinNetwork: boolean;
  networkName?: string;
  
  // Balance state
  balance?: string;
  balanceLoading: boolean;
  
  // Actions
  connect: () => void;
  disconnect: () => void;
  switchToFilecoin: () => void;
  
  // Status
  isReady: boolean;
  error?: string;
}

export function useWallet(): WalletState {
  const { address, isConnected, isConnecting } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  
  const [error, setError] = useState<string>();
  
  // Get balance for the current chain
  const { data: balanceData, isLoading: balanceLoading } = useBalance({
    address,
    query: {
      enabled: !!address && isConnected,
    },
  });
  
  // Clear errors when connection state changes
  useEffect(() => {
    if (isConnected) {
      setError(undefined);
    }
  }, [isConnected]);
  
  // Format balance
  const balance = balanceData 
    ? `${parseFloat(balanceData.formatted).toFixed(4)} ${balanceData.symbol}`
    : undefined;
  
  // Get current network info
  const currentChain = chainId ? getChainById(chainId) : undefined;
  const isOnFilecoinNetwork = chainId ? isFilecoinNetwork(chainId) : false;
  
  // Connect function
  const connect = useCallback(() => {
    if (openConnectModal) {
      openConnectModal();
    }
  }, [openConnectModal]);
  
  // Switch to Filecoin network
  const switchToFilecoin = useCallback(async () => {
    try {
      setError(undefined);
      await switchChain({ chainId: SUPPORTED_CHAINS.FILECOIN_CALIBRATION });
    } catch (err) {
      setError('Failed to switch to Filecoin network');
      console.error('Network switch error:', err);
    }
  }, [switchChain]);
  
  // Determine if wallet is ready for use
  const isReady = isConnected && isOnFilecoinNetwork;
  
  return {
    // Connection state
    isConnected,
    isConnecting,
    address,
    
    // Network state
    chainId,
    isFilecoinNetwork: isOnFilecoinNetwork,
    networkName: currentChain?.name,
    
    // Balance state
    balance,
    balanceLoading,
    
    // Actions
    connect,
    disconnect,
    switchToFilecoin,
    
    // Status
    isReady,
    error,
  };
}

// Hook for checking if user needs to switch networks
export function useNetworkCheck() {
  const { chainId, isConnected } = useAccount();
  const { switchChain } = useSwitchChain();
  
  const needsNetworkSwitch = isConnected && chainId && !isFilecoinNetwork(chainId);
  
  const switchToFilecoin = useCallback(async () => {
    if (!switchChain) return;
    
    try {
      await switchChain({ chainId: SUPPORTED_CHAINS.FILECOIN_CALIBRATION });
    } catch (error) {
      console.error('Failed to switch network:', error);
      throw error;
    }
  }, [switchChain]);
  
  return {
    needsNetworkSwitch,
    switchToFilecoin,
    currentChainId: chainId,
    isFilecoinNetwork: chainId ? isFilecoinNetwork(chainId) : false,
  };
}

// Hook for wallet-related utilities
export function useWalletUtils() {
  const { address, chainId } = useAccount();
  
  const shortenAddress = useCallback((addr?: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }, []);
  
  const getExplorerUrl = useCallback((hash: string, type: 'tx' | 'address' = 'tx') => {
    if (!chainId) return '';
    
    const chain = getChainById(chainId);
    const baseUrl = chain.blockExplorers?.default.url;
    
    if (!baseUrl) return '';
    
    if (isFilecoinNetwork(chainId)) {
      return type === 'tx' ? `${baseUrl}/en/message/${hash}` : `${baseUrl}/en/address/${hash}`;
    }
    
    return type === 'tx' ? `${baseUrl}/tx/${hash}` : `${baseUrl}/address/${hash}`;
  }, [chainId]);
  
  return {
    shortenAddress,
    getExplorerUrl,
    currentAddress: address,
    shortAddress: shortenAddress(address),
  };
}


