import Link from "next/link";
import { useGetLaughData } from "../hooks/useContract";

interface NFTCardWithDataProps {
  tokenId: string;
}

export default function NFTCardWithData({ tokenId }: NFTCardWithDataProps) {
  const { data: laughData, isLoading, error } = useGetLaughData(tokenId);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="p-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3" />
        </div>
      </div>
    );
  }

  if (error || !laughData) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-gray-400 dark:text-gray-500">❌</span>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 dark:text-white">Error</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Failed to load
          </p>
        </div>
      </div>
    );
  }

  const [creator, title, , price, forSale] = Array.isArray(laughData)
    ? laughData
    : ["", "", "", 0, false];

  return (
    <Link href={`/nft/${tokenId}`} className="block">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <div className="aspect-square bg-peach rounded-t-lg flex items-center justify-center">
          <div className="text-6xl">😂</div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">
            by {creator.slice(0, 6)}...{creator.slice(-4)}
          </p>
          {forSale && (
            <p className="text-sm font-medium text-gray-700 mt-2">
              {(Number(price) / 1e18).toFixed(4)} ETH
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
