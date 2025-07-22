"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

export default function MintPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleMint = async () => {
    if (!title || !description || !file) {
      alert("Please fill in all fields and upload a file");
      return;
    }

    setIsUploading(true);
    // TODO: Implement actual minting logic
    console.log("Minting NFT:", { title, description, file });

    // Simulate minting process
    setTimeout(() => {
      setIsUploading(false);
      alert("NFT minted successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="px-2 sm:px-8 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-8">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
              Mint New Laugh NFT
            </h1>
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
                Minting Cost: 0.05 ETH + Transaction Fees
              </div>
              {/* Mint Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleMint}
                  disabled={isUploading || !title || !description || !file}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                >
                  {isUploading ? "Minting..." : "Mint NFT"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
