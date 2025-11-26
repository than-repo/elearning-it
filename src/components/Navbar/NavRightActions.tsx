// src/components/Navbar/NavRightActions.tsx

import Link from "next/link";
import { Globe, ShoppingCart } from "lucide-react";

export default function NavRightActions() {
  return (
    <div className="hidden lg:flex items-center gap-6">
      <Link
        href="/About"
        className="text-sm font-medium hover:text-purple-700"
      >
        Udemy Business
      </Link>

      <Link
        href="/Product"
        className="text-sm font-medium hover:text-purple-700"
      >
        Teach on Udemy
      </Link>

      <button className="relative p-2 hover:bg-gray-100 rounded-lg">
        <ShoppingCart className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center  rounded-full bg-purple-700 text-xs text-white font-bold">
          3
        </span>
      </button>

      <div className="flex items-center gap-3">
        <button className="px-4 py-2 text-sm font-bold border border-black hover:bg-gray-100 rounded-lg">
          Log in
        </button>

        <button className="px-4 py-2 text-sm font-bold text-white bg-purple-700  hover:bg-purple-800 rounded-lg shadow-md">
          Sign up
        </button>
      </div>

      <button className="p-2 border border-black rounded-lg hover:bg-gray-100">
        <Globe className="h-5 w-5" />
      </button>
    </div>
  );
}
