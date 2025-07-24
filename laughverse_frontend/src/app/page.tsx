"use client";
import { useGetTotalSupply } from "./hooks/useContract";
import Navbar from "./components/Navbar";
import NFTCardWithData from "./components/NFTCardWithData";

export default function Home() {
  const { data: totalSupply, isLoading } = useGetTotalSupply();

  const tokenIds = totalSupply
    ? Array.from({ length: Number(totalSupply) }, (_, i) => i.toString())
    : [];

  return (
    <div className="min-h-screen bg-cream dark:bg-gray-900 transition-colors">
      <Navbar />
      <main className="px-2 sm:px-8 py-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-gray-800 dark:text-white mb-4">
            Welcome to Laugh Factory
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 font-body">
            Discover, create, and collect the funniest laugh NFTs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/mint"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 inline-flex items-center justify-center space-x-2 text-sm sm:text-base shadow-lg"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>Create New Laugh NFT</span>
            </a>
            <a
              href="/explore"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-800 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center space-x-2 text-sm sm:text-base border"
            >
              <span>🛒</span>
              <span>Browse Marketplace</span>
            </a>
          </div>
        </div>

        {/* Recent NFTs */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            Latest Laughs
          </h2>
          <p className="text-gray-600 mb-6">
            Check out the newest laugh NFTs in our collection
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600">Loading latest laughs...</p>
          </div>
        ) : tokenIds.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎭</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No laughs yet!
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to create a laugh NFT
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {tokenIds
              .slice(-8)
              .reverse()
              .map((tokenId) => (
                <NFTCardWithData key={tokenId} tokenId={tokenId} />
              ))}
          </div>
        )}

        {tokenIds.length > 8 && (
          <div className="text-center mt-8">
            <a
              href="/explore"
              className="px-6 py-3 bg-peach text-gray-800 rounded-lg font-semibold hover:bg-opacity-80 transition-colors"
            >
              View All NFTs
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
