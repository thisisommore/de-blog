"use client"
import { BaseError, getContract } from "viem";
import { WalletClient, usePublicClient, useWaitForTransaction, useWalletClient } from "wagmi";
import BlogABI from "./abis/BlogABI";
import { useState } from "react";
import toast from "react-hot-toast";

export const get_blog_contract = (walletClient: WalletClient) => getContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: BlogABI,
    walletClient
})

export const useBlogContract = () => {
    const { data: wallet } = useWalletClient();
    const publicClient = usePublicClient();
    const [loading, setLoading] = useState(false)
    if (!wallet) return { deletePost: undefined, createPost: undefined, loading: undefined, wallet }


    const blogContract = getContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: BlogABI,
        walletClient: wallet,
        publicClient
    })

    const deletePost = async (postId: bigint) => {
        setLoading(true)
        try {
            const txhash = await blogContract.write.deletePost([postId])
            const transaction = await publicClient.waitForTransactionReceipt(
                { hash: txhash }
            )
            if (transaction.status == "reverted") {
                toast.error("failed to delete post: reverted")
                return
            }
            toast.success("post deleted")
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }

    const createPost = async (title: string, content: string) => {
        setLoading(true)
        try {
            const txhash = await blogContract.write.createPost([title, content])
            let postId: bigint | undefined;
            const transaction = await publicClient.waitForTransactionReceipt(
                { hash: txhash }
            )
            const events = await blogContract.getEvents.PostCreated({ blockHash: transaction.blockHash })
            postId = events[0].args.id
            if (transaction.status == "reverted") {
                toast.error("failed to create post: reverted")
                return
            }

            toast.success("post created")
            return postId;
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }
    return { deletePost, createPost, loading, wallet };
}

const handleError = (error: unknown) => {
    if (error instanceof BaseError)
        toast.error(error.shortMessage)
    else {
        toast.error("unexpected error occured")
        throw error
    }
}