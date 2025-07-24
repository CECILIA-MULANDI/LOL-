"use client";
import Link from "next/link";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-cream dark:bg-gray-900 px-4 py-4 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C13.1 2 14 2.9 14 4V8C14 9.1 13.1 10 12 10S10 9.1 10 8V4C10 2.9 10.9 2 12 2M19 10V12C19 15.9 15.9 19 12 19S5 15.9 5 12V10H7V12C7 14.8 9.2 17 12 17S17 14.8 17 12V10H19M12 21C12.6 21 13 21.4 13 22H11C11 21.4 11.4 21 12 21Z" />
              </svg>
            </div>
            <span className="text-xl font-display font-bold text-gray-800 dark:text-white">
              Laugh Factory
            </span>
          </Link>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white font-medium"
          >
            Home
          </Link>
          <Link
            href="/explore"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white font-medium"
          >
            Marketplace
          </Link>
          <Link
            href="/mint"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white font-medium"
          >
            Create
          </Link>
          <Link
            href="/my-laughs"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white font-medium"
          >
            My Collection
          </Link>
        </div>
        {/* Right: Theme Toggle & Wallet */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <ConnectButton />
          {/* Hamburger for mobile */}
          <button
            className="md:hidden flex items-center justify-center p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
          >
            <svg
              width="28"
              height="28"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-gray-800 dark:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 px-2 pb-2">
          <Link
            href="/"
            className="block py-2 px-2 text-gray-700 rounded hover:bg-peach"
          >
            Home
          </Link>
          <Link
            href="/explore"
            className="block py-2 px-2 text-gray-700 rounded hover:bg-peach"
          >
            Marketplace
          </Link>
          <Link
            href="/mint"
            className="block py-2 px-2 text-gray-700 rounded hover:bg-peach"
          >
            Create
          </Link>
          <Link
            href="/my-laughs"
            className="block py-2 px-2 text-gray-700 rounded hover:bg-peach"
          >
            My Collection
          </Link>
        </div>
      )}
    </nav>
  );
}
