const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY || "";
const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY || "";

export const uploadToIPFS = async (file: File): Promise<string> => {
  if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
    throw new Error(
      "Pinata API keys not configured. Please add NEXT_PUBLIC_PINATA_API_KEY and NEXT_PUBLIC_PINATA_SECRET_KEY to your environment variables."
    );
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    return `ipfs://${result.IpfsHash}`;
  } catch (error) {
    console.error("IPFS upload error:", error);
    throw new Error("Failed to upload file to IPFS");
  }
};

export const uploadMetadataToIPFS = async (
  metadata: Record<string, unknown>
): Promise<string> => {
  if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
    throw new Error("Pinata API keys not configured");
  }

  try {
    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
        body: JSON.stringify(metadata),
      }
    );

    if (!response.ok) {
      throw new Error(`Metadata upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    return `ipfs://${result.IpfsHash}`;
  } catch (error) {
    console.error("Metadata upload error:", error);
    throw new Error("Failed to upload metadata to IPFS");
  }
};
