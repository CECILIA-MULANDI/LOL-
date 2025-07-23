// Auto-commit update: 2025-07-23 16:29:42
// Auto-commit update: 2025-07-23 15:38:57
"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
  useChainId,
  useSwitchChain,
} from "wagmi";
import abi from "../smart-contracts/abi.json";
import { CONTRACT_ADDRESS } from "../smart-contracts/constants";
import { uploadToIPFS, uploadMetadataToIPFS } from "../utils/ipfs";
import { baseSepolia } from "wagmi/chains";

export default function MintPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUri, setUploadedUri] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const createMetadata = (fileUri: string) => {
    return {
      name: title,
      description: description,
      image: fileUri,
      attributes: [
        {
          trait_type: "Type",
          value: "Laugh NFT",
        },
      ],
    };
  };

  const handleMint = async () => {
    if (!isConnected) {
      setError("Please connect your wallet first");
      return;
    }

    if (chainId !== baseSepolia.id) {
      setError("Please switch to Base Sepolia testnet");
      if (switchChain) {
        switchChain({ chainId: baseSepolia.id });
      }
      return;
    }

    if (!title || !description || !file) {
      setError("Please fill in all fields and upload a file");
      return;
    }

    setError("");
    setIsUploading(true);

    try {
      // Step 1: Upload file to IPFS
      console.log("Uploading file to IPFS...");
      const fileUri = await uploadToIPFS(file);
      setUploadedUri(fileUri);
      console.log("File uploaded:", fileUri);

      // Step 2: Create and upload metadata
      console.log("Creating metadata...");
      const metadata = createMetadata(fileUri);
      const metadataUri = await uploadMetadataToIPFS(metadata);
      console.log("Metadata uploaded:", metadataUri);

      // Step 3: Call smart contract
      console.log("Calling smart contract...");
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: abi,
        functionName: "mintLaugh",
        args: [metadataUri, title, description],
        value: BigInt("10000000000000"), // 0.00001 ETH in wei (matches contract)
      });
    } catch (err) {
      console.error("Minting error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to mint NFT. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  // Show success message when transaction is confirmed
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main className="px-2 sm:px-8 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-8 text-center">
              <h1 className="text-xl sm:text-3xl font-bold text-green-600 mb-4">
                🎉 NFT Minted Successfully!
              </h1>
              <p className="text-gray-600 mb-4">
                Your laugh NFT has been minted and is now on the blockchain!
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-peach text-gray-800 rounded-lg font-semibold hover:bg-opacity-80 transition-colors"
              >
                Mint Another NFT
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="px-2 sm:px-8 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-8">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
              Mint New Laugh NFT
            </h1>

            {/* Network Status */}
            {!isConnected ? (
              <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                Please connect your wallet to continue
              </div>
            ) : chainId !== baseSepolia.id ? (
              <div className="mb-4 p-3 bg-orange-100 border border-orange-400 text-orange-700 rounded">
                <div className="flex items-center justify-between">
                  <span>Please switch to Base Sepolia testnet</span>
                  <button
                    onClick={() => switchChain?.({ chainId: baseSepolia.id })}
                    className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
                  >
                    Switch Network
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                ✅ Connected to Base Sepolia testnet
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form className="space-y-4 sm:space-y-6">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach focus:border-transparent placeholder-peach text-sm sm:text-base"
                />
              </div>
              {/* Description Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach focus:border-transparent placeholder-peach resize-none text-sm sm:text-base"
                />
              </div>
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Laugh Content
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8 text-center">
                  <div className="space-y-2 sm:space-y-4">
                    <div className="text-base sm:text-lg font-semibold text-gray-800">
                      Upload Laugh Content
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Drag and drop or browse to upload your laugh content
                      (audio or video).
                    </p>
                    <input
                      type="file"
                      accept="audio/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-peach text-gray-800 rounded-lg cursor-pointer hover:bg-opacity-80 transition-colors text-sm sm:text-base"
                    >
                      Browse Files
                    </label>
                    {file && (
                      <p className="text-xs sm:text-sm text-green-600">
                        Selected: {file.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Minting Cost Info */}
              <div className="text-xs sm:text-sm text-gray-600">
                Minting Cost: 0.00001 ETH (Base Sepolia Testnet) + Transaction
                Fees
                <br />
                <span className="text-blue-600">
                  Get free test ETH from:
                  https://www.coinbase.com/faucets/base-ethereum-goerli-faucet
                </span>
              </div>
              {/* Mint Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleMint}
                  disabled={
                    isPending ||
                    isConfirming ||
                    isUploading ||
                    !title ||
                    !description ||
                    !file ||
                    !isConnected ||
                    chainId !== baseSepolia.id
                  }
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                >
                  {isPending
                    ? "Confirming..."
                    : isConfirming
                    ? "Minting..."
                    : isUploading
                    ? "Uploading..."
                    : "Mint NFT"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

// Auto-commit spacing update: 2025-07-23 15:33:17
// Auto-commit whitespace: 2025-07-23 15:40:01

// Auto-commit spacing update: 2025-07-23 15:42:11

// Auto-commit spacing update: 2025-07-23 15:44:28
// Auto-commit whitespace: 2025-07-23 16:30:45
// Auto-commit whitespace: 2025-07-23 16:34:55

// Auto-commit spacing update: 2025-07-23 16:35:57
// Auto-commit whitespace: 2025-07-23 16:38:02
