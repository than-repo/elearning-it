// components/layout/UdemyNavbar.tsx
import Link from "next/link";
import { Menu, Search, ShoppingCart, Globe } from "lucide-react";

export default function UdemyNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* ==================== LEFT ==================== */}
          <div className="flex items-center gap-4 lg:gap-8">
            {/* Mobile Menu */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            {/* Logo - thay bằng file SVG trong public */}
            <Link href="/" className="flex items-center">
              <img
                src="/mylogo.svg"
                alt="Logo"
                className="h-8 w-auto lg:h-9"
              />
            </Link>
            {/* Categories - chỉ hiện trên desktop */}
            <div className="hidden lg:flex items-center">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg transition">
                Categories
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* ==================== CENTER - SEARCH ==================== */}
          <div className="hidden md:flex flex-1 max-w-full max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search for anything"
                className="w-full h-12 pl-12 pr-6 rounded-full border border-gray-300 bg-gray-50 focus:bg-white focus:border-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-100 transition"
              />
            </div>
          </div>

          {/* Mobile Search Icon */}
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
            <Search className="h-5 w-5" />
          </button>

          {/* ==================== RIGHT ==================== */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/business"
                className="text-sm font-medium hover:text-purple-700 transition"
              >
                Udemy Business
              </Link>
              <Link
                href="/teach"
                className="text-sm font-medium hover:text-purple-700 transition"
              >
                Teach on Udemy
              </Link>
            </div>

            {/* Cart */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-700 text-xs text-white font-bold">
                3
              </span>
            </button>

            {/* Login / Sign up - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              <button className="px-4 py-2 text-sm font-bold text-gray-900 border border-gray-900 rounded-lg hover:bg-gray-100 transition">
                Log in
              </button>
              <button className="px-4 py-2 text-sm font-bold text-white bg-purple-700 rounded-lg hover:bg-purple-800 transition shadow-md">
                Sign up
              </button>
            </div>

            {/* Language */}
            <button className="hidden md:flex p-2 border border-gray-900 rounded-lg hover:bg-gray-100 transition">
              <Globe className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
