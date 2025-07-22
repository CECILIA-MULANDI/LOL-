import Link from "next/link";
import Navbar from "./components/Navbar";
import NFTCard from "./components/NFTCards";

const mockNFTs = [
  { title: "Giggles of Joy", creator: "Amelia", image: "😊" },
  { title: "Chuckles of Delight", creator: "Ethan", image: "🟫" },
  { title: "Roars of Laughter", creator: "Olivia", image: "😂" },
  { title: "Snickers of Amusement", creator: "Noah", image: "😄" },
  { title: "Tee-hees of Merriment", creator: "Sophia", image: "🥚" },
  { title: "Howls of Hilarity", creator: "Liam", image: "😆" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main className="px-8 py-6">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Search for laughs or creators"
              className="w-full px-6 py-4 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-peach text-lg"
            />
            <span className="absolute right-6 top-4 text-gray-400 text-xl">
              🔍
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-4 mb-8">
          <select className="px-4 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none">
            <option>Most Recent</option>
            <option>Oldest First</option>
          </select>

          <select className="px-4 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none">
            <option>Most Popular</option>
            <option>Least Popular</option>
          </select>

          <select className="px-4 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none">
            <option>Price Range</option>
            <option>Low to High</option>
            <option>High to Low</option>
          </select>
        </div>

        {/* Create NFT Button */}
        <div className="flex justify-center mb-8">
          <Link
            href="/mint"
            className="px-8 py-4 bg-peach text-gray-800 rounded-lg font-semibold hover:bg-opacity-80 transition-colors inline-flex items-center space-x-2"
          >
            <span>🎭</span>
            <span>Create New Laugh NFT</span>
          </Link>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {mockNFTs.map((nft, index) => (
            <NFTCard
              key={index}
              title={nft.title}
              creator={nft.creator}
              image={nft.image}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
