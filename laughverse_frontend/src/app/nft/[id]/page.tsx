"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

interface NFTDetails {
  id: string;
  title: string;
  creator: string;
  creatorUsername: string;
  currentOwner: string;
  currentOwnerUsername: string;
  price: string;
  description: string;
  image: string;
  audioUrl?: string;
  ownershipHistory: Array<{
    owner: string;
    ownerUsername: string;
    date: string;
    price: string;
  }>;
}

const mockNFT: NFTDetails = {
  id: "1",
  title: "Giggles of Joy",
  creator: "Sarah Miller",
  creatorUsername: "@sarah_miller",
  currentOwner: "John Davis",
  currentOwnerUsername: "@john_davis",
  price: "0.5 ETH",
  description:
    "A collection of the most infectious giggles, guaranteed to brighten your day.",
  image: "🎭",
  audioUrl: "/sample-audio.mp3",
  ownershipHistory: [
    {
      owner: "Sarah Miller",
      ownerUsername: "@sarah_miller",
      date: "2023-01-15",
      price: "0.1 ETH",
    },
    {
      owner: "Emily Clark",
      ownerUsername: "@emily_clark",
      date: "2023-02-20",
      price: "0.3 ETH",
    },
    {
      owner: "John Davis",
      ownerUsername: "@john_davis",
      date: "2023-03-25",
      price: "0.5 ETH",
    },
  ],
};

export default function NFTDetailPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // TODO: Implement actual audio playback
  };

  const handleBuyNow = async () => {
    setIsPurchasing(true);
    // TODO: Implement actual purchase logic
    setTimeout(() => {
      setIsPurchasing(false);
      alert("Purchase successful! You now own this laugh NFT.");
    }, 2000);
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
            {/* Left Column - NFT Display and Player */}
            <div className="space-y-6">
              {/* NFT Card with Player */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-8">
                <div className="aspect-square bg-peach rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <div className="text-6xl sm:text-8xl">{mockNFT.image}</div>
                </div>
                <div className="text-center mb-4 sm:mb-6">
                  <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
                    {mockNFT.title}
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base">
                    by {mockNFT.creator}
                  </p>
                </div>
                {/* Audio Player Controls */}
                <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
                  <button className="p-2 text-gray-600 hover:text-gray-800">
                    ⏮️
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-800">
                    ⏪
                  </button>
                  <button
                    onClick={handlePlayPause}
                    className="w-12 h-12 sm:w-16 sm:h-16 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors text-2xl sm:text-3xl"
                  >
                    {isPlaying ? "⏸️" : "▶️"}
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-800">
                    ⏩
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-800">
                    ⏭️
                  </button>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1 sm:mb-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-gray-500">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
            {/* Right Column - Details and Purchase */}
            <div className="space-y-6 mt-8 lg:mt-0">
              {/* NFT Details */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4">
                  {mockNFT.title}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                  {mockNFT.description}
                </p>
                {/* Creator Info */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
                    Creator
                  </h3>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-peach rounded-full flex items-center justify-center">
                      <span className="text-lg sm:text-xl">👩</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        {mockNFT.creator}
                      </p>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        {mockNFT.creatorUsername}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Current Owner Info */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
                    Current Owner
                  </h3>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-peach rounded-full flex items-center justify-center">
                      <span className="text-lg sm:text-xl">👨</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        {mockNFT.currentOwner}
                      </p>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        {mockNFT.currentOwnerUsername}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Price and Buy Button */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
                    Price
                  </h3>
                  <p className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4">
                    {mockNFT.price}
                  </p>
                  <button
                    onClick={handleBuyNow}
                    disabled={isPurchasing}
                    className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                  >
                    {isPurchasing ? "Processing..." : "Buy Now"}
                  </button>
                </div>
              </div>
              {/* Ownership History */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-4">
                  Ownership History
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg shadow text-xs sm:text-sm">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="py-3 px-2 sm:px-4 text-gray-500 font-semibold">
                          Owner
                        </th>
                        <th className="py-3 px-2 sm:px-4 text-gray-500 font-semibold">
                          Date
                        </th>
                        <th className="py-3 px-2 sm:px-4 text-gray-500 font-semibold">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockNFT.ownershipHistory.map((entry, index) => (
                        <tr key={index} className="border-b last:border-0">
                          <td className="py-3 px-2 sm:px-4 text-gray-800">
                            {entry.ownerUsername}
                          </td>
                          <td className="py-3 px-2 sm:px-4 text-gray-600">
                            {entry.date}
                          </td>
                          <td className="py-3 px-2 sm:px-4 font-semibold text-gray-800">
                            {entry.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
