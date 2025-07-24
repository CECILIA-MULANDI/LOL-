"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import Navbar from "../components/Navbar";
import NFTCardWithData from "../components/NFTCardWithData";
import NFTCardWithActions from "../components/NFTCardWithActions";
import {
  useGetTokensOwnedBy,
  useGetTokensEverOwnedBy,
} from "../hooks/useContract";

function OwnedTab({
  ownedLoading,
  currentTokenIds,
}: {
  readonly ownedLoading: boolean;
  readonly currentTokenIds: readonly string[];
}) {
  if (ownedLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">📦</div>
        <p className="text-gray-600">Loading your collection...</p>
      </div>
    );
  }
  if (currentTokenIds.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">😢</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No laughs yet
        </h3>
        <p className="text-gray-600 mb-6">
          Start collecting or create your first laugh NFT!
        </p>
        <a
          href="/mint"
          className="px-8 py-4 bg-peach text-gray-800 rounded-lg font-semibold hover:bg-opacity-80 transition-colors inline-flex items-center space-x-2"
        >
          <span>🎭</span>
          <span>Create Your First Laugh</span>
        </a>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {currentTokenIds.map((tokenId) => (
        <div key={tokenId} className="relative">
          <NFTCardWithActions tokenId={tokenId} />
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
              Owned
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function HistoryTab({
  historyLoading,
  historyTokenIds,
  stillOwnedFlags,
}: {
  readonly historyLoading: boolean;
  readonly historyTokenIds: readonly string[];
  readonly stillOwnedFlags: readonly boolean[];
}) {
  if (historyLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">📜</div>
        <p className="text-gray-600">Loading ownership history...</p>
      </div>
    );
  }
  if (historyTokenIds.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No history yet
        </h3>
        <p className="text-gray-600">Your ownership history will appear here</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {historyTokenIds.map((tokenId: string, index: number) => {
        const stillOwned = stillOwnedFlags[index];
        return (
          <div key={tokenId} className="relative">
            {stillOwned ? (
              <NFTCardWithActions tokenId={tokenId} />
            ) : (
              <NFTCardWithData tokenId={tokenId} />
            )}
            <div className="absolute top-2 right-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  stillOwned
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {stillOwned ? "Owned" : "Sold"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function MyLaughsPage() {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<"owned" | "history">("owned");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: ownedTokens, isLoading: ownedLoading } = useGetTokensOwnedBy(
    address || ""
  );
  const { data: everOwnedData, isLoading: historyLoading } =
    useGetTokensEverOwnedBy(address || "");

  // Add a type annotation for everOwnedData
  type EverOwnedDataType = [Array<string | number>, boolean[]] | undefined;
  const typedEverOwnedData = everOwnedData as EverOwnedDataType;

  const currentTokenIds = Array.isArray(ownedTokens)
    ? ownedTokens.map((id) => id.toString())
    : [];

  // Parse history data
  const historyTokenIds = typedEverOwnedData
    ? typedEverOwnedData[0].map((id: string | number) => id.toString())
    : [];
  const stillOwnedFlags = typedEverOwnedData ? typedEverOwnedData[1] : [];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main className="px-2 sm:px-8 py-6">
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-cream dark:bg-gray-900 transition-colors">
        <Navbar />
        <main className="px-2 sm:px-8 py-6">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔗</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Connect Your Wallet
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Please connect your wallet to view your laugh collection
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-gray-900 transition-colors">
      <Navbar />
      <main className="px-2 sm:px-8 py-6">
        <div className="mb-8">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-4">
            My Laughs
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Manage your laugh NFT collection
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-center mb-8 max-w-md mx-auto">
          <div className="bg-white rounded-lg py-3 sm:py-4 shadow-sm">
            <div className="text-lg sm:text-2xl font-bold text-gray-800">
              {currentTokenIds.length}
            </div>
            <div className="text-gray-500 text-xs sm:text-sm">
              Currently Owned
            </div>
          </div>
          <div className="bg-white rounded-lg py-3 sm:py-4 shadow-sm">
            <div className="text-lg sm:text-2xl font-bold text-gray-800">
              {historyTokenIds.length}
            </div>
            <div className="text-gray-500 text-xs sm:text-sm">Total Owned</div>
          </div>
          <div className="bg-white rounded-lg py-3 sm:py-4 shadow-sm">
            <div className="text-lg sm:text-2xl font-bold text-gray-800">
              {historyTokenIds.length - currentTokenIds.length}
            </div>
            <div className="text-gray-500 text-xs sm:text-sm">Sold</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab("owned")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "owned"
                ? "bg-peach text-gray-800"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Currently Owned ({currentTokenIds.length})
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "history"
                ? "bg-peach text-gray-800"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Full History ({historyTokenIds.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === "owned" ? (
          <OwnedTab
            ownedLoading={ownedLoading}
            currentTokenIds={currentTokenIds}
          />
        ) : (
          <HistoryTab
            historyLoading={historyLoading}
            historyTokenIds={historyTokenIds}
            stillOwnedFlags={stillOwnedFlags}
          />
        )}
      </main>
    </div>
  );
}
