"use client"
import { getContract } from "viem";
import { WalletClient, usePublicClient, useWalletClient } from "wagmi";
import BlogABI from "./abis/BlogABI";

export const get_blog_contract = (walletClient: WalletClient) => getContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: BlogABI,
    walletClient
})

export const useBlogContract = () => {
    const { data: walletClient } = useWalletClient();
    const publicClient = usePublicClient();
    if (!walletClient) return

    return getContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: BlogABI,
        walletClient,
        publicClient
    });
}
