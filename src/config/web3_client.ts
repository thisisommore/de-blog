import { createPublicClient, http } from "viem";
import { polygonMumbai } from "viem/chains";

if (!process.env.RPC_URL) throw new Error("RPC_URL is required")
export const web3_public_client = createPublicClient({
    chain: polygonMumbai,
    transport: http(process.env.RPC_URL),
})