// Auto-commit update: 2025-07-27 23:45:23
// Auto-commit update: 2025-07-26 12:59:00
// Auto-commit update: 2025-07-26 12:57:58
// Auto-commit update: 2025-07-26 12:55:55
// Auto-commit update: 2025-07-26 12:53:51
// Auto-commit update: 2025-07-26 12:52:49
// Auto-commit update: 2025-07-26 12:49:44
// Auto-commit update: 2025-07-26 12:46:39
// Auto-commit update: 2025-07-25 23:49:41
// Auto-commit update: 2025-07-25 21:41:52
// Auto-commit update: 2025-07-25 21:36:41
// Auto-commit update: 2025-07-25 21:23:52
// Auto-commit update: 2025-07-24 18:37:57
// Auto-commit update: 2025-07-23 23:57:09
// Auto-commit update: 2025-07-23 16:44:17
// Auto-commit update: 2025-07-23 16:36:59
// Auto-commit update: 2025-07-23 15:29:40
// Auto-commit update: 2025-07-23 15:28:40
const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY || "";
const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY || "";

// Check if we have valid API keys
const hasValidKeys =
  PINATA_API_KEY &&
  PINATA_SECRET_KEY &&
  PINATA_API_KEY !== "your_pinata_api_key_here" &&
  PINATA_SECRET_KEY !== "your_pinata_secret_key_here";

export const uploadToIPFS = async (file: File): Promise<string> => {
  console.log("API Key status:", {
    hasKeys: !!PINATA_API_KEY && !!PINATA_SECRET_KEY,
    apiKeyLength: PINATA_API_KEY.length,
    secretKeyLength: PINATA_SECRET_KEY.length,
    hasValidKeys,
  });

  if (!hasValidKeys) {
    console.log("Using mock IPFS upload (no API keys configured)");
    // Mock upload for testing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return `ipfs://mock-file-hash-${Date.now()}`;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    console.log("Attempting to upload to Pinata...");
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

    console.log("Pinata response status:", response.status);
    console.log(
      "Pinata response headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Pinata error response:", errorText);
      throw new Error(
        `Upload failed: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const result = await response.json();
    console.log("Pinata success response:", result);
    return `ipfs://${result.IpfsHash}`;
  } catch (error) {
    console.error("IPFS upload error:", error);
    throw new Error("Failed to upload file to IPFS");
  }
};

export const uploadMetadataToIPFS = async (
  metadata: Record<string, unknown>
): Promise<string> => {
  if (!hasValidKeys) {
    console.log("Using mock metadata upload (no API keys configured)");
    // Mock upload for testing
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return `ipfs://mock-metadata-hash-${Date.now()}`;
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
      const errorText = await response.text();
      console.error("Pinata metadata error response:", errorText);
      throw new Error(
        `Metadata upload failed: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const result = await response.json();
    return `ipfs://${result.IpfsHash}`;
  } catch (error) {
    console.error("Metadata upload error:", error);
    throw new Error("Failed to upload metadata to IPFS");
  }
};
// Auto-commit whitespace: 2025-07-23 15:26:40
// Auto-commit whitespace: 2025-07-23 15:35:34
// Auto-commit whitespace: 2025-07-23 15:41:04

// Auto-commit spacing update: 2025-07-23 16:32:51
// Auto-commit whitespace: 2025-07-23 16:40:06

// Auto-commit spacing update: 2025-07-23 16:42:12
// Auto-commit whitespace: 2025-07-23 16:47:23
// Auto-commit whitespace: 2025-07-23 23:48:52
// Auto-commit whitespace: 2025-07-23 23:49:55
// Auto-commit whitespace: 2025-07-23 23:59:13

// Auto-commit spacing update: 2025-07-24 00:01:18

// Auto-commit spacing update: 2025-07-24 18:38:25

// Auto-commit spacing update: 2025-07-24 18:39:28
// Auto-commit whitespace: 2025-07-24 18:45:41
// Auto-commit whitespace: 2025-07-24 18:53:57

// Auto-commit spacing update: 2025-07-25 21:26:52
// Auto-commit whitespace: 2025-07-25 21:38:46

// Auto-commit spacing update: 2025-07-25 23:35:18
// Auto-commit whitespace: 2025-07-25 23:42:29
// Auto-commit whitespace: 2025-07-26 12:48:43
// Auto-commit whitespace: 2025-07-26 12:54:53

// Auto-commit spacing update: 2025-07-26 13:01:03
// Auto-commit whitespace: 2025-07-27 16:34:46
// Auto-commit whitespace: 2025-07-27 16:36:01
// Auto-commit whitespace: 2025-07-27 23:44:21
