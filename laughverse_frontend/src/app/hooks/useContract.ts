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
  const [mediaType, setMediaType] = useState<"audio" | "video" | "unknown">(
    "unknown"
  );
  const [isLoading, setIsLoading] = useState(true);

  const { data: tokenURI } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "tokenURI",
    args: [tokenId],
  });

  useEffect(() => {
    const fetchMedia = async () => {
      if (!tokenURI) return;

      try {
        setIsLoading(true);

        // Convert IPFS URI to HTTP URL
        const metadataUrl =
          typeof tokenURI === "string"
            ? tokenURI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")
            : "";
        if (!metadataUrl) {
          throw new Error("Invalid tokenURI");
        }

        // Fetch metadata
        const metadataResponse = await fetch(metadataUrl);
        const metadata = await metadataResponse.json();

        if (metadata.image) {
          const mediaUrl = metadata.image.replace(
            "ipfs://",
            "https://gateway.pinata.cloud/ipfs/"
          );
          setMediaUrl(mediaUrl);

          // Try to detect media type from URL first
          if (
            mediaUrl.includes(".mp4") ||
            mediaUrl.includes(".webm") ||
            mediaUrl.includes(".mov")
          ) {
            setMediaType("video");
          } else if (
            mediaUrl.includes(".mp3") ||
            mediaUrl.includes(".wav") ||
            mediaUrl.includes(".ogg")
          ) {
            setMediaType("audio");
          } else {
            // If no extension, try to detect by making a HEAD request
            try {
              const response = await fetch(mediaUrl, { method: "HEAD" });
              const contentType = response.headers.get("content-type");

              if (contentType?.startsWith("audio/")) {
                setMediaType("audio");
              } else if (contentType?.startsWith("video/")) {
                setMediaType("video");
              } else {
                // Default to audio for laugh NFTs if we can't determine
                setMediaType("audio");
              }
            } catch (error) {
              console.log("Could not detect content type, defaulting to audio");
              setMediaType("audio");
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch media:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedia();
  }, [tokenURI]);

  return { mediaUrl, mediaType, isLoading };
}
