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

// Hook to get current owner of a token
export function useGetOwner(tokenId: string) {
  return useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "ownerOf",
    args: [tokenId],
  });
}

// Hook to get token URI
export function useGetTokenURI(tokenId: string) {
  return useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "tokenURI",
    args: [tokenId],
  });
}

// Add this hook to fetch NFT metadata and media
export function useNFTMedia(tokenId: string) {
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [mediaType, setMediaType] = useState<"video" | "audio" | "unknown">(
    "unknown"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [metadata, setMetadata] = useState<any>(null);

  // Get the token URI from the smart contract
  const { data: tokenURI } = useGetTokenURI(tokenId);

  useEffect(() => {
    async function fetchMedia() {
      try {
        setIsLoading(true);

        if (!tokenURI) {
          console.log("No tokenURI available yet");
          return;
        }

        console.log("TokenURI:", tokenURI);

        // Convert IPFS URI to HTTP gateway URL
        let metadataUrl = tokenURI;
        if (tokenURI.startsWith("ipfs://")) {
          const ipfsHash = tokenURI.replace("ipfs://", "");
          metadataUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
        }

        console.log("Fetching metadata from:", metadataUrl);

        // Fetch the metadata JSON
        const metadataResponse = await fetch(metadataUrl);
        if (!metadataResponse.ok) {
          throw new Error(
            `Failed to fetch metadata: ${metadataResponse.status}`
          );
        }

        const metadataJson = await metadataResponse.json();
        console.log("Metadata:", metadataJson);
        setMetadata(metadataJson);

        // Get the media URL from metadata
        let mediaUri = metadataJson.image || metadataJson.animation_url;
        if (!mediaUri) {
          console.log("No media URI found in metadata");
          setMediaType("unknown");
          return;
        }

        // Convert IPFS URI to HTTP gateway URL
        if (mediaUri.startsWith("ipfs://")) {
          const ipfsHash = mediaUri.replace("ipfs://", "");
          mediaUri = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
        }

        console.log("Media URL:", mediaUri);
        setMediaUrl(mediaUri);

        // Determine media type by checking the actual content
        try {
          const mediaResponse = await fetch(mediaUri, { method: "HEAD" });
          const contentType = mediaResponse.headers.get("content-type") || "";
          console.log("Content-Type:", contentType);

          if (contentType.startsWith("video/")) {
            setMediaType("video");
          } else if (contentType.startsWith("audio/")) {
            setMediaType("audio");
          } else {
            // Fallback: check file extension
            const extension = mediaUri.split(".").pop()?.toLowerCase();
            if (["mp4", "webm", "ogg", "mov"].includes(extension || "")) {
              setMediaType("video");
            } else if (["mp3", "wav", "ogg", "m4a"].includes(extension || "")) {
              setMediaType("audio");
            } else {
              setMediaType("unknown");
            }
          }
        } catch (err) {
          console.log("Could not determine content type, using fallback");
          // Fallback: check file extension
          const extension = mediaUri.split(".").pop()?.toLowerCase();
          if (["mp4", "webm", "ogg", "mov"].includes(extension || "")) {
            setMediaType("video");
          } else if (["mp3", "wav", "ogg", "m4a"].includes(extension || "")) {
            setMediaType("audio");
          } else {
            setMediaType("unknown");
          }
        }
      } catch (err) {
        console.error("Failed to fetch media:", err);
        setMediaType("unknown");
      } finally {
        setIsLoading(false);
      }
    }

    if (tokenId && tokenURI) {
      fetchMedia();
    } else if (tokenId) {
      // Still loading tokenURI
      setIsLoading(true);
    }
  }, [tokenId, tokenURI]);

  return { mediaUrl, mediaType, isLoading, metadata };
}
