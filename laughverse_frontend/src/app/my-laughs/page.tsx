import Navbar from "../components/Navbar";
import NFTCard from "../components/NFTCards";

const myNFTs = [
  {
    id: "1",
    title: "My First Laugh",
    creator: "You",
    image: "😊",
    price: "0.1",
    status: "owned",
  },
  {
    id: "2",
    title: "Weekend Chuckles",
    creator: "You",
    image: "😂",
    price: "0.15",
    status: "created",
  },
  {
    id: "3",
    title: "Morning Giggles",
    creator: "You",
    image: "😄",
    price: "0.08",
    status: "owned",
  },
];

export default function MyLaughsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="px-2 sm:px-8 py-6">
        <div className="mb-8">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
            My Laughs
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your laugh NFT collection
          </p>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-center mb-8 max-w-md mx-auto">
          <div className="bg-white rounded-lg py-3 sm:py-4 shadow-sm">
            <div className="text-lg sm:text-2xl font-bold text-gray-800">
              {myNFTs.length}
            </div>
            <div className="text-gray-500 text-xs sm:text-sm">Total Owned</div>
          </div>
          <div className="bg-white rounded-lg py-3 sm:py-4 shadow-sm">
            <div className="text-lg sm:text-2xl font-bold text-gray-800">2</div>
            <div className="text-gray-500 text-xs sm:text-sm">Created</div>
          </div>
          <div className="bg-white rounded-lg py-3 sm:py-4 shadow-sm">
            <div className="text-lg sm:text-2xl font-bold text-gray-800">
              0.35 ETH
            </div>
            <div className="text-gray-500 text-xs sm:text-sm">Total Value</div>
          </div>
        </div>
        {/* NFT Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {myNFTs.map((nft, index) => (
            <div key={index} className="relative">
              <NFTCard
                id={nft.id}
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
            <a
              href="/mint"
              className="px-8 py-4 bg-peach text-gray-800 rounded-lg font-semibold hover:bg-opacity-80 transition-colors inline-flex items-center space-x-2"
            >
              <span>🎭</span>
              <span>Create Your First Laugh</span>
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
