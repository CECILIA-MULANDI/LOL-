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
  const [metadata, setMetadata] = useState<Record<string, unknown> | null>(
    null
  );

  // Get the token URI from the smart contract
  const { data: tokenURI } = useGetTokenURI(tokenId);

  useEffect(() => {
    async function fetchMedia() {
      try {
        setIsLoading(true);

        if (!tokenURI || typeof tokenURI !== "string") {
          console.log("No tokenURI available yet or invalid type");
          return;
        }

        // Check if this is a mock tokenURI (for development)
        if (tokenURI.startsWith("ipfs://mock-")) {
          console.log("Using mock data for development");
          setMetadata({
            name: `Mock NFT ${tokenId}`,
            description: "This is a mock NFT for development",
            image:
              "https://via.placeholder.com/400x400/FF6B6B/FFFFFF?text=Mock+Audio",
            animation_url:
              "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
          });
          setMediaUrl(
            "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
          );
          setMediaType("audio");
          return;
        }

        console.log("TokenURI:", tokenURI);

        // Convert IPFS URI to HTTP gateway URL with fallbacks
        let metadataUrl = tokenURI;
        const ipfsGateways = [
          "https://gateway.pinata.cloud/ipfs/",
          "https://ipfs.io/ipfs/",
          "https://cloudflare-ipfs.com/ipfs/",
          "https://dweb.link/ipfs/",
        ];

        if (tokenURI.startsWith("ipfs://")) {
          const ipfsHash = tokenURI.replace("ipfs://", "");
          metadataUrl = `${ipfsGateways[0]}${ipfsHash}`;
        }

        // Try multiple IPFS gateways if needed
        let metadataResponse;
        let lastError;

        if (tokenURI.startsWith("ipfs://")) {
          const ipfsHash = tokenURI.replace("ipfs://", "");

          for (const gateway of ipfsGateways) {
            const gatewayUrl = `${gateway}${ipfsHash}`;
            console.log("Trying gateway:", gatewayUrl);

            try {
              metadataResponse = await fetch(gatewayUrl, {
                method: "GET",
                headers: {
                  Accept: "application/json",
                },
                signal: AbortSignal.timeout(8000), // 8 second timeout per gateway
              });

              if (metadataResponse.ok) {
                console.log("Successfully fetched from gateway:", gatewayUrl);
                break;
              } else {
                console.warn(
                  `Gateway ${gatewayUrl} returned ${metadataResponse.status}`
                );
                lastError = new Error(
                  `HTTP ${metadataResponse.status}: ${metadataResponse.statusText}`
                );
              }
            } catch (fetchError) {
              console.warn("Gateway failed:", gatewayUrl, fetchError);
              lastError = fetchError;
              continue;
            }
          }
        } else {
          // Direct URL, not IPFS
          console.log("Fetching metadata from direct URL:", metadataUrl);
          try {
            metadataResponse = await fetch(metadataUrl, {
              method: "GET",
              headers: {
                Accept: "application/json",
              },
              signal: AbortSignal.timeout(10000),
            });
          } catch (fetchError) {
            console.error("Network error fetching metadata:", fetchError);
            throw new Error(`Network error: ${fetchError}`);
          }
        }

        if (!metadataResponse || !metadataResponse.ok) {
          console.error("All gateways failed or response not ok");
          throw (
            lastError || new Error("Failed to fetch metadata from any gateway")
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
        } catch {
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
        setMediaUrl("");
        setMetadata(null);
        // Don't throw the error, just log it and set fallback state
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
