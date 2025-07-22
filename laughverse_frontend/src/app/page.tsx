import Navbar from "./components/Navbar";
import NFTCard from "./components/NFTCards";

const mockNFTs = [
  { id: "1", title: "Giggles of Joy", creator: "Amelia", image: "😊" },
  { id: "2", title: "Chuckles of Delight", creator: "Ethan", image: "🟫" },
  { id: "3", title: "Roars of Laughter", creator: "Olivia", image: "😂" },
  { id: "4", title: "Snickers of Amusement", creator: "Noah", image: "😄" },
  { id: "5", title: "Tee-hees of Merriment", creator: "Sophia", image: "🥚" },
  { id: "6", title: "Howls of Hilarity", creator: "Liam", image: "😆" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="px-2 sm:px-8 py-6">
        {/* Create NFT Button */}
        <div className="flex justify-center mb-8">
          <a
            href="/mint"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-peach text-gray-800 rounded-lg font-semibold hover:bg-opacity-80 transition-colors inline-flex items-center space-x-2 text-sm sm:text-base"
          >
            <span>🎭</span>
            <span>Create New Laugh NFT</span>
          </a>
        </div>
        {/* NFT Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {mockNFTs.map((nft, index) => (
            <NFTCard
              key={index}
              id={nft.id}
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
