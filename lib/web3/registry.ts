import { REGISTRY_ABI } from "../registryAbi";
import type { BrowserProvider, Contract } from "ethers";

declare global {
  interface Window {
    ethereum?: {
      request: (args: {
        method: string;
        params?: unknown[];
      }) => Promise<unknown>;
      on: (event: string, callback: (...args: unknown[]) => void) => void;
      removeListener: (
        event: string,
        callback: (...args: unknown[]) => void
      ) => void;
      isMetaMask?: boolean;
    };
  }
}

/**
 * Get the contract address from environment variables.
 * IMPORTANT: Replace the value in .env.local with your deployed Sepolia contract address.
 */
export function getContractAddress(): string {
  const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  if (!address || address === "REPLACE_WITH_DEPLOYED_SEPOLIA_ADDRESS") {
    throw new Error(
      "Contract address not configured. Please set NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local"
    );
  }
  return address;
}

/**
 * Get the expected chain ID (Sepolia = 11155111)
 */
export function getExpectedChainId(): number {
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID;
  return chainId ? parseInt(chainId, 10) : 11155111;
}

/**
 * Check if MetaMask is installed
 */
export function isMetaMaskInstalled(): boolean {
  return typeof window !== "undefined" && !!window.ethereum?.isMetaMask;
}

/**
 * Get contract instance with read-only provider
 */
export async function getContract() {
  const address = getContractAddress();

  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask not found. Please install MetaMask extension.");
  }

  const { BrowserProvider, Contract } = await import("ethers");
  const provider = new BrowserProvider(window.ethereum);
  const contract = new Contract(address, REGISTRY_ABI, provider);
  return { provider, contract };
}

/**
 * Get contract instance with signer for write operations
 */
export async function getContractWithSigner() {
  const address = getContractAddress();

  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask not found. Please install MetaMask extension.");
  }

  const { BrowserProvider, Contract } = await import("ethers");
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new Contract(address, REGISTRY_ABI, signer);
  return { provider, signer, contract };
}

/**
 * Connect wallet via MetaMask
 */
export async function connectWallet(): Promise<string> {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask not found. Please install MetaMask extension.");
  }

  const accounts = (await window.ethereum.request({
    method: "eth_requestAccounts",
  })) as string[];

  if (!accounts || accounts.length === 0) {
    throw new Error("No accounts found. Please unlock MetaMask.");
  }

  return accounts[0];
}

/**
 * Get currently connected account (if any)
 */
export async function getConnectedAccount(): Promise<string | null> {
  if (typeof window === "undefined" || !window.ethereum) {
    return null;
  }

  const accounts = (await window.ethereum.request({
    method: "eth_accounts",
  })) as string[];

  return accounts && accounts.length > 0 ? accounts[0] : null;
}

/**
 * Check if connected to the correct network (Sepolia)
 */
export async function checkNetwork(): Promise<boolean> {
  if (typeof window === "undefined" || !window.ethereum) {
    return false;
  }

  const chainId = (await window.ethereum.request({
    method: "eth_chainId",
  })) as string;

  const expectedChainId = getExpectedChainId();
  return parseInt(chainId, 16) === expectedChainId;
}

/**
 * Request network switch to Sepolia
 */
export async function switchToSepolia(): Promise<void> {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask not found");
  }

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xaa36a7" }], // Sepolia chain ID in hex
    });
  } catch (error: unknown) {
    // If Sepolia is not added, add it
    const switchError = error as { code?: number };
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xaa36a7",
            chainName: "Sepolia Testnet",
            nativeCurrency: {
              name: "SepoliaETH",
              symbol: "ETH",
              decimals: 18,
            },
            rpcUrls: ["https://rpc.sepolia.org"],
            blockExplorerUrls: ["https://sepolia.etherscan.io"],
          },
        ],
      });
    } else {
      throw error;
    }
  }
}

/**
 * Blockchain startup data type
 */
export interface BlockchainStartup {
  id: number;
  founder: string;
  name: string;
  createdAt: Date;
  startupHash: string;
}

/**
 * Fetch all registered startups from the blockchain
 */
export async function getAllStartups(): Promise<BlockchainStartup[]> {
  if (!isMetaMaskInstalled()) {
    return [];
  }

  try {
    const { contract } = await getContract();
    const nextId = await contract.nextStartupId();
    const count = Number(nextId);

    if (count === 0) {
      return [];
    }

    const startups: BlockchainStartup[] = [];

    for (let i = 0; i < count; i++) {
      try {
        const data = await contract.getStartup(i);
        // Skip empty/invalid entries (founder address is zero)
        if (data[0] !== "0x0000000000000000000000000000000000000000") {
          startups.push({
            id: i,
            founder: data[0],
            name: data[1],
            createdAt: new Date(Number(data[2]) * 1000),
            startupHash: data[3],
          });
        }
      } catch {
        // Skip any entries that fail to load
        continue;
      }
    }

    return startups;
  } catch (error) {
    console.error("Failed to fetch startups:", error);
    return [];
  }
}
