import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-cream">
      <div className="flex items-center space-x-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl">😂</span>
          <span className="text-xl font-bold text-gray-800">Laughverse</span>
        </Link>

        <div className="flex space-x-6">
          <Link href="/explore" className="text-gray-600 hover:text-gray-800">
            Explore
          </Link>
          <Link href="/mint" className="text-gray-600 hover:text-gray-800">
            Create
          </Link>
          <Link href="/my-laughs" className="text-gray-600 hover:text-gray-800">
            My Laughs
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-peach w-64"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
        </div>

        <button className="p-2 text-gray-600 hover:text-gray-800">🔔</button>

        <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">A</span>
        </div>
      </div>
    </nav>
  );
}
