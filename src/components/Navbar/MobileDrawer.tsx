// src/components/Navbar/MobileDrawer.tsx
"use client";

import { Search, Globe, Menu, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Category } from "@/types/category";

export default function MobileDrawer({
  categories,
}: {
  categories: Category[];
}) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <div className="flex flex-col h-full">
      {/* Header cố định */}
      <div className="flex items-center justify-between px-6 py-5 border-b">
        <h2 className="text-xl font-bold">Menu</h2>
        <button className="p-2 -mr-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search for anything"
            className="w-full h-12 pl-12 pr-4 rounded-full border border-gray-300 bg-gray-50 text-sm"
          />
        </div>

        {/* Categories - Đã dùng props categories thay vì hardcode */}
        <div>
          <button
            onClick={() => setCategoriesOpen(!categoriesOpen)}
            className="w-full flex items-center justify-between py-4 text-lg font-semibold"
          >
            <span className="flex items-center gap-3">
              <Menu className="w-6 h-6" />
              Categories
            </span>
            <ChevronRight
              className={`w-5 h-5 transition-transform duration-200 ${
                categoriesOpen ? "rotate-90" : ""
              }`}
            />
          </button>

          {/* Dropdown list - dùng dữ liệu thật từ API */}
          {categoriesOpen && (
            <div className="mt-4 space-y-1 border-l-4 border-purple-600">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`/courses?danhMuc=${cat.id}`}
                  className="block py-3 pl-8 pr-4 text-gray-700 font-medium hover:text-purple-600 hover:bg-purple-50 rounded-r-lg transition-all duration-200"
                >
                  {cat.title}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Links */}
        <nav className="space-y-4 pt-4 border-t">
          <Link
            href="/business"
            className="block text-lg font-medium"
          >
            Udemy Business
          </Link>
          <Link href="/teach" className="block text-lg font-medium">
            Teach on Udemy
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="space-y-3 pt-4 border-t">
          <button className="w-full py-4 text-lg font-bold border-2 border-black rounded-xl hover:bg-gray-50 transition">
            Log in
          </button>
          <button className="w-full py-4 text-lg font-bold text-white bg-black rounded-xl hover:bg-gray-900 transition">
            Sign up
          </button>
        </div>

        {/* Language */}
        <div className="pt-6 border-t">
          <button className="flex items-center gap-3 w-full py-4">
            <Globe className="w-6 h-6" />
            <span className="text-lg font-medium">English</span>
          </button>
        </div>
      </div>
    </div>
  );
}
