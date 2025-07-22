import Link from "next/link";
import NFTCard from "../components/NFTCards";

const myNFTs = [
  {
    title: "My First Laugh",
    creator: "You",
    image: "😊",
    price: "0.1",
    status: "owned",
  },
  {
    title: "Weekend Chuckles",
    creator: "You",
    image: "😂",
    price: "0.15",
    status: "created",
  },
  {
    title: "Morning Giggles",
    creator: "You",
    image: "😄",
    price: "0.08",
    status: "owned",
  },
];

const createdNFTs = [
  {
    title: "Weekend Chuckles",
    creator: "You",
    image: "😂",
    price: "0.15",
    status: "created",
  },
  {
    title: "Coffee Laughs",
    creator: "You",
    image: "🤣",
    price: "0.12",
    status: "created",
  },
];

export default function MyLaughsPage() {
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
          <h1 className="text-3xl font-bold text-gray-800 mb-4">My Laughs</h1>
          <p className="text-gray-600">Manage your laugh NFT collection</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-gray-800">
              {myNFTs.length}
            </div>
            <div className="text-gray-600">Total Owned</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-gray-800">
              {createdNFTs.length}
            </div>
            <div className="text-gray-600">Created</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-gray-800">0.35 ETH</div>
            <div className="text-gray-600">Total Value</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button className="px-6 py-3 bg-peach text-gray-800 rounded-lg font-semibold">
            All Laughs
          </button>
          <button className="px-6 py-3 bg-white text-gray-600 rounded-lg font-semibold hover:bg-gray-50">
            Created
          </button>
          <button className="px-6 py-3 bg-white text-gray-600 rounded-lg font-semibold hover:bg-gray-50">
            Favorites
          </button>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {myNFTs.map((nft, index) => (
            <div key={index} className="relative">
              <NFTCard
                title={nft.title}
                creator={nft.creator}
                image={nft.image}
                price={nft.price}
              />
              <div className="absolute top-2 right-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    nft.status === "created"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {nft.status === "created" ? "Created" : "Owned"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {myNFTs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😢</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No laughs yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start collecting or create your first laugh NFT!
            </p>
            <Link
              href="/mint"
              className="px-8 py-4 bg-peach text-gray-800 rounded-lg font-semibold hover:bg-opacity-80 transition-colors inline-flex items-center space-x-2"
            >
              <span>🎭</span>
              <span>Create Your First Laugh</span>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
