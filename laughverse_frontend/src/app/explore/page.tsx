import Link from "next/link";
import NFTCard from "../components/NFTCards";

const mockNFTs = [
  { title: "Giggles of Joy", creator: "Amelia", image: "😊", price: "0.1" },
  {
    title: "Chuckles of Delight",
    creator: "Ethan",
    image: "🟫",
    price: "0.05",
  },
  { title: "Roars of Laughter", creator: "Olivia", image: "😂", price: "0.15" },
  {
    title: "Snickers of Amusement",
    creator: "Noah",
    image: "😄",
    price: "0.08",
  },
  {
    title: "Tee-hees of Merriment",
    creator: "Sophia",
    image: "🥚",
    price: "0.12",
  },
  { title: "Howls of Hilarity", creator: "Liam", image: "😆", price: "0.09" },
  { title: "Belly Laughs", creator: "Emma", image: "🤣", price: "0.2" },
  { title: "Silent Chuckles", creator: "James", image: "😏", price: "0.06" },
  { title: "Cackling Joy", creator: "Isabella", image: "😈", price: "0.18" },
  { title: "Guffaw Delight", creator: "William", image: "😅", price: "0.11" },
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 bg-cream">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">😂</span>
            <span className="text-xl font-bold text-gray-800">
              Laugh Factory
            </span>
          </Link>

          <div className="flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              Home
            </Link>
            <Link href="/explore" className="text-gray-600 hover:text-gray-800">
              Explore
            </Link>
            <Link href="/mint" className="text-gray-600 hover:text-gray-800">
              Create
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-800">🔔</button>
          <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-8 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Explore Laughs
          </h1>
          <p className="text-gray-600">
            Discover the funniest laugh NFTs in the marketplace
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search for laughs or creators"
                className="w-full px-6 py-4 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-peach text-lg"
              />
            </div>
            <div className="flex gap-4">
              <select className="px-4 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Recently Added</option>
                <option>Most Popular</option>
              </select>
              <select className="px-4 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none">
                <option>All Categories</option>
                <option>Giggles</option>
                <option>Chuckles</option>
                <option>Roars</option>
                <option>Snickers</option>
              </select>
            </div>
          </div>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {mockNFTs.map((nft, index) => (
            <NFTCard
              key={index}
              title={nft.title}
              creator={nft.creator}
              image={nft.image}
              price={nft.price}
            />
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <button className="px-8 py-4 bg-peach text-gray-800 rounded-lg font-semibold hover:bg-opacity-80 transition-colors">
            Load More Laughs
          </button>
        </div>
      </main>
    </div>
  );
}
