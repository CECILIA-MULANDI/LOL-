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
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="px-2 sm:px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Media Player */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-8">
                {mediaLoading ? (
                  <div className="aspect-square bg-peach rounded-lg flex items-center justify-center">
                    <div className="text-6xl animate-pulse">⏳</div>
                  </div>
                ) : (
                  <MediaPlayer
                    mediaUrl={mediaUrl}
                    mediaType={mediaType}
                    title={title}
                  />
                )}

                <div className="text-center mt-4">
                  <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
                    {title}
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base">
                    by {creator.slice(0, 6)}...{creator.slice(-4)}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Details and Purchase */}
            <div className="space-y-6 mt-8 lg:mt-0">
              {/* NFT Details */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4">
                  {title}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                  {description}
                </p>

                {/* Creator and Owner Info */}
                <div className="mb-4 sm:mb-6 space-y-4">
                  {/* Creator */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
                      Creator
                    </h3>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-400 rounded-full flex items-center justify-center">
                        <span className="text-lg sm:text-xl">🎨</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm sm:text-base">
                          {creator.slice(0, 6)}...{creator.slice(-4)}
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          Original Creator
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Current Owner (if different from creator) */}
                  {address &&
                    creator.toLowerCase() !== address.toLowerCase() && (
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
                          Current Owner
                        </h3>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-400 rounded-full flex items-center justify-center">
                            <span className="text-lg sm:text-xl">👑</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm sm:text-base">
                              {address.slice(0, 6)}...{address.slice(-4)}
                            </p>
                            <p className="text-gray-600 text-xs sm:text-sm">
                              {isOwner ? "You" : "Current Owner"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                </div>

                {/* Price and Actions */}
                <div className="mb-4 sm:mb-6">
                  {forSale ? (
                    <>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
                        Price
                      </h3>
                      <p className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4">
                        {(Number(price) / 1e18).toFixed(4)} ETH
                      </p>

                      {/* Buy Error */}
                      {buyError && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
                          <p className="text-red-700 text-sm">{buyError}</p>
                        </div>
                      )}

                      {/* Buy Success */}
                      {!isOwner && (
                        <button
                          onClick={handleBuyNow}
                          disabled={isBuying || isBuyConfirming}
                          className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                        >
                          {buyButtonLabel}
                        </button>
                      )}

                      {isOwner && (
                        <div className="space-y-3">
                          <div className="text-center py-4 text-gray-600">
                            This is your NFT (listed for sale)
                          </div>
                          <button
                            onClick={handleRemoveFromSale}
                            disabled={isRemoving || isRemoveConfirming}
                            className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 disabled:opacity-50 transition-colors text-sm sm:text-base"
                          >
                            {isRemoving || isRemoveConfirming
                              ? "Removing..."
                              : "Remove from Sale"}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
                        Status
                      </h3>
                      <p className="text-gray-600 mb-4">Not for sale</p>
                      {isOwner && (
                        <button
                          onClick={() => setShowListModal(true)}
                          disabled={isListing || isListConfirming}
                          className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-peach text-gray-800 rounded-lg font-semibold hover:bg-opacity-80 disabled:opacity-50 transition-colors text-sm sm:text-base"
                        >
                          {isListing || isListConfirming
                            ? "Listing..."
                            : "List for Sale"}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Ownership History - TODO: Implement with events */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-4">
                  Ownership History
                </h3>
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">📜</div>
                  <p>Ownership history coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* List Modal */}
      {showListModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">List for Sale</h3>
            <input
              type="number"
              step="0.001"
              placeholder="Price in ETH"
              value={listPrice}
              onChange={(e) => setListPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg mb-4"
            />
            <div className="flex space-x-3">
              <button
                onClick={() => setShowListModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleList}
                className="flex-1 px-4 py-2 bg-peach rounded-lg"
              >
                List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
