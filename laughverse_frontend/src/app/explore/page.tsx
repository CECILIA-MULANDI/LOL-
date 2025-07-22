import Navbar from "../components/Navbar";
import NFTCard from "../components/NFTCards";

const mockNFTs = [
  {
    id: "1",
    title: "Giggles of Joy",
    creator: "Amelia",
    image: "😊",
    price: "0.1",
  },
  {
    id: "2",
    title: "Chuckles of Delight",
    creator: "Ethan",
    image: "🟫",
    price: "0.05",
  },
  {
    id: "3",
    title: "Roars of Laughter",
    creator: "Olivia",
    image: "😂",
    price: "0.15",
  },
  {
    id: "4",
    title: "Snickers of Amusement",
    creator: "Noah",
    image: "😄",
    price: "0.08",
  },
  {
    id: "5",
    title: "Tee-hees of Merriment",
    creator: "Sophia",
    image: "🥚",
    price: "0.12",
  },
  {
    id: "6",
    title: "Howls of Hilarity",
    creator: "Liam",
    image: "😆",
    price: "0.09",
  },
  {
    id: "7",
    title: "Belly Laughs",
    creator: "Emma",
    image: "🤣",
    price: "0.2",
  },
  {
    id: "8",
    title: "Silent Chuckles",
    creator: "James",
    image: "😏",
    price: "0.06",
  },
  {
    id: "9",
    title: "Cackling Joy",
    creator: "Isabella",
    image: "😈",
    price: "0.18",
  },
  {
    id: "10",
    title: "Guffaw Delight",
    creator: "William",
    image: "😅",
    price: "0.11",
  },
];

export default function ExplorePage() {
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
            className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-peach text-sm sm:text-lg"
          />
          <select className="px-4 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none text-sm sm:text-base">
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Recently Added</option>
            <option>Most Popular</option>
          </select>
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
              price={nft.price}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
