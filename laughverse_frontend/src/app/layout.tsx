import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { Web3Provider } from "./wagmi";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

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
      <body className={`${inter.variable} ${playfair.variable} font-body`}>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
