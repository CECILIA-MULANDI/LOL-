"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-cream px-4 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">😂</span>
            <span className="text-xl font-bold text-gray-800">
              Laugh Factory
            </span>
          </Link>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-gray-800">
            Home
          </Link>
          <Link href="/explore" className="text-gray-600 hover:text-gray-800">
            Explore
          </Link>
          <Link href="/mint" className="text-gray-600 hover:text-gray-800">
            Create
          </Link>
          <Link href="/my-laughs" className="text-gray-600 hover:text-gray-800">
            My Laughs
          </Link>
          <Link href="/profile" className="text-gray-600 hover:text-gray-800">
            Profile
          </Link>
        </div>
        {/* Right: Avatar/Notif */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-800 md:block hidden">
            🔔
          </button>
          <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
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
              className="text-gray-800"
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
            Explore
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
            My Laughs
          </Link>
          <Link
            href="/profile"
            className="block py-2 px-2 text-gray-700 rounded hover:bg-peach"
          >
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
}
