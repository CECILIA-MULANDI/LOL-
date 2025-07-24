import { useReadContract, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS } from "../smart-contracts/constants";
import abi from "../smart-contracts/abi.json";
import { useState, useEffect } from "react";

// Read functions
export function useGetTotalSupply() {
  return useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "totalSupply",
  });
}

export function useGetTokensForSale() {
  return useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "getTokensForSale",
  });
}

export function useGetLaughData(tokenId: string) {
  return useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "laughs",
    args: [tokenId],
  });
}

export function useGetTokensOwnedBy(address: string) {
  return useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "getTokensOwnedBy",
    args: [address],
  });
}

export function useGetTokensEverOwnedBy(address: string) {
  return useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "getTokensEverOwnedBy",
    args: [address],
  });
}

// Write functions
export function useListForSale() {
  return useWriteContract();
}

export function useBuyLaugh() {
  return useWriteContract();
}

// Add this hook to fetch NFT metadata and media
export function useNFTMedia(tokenId: string) {
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [mediaType, setMediaType] = useState<"video" | "audio" | "unknown">(
    "unknown"
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMedia() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://gateway.pinata.cloud/ipfs/${tokenId}`
        );
        if (response.ok) {
          const contentType = response.headers.get("content-type") || "";
          setMediaUrl(response.url);
          setMediaType(contentType.startsWith("video/") ? "video" : "audio");
        }
      } catch (err) {
        console.error("Failed to fetch media:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (tokenId) {
      fetchMedia();
    }
  }, [tokenId]);

  return { mediaUrl, mediaType, isLoading };
}
