import "./globals.css";
import { Inter } from "next/font/google";
import { Web3Provider } from "./wagmi";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Laughverse - NFT Marketplace for Laughs",
  description: "Discover, create, and trade laugh NFTs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
