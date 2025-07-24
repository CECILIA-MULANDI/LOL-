"use client";

import { use, useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import Navbar from "../../components/Navbar";
import { useGetLaughData, useNFTMedia } from "../../hooks/useContract";
import { CONTRACT_ADDRESS } from "../../smart-contracts/constants";
import abi from "../../smart-contracts/abi.json";
import MediaPlayer from "../../components/MediaPlayer";

export default function NFTDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { address } = useAccount();
  const { data: laughData, isLoading, error, refetch } = useGetLaughData(id);
  const { mediaUrl, mediaType, isLoading: mediaLoading } = useNFTMedia(id);

  // Separate write contracts for better control
  const {
    writeContract: listForSale,
    data: listHash,
    isPending: isListing,
  } = useWriteContract();
  const {
    writeContract: buyLaugh,
    data: buyHash,
    isPending: isBuying,
  } = useWriteContract();
  const {
    writeContract: removeFromSale,
    data: removeHash,
    isPending: isRemoving,
  } = useWriteContract();

  // Wait for transactions
  const { isLoading: isListConfirming } = useWaitForTransactionReceipt({
    hash: listHash,
  });
  const { isLoading: isBuyConfirming, isSuccess: buySuccess } =
    useWaitForTransactionReceipt({ hash: buyHash });
  const { isLoading: isRemoveConfirming } = useWaitForTransactionReceipt({
    hash: removeHash,
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [listPrice, setListPrice] = useState("");
  const [showListModal, setShowListModal] = useState(false);
  const [buyError, setBuyError] = useState("");

  // Refetch data when buy is successful
  if (buySuccess) {
    refetch();
  }

  // Extracted button label to avoid nested ternary in JSX
  let buyButtonLabel = "Buy Now";
  if (isBuying) {
    buyButtonLabel = "Confirming Purchase...";
  } else if (isBuyConfirming) {
    buyButtonLabel = "Processing...";
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main className="px-2 sm:px-8 py-6">
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600">Loading NFT details...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !laughData) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main className="px-2 sm:px-8 py-6">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              NFT Not Found
            </h3>
            <p className="text-gray-600">
              This laugh NFT doesn&#39;t exist or failed to load.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const [creator, title, description, price, forSale] = Array.isArray(laughData)
    ? laughData
    : ["", "", "", 0, false];
  const isOwner = address?.toLowerCase() === creator.toLowerCase();

  const handleBuyNow = async () => {
    if (!forSale || !address) return;

    setBuyError("");

    try {
      await buyLaugh({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi,
        functionName: "buyLaugh",
        args: [id],
        value: BigInt(price.toString()),
      });
    } catch (error: unknown) {
      console.error("Purchase failed:", error);
      if (error instanceof Error) {
        setBuyError(error.message || "Purchase failed. Please try again.");
      } else {
        setBuyError("Purchase failed. Please try again.");
      }
    }
  };

  const handleList = async () => {
    if (!listPrice) return;

    try {
      await listForSale({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi,
        functionName: "listForSale",
        args: [id, BigInt(parseFloat(listPrice) * 1e18)],
      });
      setShowListModal(false);
      setListPrice("");
    } catch (error) {
      console.error("Listing failed:", error);
    }
  };

  const handleRemoveFromSale = async () => {
    try {
      await removeFromSale({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi,
        functionName: "removeFromSale",
        args: [id],
      });
    } catch (error) {
      console.error("Remove from sale failed:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Media Player */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <MediaPlayer
              mediaUrl={mediaUrl}
              mediaType={mediaType}
              title={title}
            />
          </div>

          {/* Right: NFT Details */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-800 dark:text-white mb-2">
                {title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                {description}
              </p>
            </div>

            {/* Creator and Owner Info */}
            <div className="mb-6 space-y-4">
              {/* Creator */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  Creator
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {creator.slice(0, 6)}...{creator.slice(-4)}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Original Creator
                    </p>
                  </div>
                </div>
              </div>

              {/* Current Owner */}
              {address && creator.toLowerCase() !== address.toLowerCase() && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    Current Owner
                  </h3>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <path d="M5 16L3 14l5.5-5.5L16 16l-5.5 5.5L5 16z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {address.slice(0, 6)}...{address.slice(-4)}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {isOwner ? "You" : "Current Owner"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Status */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Status
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {forSale
                  ? `For sale at ${formatEther(price)} ETH`
                  : "Not for sale"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {!isConnected ? (
                <div className="text-center py-4 text-gray-600 dark:text-gray-400">
                  Connect your wallet to interact with this NFT
                </div>
              ) : forSale && !isOwner ? (
                <button
                  onClick={handlePurchase}
                  disabled={isPurchasing || isPurchaseConfirming}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 transition-all duration-200"
                >
                  {isPurchasing || isPurchaseConfirming
                    ? "Processing..."
                    : `Buy for ${formatEther(price)} ETH`}
                </button>
              ) : isOwner && forSale ? (
                <div className="space-y-3">
                  <div className="text-center py-4 text-gray-600 dark:text-gray-400">
                    This is your NFT (listed for sale)
                  </div>
                  <button
                    onClick={handleRemoveFromSale}
                    disabled={isRemoving || isRemoveConfirming}
                    className="w-full px-6 py-3 bg-gray-500 dark:bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-600 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
                  >
                    {isRemoving || isRemoveConfirming
                      ? "Removing..."
                      : "Remove from Sale"}
                  </button>
                </div>
              ) : isOwner && !forSale ? (
                <ListForSaleForm tokenId={id} />
              ) : (
                <div className="text-center py-4 text-gray-600 dark:text-gray-400">
                  This NFT is not currently for sale
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
