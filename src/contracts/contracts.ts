import { PublicClient, getContract, WalletClient } from "viem"
import BlogABI from "./abis/BlogABI"

export const get_read_blog_contract = (publicClient: PublicClient) => getContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: BlogABI,
    publicClient
})

