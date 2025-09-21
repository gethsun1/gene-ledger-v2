'use client';

import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt, useSimulateContract } from 'wagmi';
import { parseEther } from 'viem';
import { datasetRegistryAbi } from '@/abis/datasetRegistry';

export function useRegistryAddress() {
  const address = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS as `0x${string}` | undefined;
  return address;
}

export function useRegisterDataset() {
  const registry = useRegistryAddress();
  const { address } = useAccount();
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash });

  async function register({ title, description, cid, priceFil, accessLevel }: { title: string; description: string; cid: string; priceFil: string; accessLevel: string; }) {
    if (!registry) throw new Error('Registry address not configured');
    const priceWei = parseEther(priceFil || '0');
    return await writeContractAsync({
      address: registry,
      abi: datasetRegistryAbi,
      functionName: 'registerDataset',
      args: [title, description, cid, priceWei, accessLevel],
    });
  }

  return { register, hash, receipt, isPending, error, account: address };
}

export function usePurchaseAccess(datasetId?: bigint, priceWei?: bigint) {
  const registry = useRegistryAddress();
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash });

  async function purchase() {
    if (!registry || !datasetId) throw new Error('Missing registry or datasetId');
    return await writeContractAsync({
      address: registry,
      abi: datasetRegistryAbi,
      functionName: 'purchaseAccess',
      args: [datasetId],
      value: priceWei,
    });
  }

  return { purchase, hash, receipt, isPending, error };
}

export function useWithdrawEscrow() {
  const registry = useRegistryAddress();
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash });
  async function withdraw() {
    if (!registry) throw new Error('Registry not configured');
    return await writeContractAsync({ address: registry, abi: datasetRegistryAbi, functionName: 'withdraw' });
  }
  return { withdraw, hash, receipt, isPending, error };
}

export function useCanAccess(user?: `0x${string}`, datasetId?: bigint) {
  const registry = useRegistryAddress();
  const { data, refetch, isFetching, error } = useReadContract({
    address: registry,
    abi: datasetRegistryAbi,
    functionName: 'canAccess',
    args: user && datasetId ? [user, datasetId] : undefined,
    query: { enabled: !!(registry && user && datasetId) },
  });
  return { canAccess: (data as boolean) || false, refetch, isFetching, error };
}


