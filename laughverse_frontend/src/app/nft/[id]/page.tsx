"use client";

import { use, useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import Navbar from "../../components/Navbar";
import {
  useGetLaughData,
  useNFTMedia,
  useGetOwner,
} from "../../hooks/useContract";
import { CONTRACT_ADDRESS } from "../../smart-contracts/constants";
import abi from "../../smart-contracts/abi.json";
import MediaPlayer from "../../components/MediaPlayer";
import { formatEther } from "viem";

// Add ListForSaleForm component
function ListForSaleForm({ tokenId }: { tokenId: string }) {
  const [price, setPrice] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { writeContract, isPending } = useWriteContract();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!price) return;

    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi,
        functionName: "listForSale",
        args: [tokenId, BigInt(parseFloat(price) * 1e18)],
      });
      setShowModal(false);
      setPrice("");
    } catch (error) {
      console.error("Listing failed:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        List for Sale
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              List for Sale
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price (ETH)
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.001"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending || !price}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  {isPending ? "Listing..." : "List"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default function NFTDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { address, isConnected } = useAccount();
  const { data: laughData, isLoading, error, refetch } = useGetLaughData(id);
  const { mediaUrl, mediaType } = useNFTMedia(id);
  const { data: currentOwner, isLoading: ownerLoading } = useGetOwner(id);

  const {
    writeContract: buyLaugh,
    data: buyHash,
    isPending: isPurchasing,
  } = useWriteContract();
  const {
    writeContract: removeFromSale,
    data: removeHash,
    isPending: isRemoving,
  } = useWriteContract();

  const { isLoading: isPurchaseConfirming, isSuccess: buySuccess } =
    useWaitForTransactionReceipt({ hash: buyHash });
  const { isLoading: isRemoveConfirming } = useWaitForTransactionReceipt({
    hash: removeHash,
  });

  // Refetch data when buy is successful
  if (buySuccess) {
    refetch();
  }

  const handlePurchase = async () => {
    if (!forSale || !address) return;

    try {
      await buyLaugh({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi,
        functionName: "buyLaugh",
        args: [id],
        value: BigInt(price.toString()),
      });
    } catch (error) {
      console.error("Purchase failed:", error);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream dark:bg-gray-900 transition-colors">
        <Navbar />
        <main className="px-2 sm:px-8 py-6">
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600 dark:text-gray-300">
              Loading NFT details...
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !laughData) {
    return (
      <div className="min-h-screen bg-cream dark:bg-gray-900 transition-colors">
        <Navbar />
        <main className="px-2 sm:px-8 py-6">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              NFT Not Found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              This laugh NFT doesn&#39;t exist or failed to load.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const [creator, title, , price, forSale] = Array.isArray(laughData)
    ? laughData
    : ["", "", "", 0, false];

  // Check if current user is the owner (not creator)
  const isOwner =
    address && currentOwner && typeof currentOwner === "string"
      ? address.toLowerCase() === currentOwner.toLowerCase()
      : false;

  return (
    <div className="min-h-screen bg-cream dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Media Player */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <MediaPlayer
              mediaUrl={mediaUrl}
              mediaType={mediaType as "video" | "audio" | "unknown"}
              title={title}
            />
          </div>

          {/* Right: NFT Details */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-800 dark:text-white mb-2">
                {title}
              </h1>
            </div>

            {/* Creator Info */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Creator
              </h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
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

            {/* Current Owner Info */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Current Owner
              </h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div>
                  {ownerLoading ? (
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  ) : currentOwner && typeof currentOwner === "string" ? (
                    <>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {currentOwner.slice(0, 6)}...{currentOwner.slice(-4)}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {isOwner ? "You" : "Current Owner"}
                        {creator.toLowerCase() === currentOwner.toLowerCase() &&
                          " (Original Creator)"}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      Loading...
                    </p>
                  )}
                </div>
              </div>
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
