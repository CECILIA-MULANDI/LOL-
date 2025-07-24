import Link from "next/link";
import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS } from "../smart-contracts/constants";
import abi from "../smart-contracts/abi.json";

// Add ListForSaleForm component
function ListForSaleForm({
  onSubmit,
  onCancel,
  isLoading,
}: {
  onSubmit: (price: string) => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (price) {
      onSubmit(price);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-sm w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          List for Sale
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Price (ETH)
            </label>
            <input
              type="number"
              step="0.001"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.001"
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !price}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? "Listing..." : "List"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
