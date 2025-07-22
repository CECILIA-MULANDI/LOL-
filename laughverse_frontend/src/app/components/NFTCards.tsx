interface NFTCardProps {
  title: string;
  creator: string;
  image: string;
  price?: string;
}

export default function NFTCard({
  title,
  creator,
  image,
  price,
}: NFTCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="aspect-square bg-peach rounded-t-lg flex items-center justify-center">
        <div className="text-6xl">{image}</div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">by {creator}</p>
        {price && (
          <p className="text-sm font-medium text-gray-700 mt-2">{price} ETH</p>
        )}
      </div>
    </div>
  );
}
