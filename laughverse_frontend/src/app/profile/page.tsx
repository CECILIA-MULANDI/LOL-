import Navbar from "../components/Navbar";

const ownedNFTs = [
  { name: "Giggle Burst", image: "/nft1.png" },
  { name: "Chuckling Harmony", image: "/nft2.png" },
  { name: "Snort Symphony", image: "/nft3.png" },
  { name: "Belly Laugh Echo", image: "/nft4.png" },
];

const createdNFTs = [
  { name: "Joyful Jolt", image: "/nft5.png" },
  { name: "Mirthful Melody", image: "/nft6.png" },
  { name: "Chuckle Cascade", image: "/nft7.png" },
];

const activity = [
  { date: "2023-09-15", nft: "Giggle Burst", type: "Mint" },
  { date: "2023-09-16", nft: "Chuckling Harmony", type: "Buy" },
  { date: "2023-09-17", nft: "Snort Symphony", type: "Sell" },
  { date: "2023-09-18", nft: "Belly Laugh Echo", type: "Mint" },
  { date: "2023-09-19", nft: "Joyful Jolt", type: "Buy" },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-cream dark:bg-gray-900 transition-colors">
      <Navbar />
      <main className="max-w-5xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="/avatar.png"
            alt="Sarah Miller"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mb-4 border-4 border-white dark:border-gray-600 shadow"
          />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
            Sarah Miller
          </h2>
          <div className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            @sarah_miller
          </div>
          <div className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm mt-1">
            Joined 2021
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center mb-8 max-w-md mx-auto">
          <div className="bg-white rounded-lg py-3 sm:py-4 shadow-sm">
            <div className="text-lg sm:text-2xl font-bold text-gray-800">
              12
            </div>
            <div className="text-gray-500 text-xs sm:text-sm">Owned</div>
          </div>
          <div className="bg-white rounded-lg py-3 sm:py-4 shadow-sm">
            <div className="text-lg sm:text-2xl font-bold text-gray-800">5</div>
            <div className="text-gray-500 text-xs sm:text-sm">Created</div>
          </div>
          <div className="bg-white rounded-lg py-3 sm:py-4 shadow-sm">
            <div className="text-lg sm:text-2xl font-bold text-gray-800">
              27
            </div>
            <div className="text-gray-500 text-xs sm:text-sm">
              Total Transactions
            </div>
          </div>
        </div>
        {/* Tabs (static for prototype) */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8 justify-center border-b border-gray-200 mb-8 text-sm sm:text-base">
          <div className="pb-2 border-b-2 border-red-400 text-red-500 font-semibold cursor-pointer">
            Owned
          </div>
          <div className="pb-2 text-gray-400 font-semibold cursor-not-allowed">
            Created
          </div>
          <div className="pb-2 text-gray-400 font-semibold cursor-not-allowed">
            Activity
          </div>
        </div>
        {/* Owned NFTs */}
        <div>
          <h3 className="font-semibold text-base sm:text-lg mb-4">Owned</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {ownedNFTs.map((nft, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-full aspect-square bg-white rounded-lg shadow overflow-hidden mb-2 flex items-center justify-center">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-xs sm:text-sm text-gray-800 text-center">
                  {nft.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Created NFTs */}
        <div>
          <h3 className="font-semibold text-base sm:text-lg mb-4">Created</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {createdNFTs.map((nft, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-full aspect-square bg-white rounded-lg shadow overflow-hidden mb-2 flex items-center justify-center">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-xs sm:text-sm text-gray-800 text-center">
                  {nft.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Activity Table */}
        <div>
          <h3 className="font-semibold text-base sm:text-lg mb-4">Activity</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow text-xs sm:text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-3 px-2 sm:px-4 text-gray-500 font-semibold">
                    Date
                  </th>
                  <th className="py-3 px-2 sm:px-4 text-gray-500 font-semibold">
                    NFT
                  </th>
                  <th className="py-3 px-2 sm:px-4 text-gray-500 font-semibold">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {activity.map((a, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-3 px-2 sm:px-4 text-red-400 font-medium">
                      {a.date}
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-gray-800">{a.nft}</td>
                    <td className="py-3 px-2 sm:px-4">
                      <span className="bg-red-100 text-red-500 rounded-full px-3 sm:px-4 py-1 font-semibold">
                        {a.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
