// src/components/Pagination.tsx
"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCallback } from "react";

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
  // Tạo ref hoặc dùng ID để scroll tới (ở đây mình scroll tới đầu danh sách khóa học)
  const scrollToTop = useCallback(() => {
    // Cách 1: Scroll mượt đến phần danh sách khóa học (tốt nhất)
    const element = document.getElementById("courses-list");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Cách 2: Nếu không có ID → scroll lên đầu trang
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handlePageChange = (page: number) => {
    onPageChange(page);
    // Scroll lên đầu ngay sau khi đổi trang
    setTimeout(scrollToTop, 100); // nhỏ delay để Next.js render xong
  };

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
    return [1, ...range, totalPages];
  };

  const pages = getVisiblePages();

  return (
    <nav
      aria-label="Pagination"
      className="flex justify-center mt-12"
    >
      <ul className="flex items-center gap-1 flex-wrap">
        {/* Previous */}
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            aria-label="Previous page"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
        </li>

        {/* Page Numbers */}
        {pages.map((page, idx) => (
          <li key={idx}>
            {page === "..." ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              <button
                onClick={() => handlePageChange(page as number)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-purple-600 text-white border border-purple-600"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
                aria-current={
                  currentPage === page ? "page" : undefined
                }
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {/* Next */}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            aria-label="Next page"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
