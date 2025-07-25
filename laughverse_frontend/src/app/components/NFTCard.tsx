import Link from "next/link";

interface NFTCardProps {
  title: string;
  creator: string;
  price?: string;
  id?: string;
}

export default function NFTCard({
  title,
  creator,
  price,
  id = "1",
}: NFTCardProps) {
  return (
    <Link href={`/nft/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <div className="aspect-square bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 dark:from-purple-900 dark:via-pink-900 dark:to-orange-900 rounded-t-lg flex items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Professional content icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            {/* Decorative elements */}
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">by {creator}</p>
          {price && (
            <p className="text-sm font-medium text-gray-700 mt-2">
              {price} ETH
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
