  return (
    <Link href={`/nft/${tokenId}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="aspect-square bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-600 dark:to-pink-600 flex items-center justify-center relative">
          <div className="text-6xl">🎵</div>
          {forSale && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              For Sale
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-display font-bold text-lg text-gray-800 dark:text-white mb-2 truncate">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
            by {creator.slice(0, 6)}...{creator.slice(-4)}
          </p>
          {forSale && (
            <div className="flex items-center justify-between">
              <span className="text-purple-600 dark:text-purple-400 font-semibold">
                {formatEther(price)} ETH
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                For Sale
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );