import Link from "next/link";
import { useGetLaughData } from "../hooks/useContract";

interface NFTCardWithDataProps {
  tokenId: string;
}

export default function NFTCardWithData({ tokenId }: NFTCardWithDataProps) {
  const { data: laughData, isLoading, error } = useGetLaughData(tokenId);

  if (isLoading) return <div className="bg-white rounded-lg shadow-sm p-4">Loading...</div>;
  if (error || !laughData) return null;

  const [creator, title, description, price, forSale] = laughData;

  return (
    <Link href={`/nft/${tokenId}`} className="block">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <div className="aspect-square bg-peach rounded-t-lg flex items-center justify-center">
          <div className="text-6xl">😂</div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">by {creator.slice(0,6)}...{creator.slice(-4)}</p>
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