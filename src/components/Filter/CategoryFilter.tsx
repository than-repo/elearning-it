//src\components\Filter\CategoryFilter.tsx
"use client";

import React from "react";

// MỚI: Export interface để import named
export interface CategoryFilterProps {
  category: string;
  setCategory: (cat: string) => void;
  allCategories: { id: string; name: string }[];
}

export default function CategoryFilter({
  category,
  setCategory,
  allCategories,
}: CategoryFilterProps) {
  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {allCategories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}
