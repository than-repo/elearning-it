// src/components/Navbar/SearchBar.tsx

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="hidden md:flex flex-1 max-w-xl mx-4 lg:mx-8">
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search for anything"
          className="w-full h-11 pl-12 pr-6 rounded-full border border-gray-300 bg-gray-50 focus:bg-white focus:border-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all"
        />
      </div>
    </div>
  );
}
