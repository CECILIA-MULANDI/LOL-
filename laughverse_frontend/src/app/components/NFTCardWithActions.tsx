"use client";
import { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import Link from "next/link";
import {
  useGetLaughData,
  useNFTMedia,
  useGetOwner,
} from "../hooks/useContract";
import { CONTRACT_ADDRESS } from "../smart-contracts/constants";
import abi from "../smart-contracts/abi.json";

interface NFTCardWithActionsProps {
  tokenId: string;
}

export default function NFTCardWithActions({
  tokenId,
}: Readonly<NFTCardWithActionsProps>) {
  const { address } = useAccount();
  const { data: laughData, isLoading, refetch } = useGetLaughData(tokenId);
  const { mediaUrl, mediaType, isLoading: mediaLoading } = useNFTMedia(tokenId);
  const { data: currentOwner } = useGetOwner(tokenId);

  const { writeContract: listForSale, isPending: isListing } =
    useWriteContract();
  const {
    writeContract: buyLaugh,
    data: buyHash,
    isPending: isBuying,
  } = useWriteContract();
  const { isLoading: isBuyConfirming, isSuccess: buySuccess } =
    useWaitForTransactionReceipt({ hash: buyHash });
  const { writeContract: removeFromSale, isPending: isRemoving } =
    useWriteContract();

  const [listPrice, setListPrice] = useState("");
  const [showListModal, setShowListModal] = useState(false);
  const [buyError, setBuyError] = useState("");

  if (isLoading || !laughData)
    return <div className="bg-white rounded-lg shadow-sm p-4">Loading...</div>;

  // Safely destructure laughData array
  const [creator, title, price, forSale] = Array.isArray(laughData)
    ? [laughData[0], laughData[1], laughData[3], laughData[4]]
    : [undefined, undefined, undefined, undefined];

  // Check if current user is the owner (not creator)
  const isOwner =
    address && currentOwner && typeof currentOwner === "string"
      ? address.toLowerCase() === currentOwner.toLowerCase()
      : false;

  const handleQuickBuy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!forSale || !address) return;

    setBuyError("");

    try {
      buyLaugh({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi,
        functionName: "buyLaugh",
        args: [tokenId],
        value: BigInt(price.toString()),
      });
    } catch {
      setBuyError("Purchase failed");
    }
  };

  const handleList = async () => {
    if (!listPrice) return;

    try {
      listForSale({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi,
        functionName: "listForSale",
        args: [tokenId, BigInt(parseFloat(listPrice) * 1e18)],
      });
      setShowListModal(false);
      setListPrice("");
    } catch (error) {
      console.error("Listing failed:", error);
    }
  };

  const handleRemoveFromSale = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      removeFromSale({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi,
        functionName: "removeFromSale",
        args: [tokenId],
      });
    } catch (error) {
      console.error("Remove from sale failed:", error);
    }
  };

  // Refetch when buy succeeds
  if (buySuccess) {
    refetch();
  }

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/nft/${tokenId}`} className="block">
        {mediaLoading ? (
          <div className="aspect-square bg-peach rounded-t-lg flex items-center justify-center">
            <div className="text-4xl animate-pulse">⏳</div>
          </div>
        ) : (
          <div className="aspect-square bg-peach rounded-t-lg flex items-center justify-center overflow-hidden relative">
            {(() => {
              if (mediaType === "video" && mediaUrl) {
                return (
                  <video
                    className="w-full h-full object-cover"
                    muted
                    preload="metadata"
                    poster=""
                  >
                    <source src={mediaUrl} />
                  </video>
                );
              } else if (mediaType === "audio") {
                return <div className="text-6xl">🎵</div>;
              } else {
                return <div className="text-6xl">😂</div>;
              }
            })()}
          </div>
        )}

        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-1">
            {title || "Untitled"}
          </h3>
          <p className="text-sm text-gray-500">
            by{" "}
            {creator
              ? `${creator.slice(0, 6)}...${creator.slice(-4)}`
              : "Unknown"}
          </p>
          {forSale && (
            <p className="text-sm font-medium text-gray-700 mt-2">
              {(Number(price) / 1e18).toFixed(4)} ETH
            </p>
          )}
        </div>
      </Link>

      {/* Action Buttons - Outside Link to prevent navigation */}
      <div className="p-4 pt-0 space-y-2">
        {buyError && <p className="text-xs text-red-600">{buyError}</p>}

        {buySuccess && <p className="text-xs text-green-600">🎉 Purchased!</p>}

        {forSale && !isOwner && (
          <button
            onClick={handleQuickBuy}
            disabled={isBuying || isBuyConfirming}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50 transition-colors text-sm"
          >
            {isBuying
              ? "Buying..."
              : isBuyConfirming
              ? "Processing..."
              : "Quick Buy"}
          </button>
        )}

        {isOwner && !forSale && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowListModal(true);
            }}
            disabled={isListing}
            className="w-full px-4 py-2 bg-peach text-gray-800 rounded-lg font-semibold hover:bg-opacity-80 disabled:opacity-50 transition-colors text-sm"
          >
            {isListing ? "Listing..." : "List for Sale"}
          </button>
        )}

        {forSale && isOwner && (
          <div className="space-y-2">
            <div className="text-center py-2 text-xs text-gray-500">
              Your NFT (listed for {(Number(price) / 1e18).toFixed(4)} ETH)
            </div>
            <button
              onClick={handleRemoveFromSale}
              disabled={isRemoving}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 disabled:opacity-50 transition-colors text-sm"
            >
              {isRemoving ? "Removing..." : "Remove from Sale"}
            </button>
          </div>
        )}
      </div>

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
                disabled={isListing}
                className="flex-1 px-4 py-2 bg-peach rounded-lg disabled:opacity-50"
              >
                {isListing ? "Listing..." : "List"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
