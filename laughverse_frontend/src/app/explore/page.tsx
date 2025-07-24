"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import NFTCardWithActions from "../components/NFTCardWithActions";
import { useGetTokensForSale } from "../hooks/useContract";

export default function ExplorePage() {
  const { data: tokensForSale, isLoading } = useGetTokensForSale();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recently-added");

  const tokenIds = tokensForSale
    ? tokensForSale.map((id) => id.toString())
    : [];

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="px-2 sm:px-8 py-6">
        <div className="mb-8">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
            Explore Laughs
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Discover the funniest laugh NFTs in the marketplace
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
          <input
            type="text"
            placeholder="Search for laughs or creators"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-peach text-sm sm:text-lg"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none text-sm sm:text-base"
          >
            <option value="recently-added">Recently Added</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        {/* NFT Grid with Quick Buy */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-gray-600">Loading marketplace...</p>
          </div>
        ) : tokenIds.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No laughs for sale yet
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to list your laugh NFT!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {tokenIds.map((tokenId) => (
              <NFTCardWithActions key={tokenId} tokenId={tokenId} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
