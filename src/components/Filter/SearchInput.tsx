// src/components/Filter/SearchInput.tsx
"use client";
import React, { useState, useEffect } from "react";

interface SearchInputProps {
  searchTerm: string; // Từ parent (debounced value cho filter)
  debouncedSetSearch: (value: string) => void;
  onImmediateChange?: (value: string) => void; // Optional: Nếu cần sync real-time elsewhere
}

export default function SearchInput({
  searchTerm,
  debouncedSetSearch,
  onImmediateChange,
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(searchTerm);

  // Sync local với parent khi parent change (e.g. từ URL)
  useEffect(() => {
    setLocalValue(searchTerm);
  }, [searchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalValue(value);
    if (onImmediateChange) onImmediateChange(value); // Nếu cần
    debouncedSetSearch(value); // Debounce cho filter + URL
  };

  return (
    <input
      type="text"
      value={localValue}
      onChange={handleChange}
      placeholder="Tìm kiếm khóa học..."
      className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
