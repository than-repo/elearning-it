//src\components\Filter\SortSelect.tsx
"use client";

import React from "react";

interface SortSelectProps {
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export default function SortSelect({
  sortBy,
  setSortBy,
}: SortSelectProps) {
  return (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="newest">Mới nhất</option>
      <option value="views">Lượt xem nhiều nhất</option>
    </select>
  );
}
