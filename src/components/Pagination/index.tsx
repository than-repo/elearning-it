"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  useRouter,
  useSearchParams,
  usePathname,
} from "next/navigation";
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
// } from "@heroicons/react/24/outline"; // npm i @heroicons/react nếu chưa

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    if (currentPage - delta > 2) range.unshift("...");
    if (currentPage + delta < totalPages - 1) range.push("...");
    return [1, ...range, totalPages].filter((p) => p !== "...");
  };

  return (
    <nav aria-label="Pagination" className="flex justify-center mt-8">
      <ul className="flex items-center space-x-1">
        {/* Previous */}
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-3 h-10 text-gray-600 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="w-5 h-5" />
            <span className="sr-only">Previous</span>
          </button>
        </li>

        {/* Pages */}
        {getVisiblePages().map((page, idx) => (
          <li key={idx}>
            {page === "..." ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`px-3 py-2 text-sm font-medium ${
                  currentPage === page
                    ? "text-blue-600 bg-blue-50 border border-blue-300"
                    : "text-gray-600 bg-white border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {/* Next */}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center px-3 h-10 text-gray-600 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon className="w-5 h-5" />
            <span className="sr-only">Next</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
