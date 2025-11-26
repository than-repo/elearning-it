// src/components/Navbar/DesktopCategories.tsx

"use client";

import { ChevronRight } from "lucide-react";
import { Category } from "@/types/category";

const CATEGORIES = [
  "Development",
  "Business",
  "Finance & Accounting",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Lifestyle",
  "Photography & Video",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
];

export default function DesktopCategories({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="hidden lg:block relative group">
      {/* Nút Categories */}
      <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold hover:bg-gray-100 rounded-lg transition">
        Categories
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* Dropdown */}
      <div className="absolute top-full left-0 mt-2 w-96 bg-white border border-gray-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-50 overflow-hidden">
        <div className="py-4">
          {/* Header tím giống Udemy */}
          <div className="bg-purple-700 text-white px-6 py-4">
            <h3 className="text-lg font-bold">Explore by category</h3>
          </div>

          {/* Danh sách 2 cột */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
              {CATEGORIES.map((category) => (
                <a
                  key={category}
                  href={`/categories/${category
                    .toLowerCase()
                    .replace(/ & /g, "-")
                    .replace(/ /g, "-")}`}
                  className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-800 rounded-lg hover:bg-purple-50 hover:text-purple-700 transition group/item"
                >
                  <span>{category}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover/item:opacity-100 transition" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
