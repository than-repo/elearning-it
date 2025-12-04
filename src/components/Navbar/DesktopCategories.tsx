//src\components\Navbar\DesktopCategories.tsx
"use client";

import { ChevronRight } from "lucide-react";
import { Category } from "@/types/category";

export default function DesktopCategories({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="hidden lg:block relative group">
      <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold hover:bg-gray-100 rounded-lg transition">
        Categories
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </button>

      <div className="absolute top-full left-0 mt-2 w-96 bg-white border rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        <div className="py-4">
          <div className="bg-purple-700 text-white px-6 py-4">
            <h3 className="text-lg font-bold">Explore by category</h3>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`/courses?danhMuc=${cat.id}`}
                  className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-800 rounded-lg hover:bg-purple-50 hover:text-purple-700 transition"
                >
                  <span>{cat.title}</span>
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
