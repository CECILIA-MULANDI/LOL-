"use client";

import Navbar from "../components/Navbar";
import NFTCardWithData from "../components/NFTCardWithData";
import { useGetTokensForSale } from "../hooks/useContract";

export default function Explore() {
  const { data: tokensForSale, isLoading } = useGetTokensForSale();

  const tokenIds = Array.isArray(tokensForSale)
    ? tokensForSale.map((id) => id.toString())
    : [];

  return (
    <div className="min-h-screen bg-cream dark:bg-gray-900 transition-colors">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Explore NFTs for Sale
        </h1>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
              >
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="p-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : tokenIds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tokenIds.map((tokenId) => (
              <NFTCardWithData key={tokenId} tokenId={tokenId} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No NFTs for sale at the moment.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
