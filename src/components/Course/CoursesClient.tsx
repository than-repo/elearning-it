// src/components/Course/CoursesClient.tsx
"use client";
import React from "react";
import CourseCard from "./Card";
import Pagination from "@/components/Pagination";
import FilterControls, {
  FilterCallbackProps,
} from "@/components/Filter/FilterControls";
import SearchInput from "@/components/Filter/SearchInput";
import CategoryFilter, {
  CategoryFilterProps,
} from "@/components/Filter/CategoryFilter";
import SortSelect from "@/components/Filter/SortSelect";
import { useFilter } from "@/components/Filter/useFilter";
import type { Course } from "@/types/course";
import type { Category } from "@/types/category";

interface Props {
  courses: Course[];
  categories: Category[];
}

export default function CoursesClient({
  courses,
  categories,
}: Props) {
  const { paginatedCourses, totalPages, currentPage, setPage } =
    useFilter(courses, categories);

  return (
    <div className="space-y-8">
      {/* Filter luôn render, không mất khi empty */}
      <FilterControls courses={courses} categories={categories}>
        {({
          searchTerm,
          debouncedSetSearch,
          category,
          setCategory,
          sortBy,
          setSortBy,
          allCategories,
        }: FilterCallbackProps) => (
          <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm">
            <SearchInput
              searchTerm={searchTerm}
              debouncedSetSearch={debouncedSetSearch}
            />
            <CategoryFilter
              category={category}
              setCategory={setCategory}
              allCategories={allCategories}
            />
            <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        )}
      </FilterControls>

      {/* Grid container với height min để center empty state */}
      <div className="relative">
        {" "}
        {/* Wrapper relative để absolute center nếu cần */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-h-[500px] place-items-stretch auto-rows-fr">
          {" "}
          {/* auto-rows-fr: rows fractional dựa trên tallest */}
          {paginatedCourses.length > 0 ? (
            paginatedCourses.map((course) => (
              <div
                key={course.id}
                className="h-full w-full max-w-sm mx-auto" // Uniform width + height stretch
              >
                <CourseCard course={course} />
              </div>
            ))
          ) : (
            // Empty state giữ nguyên
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500 w-full">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                Không tìm thấy khóa học nào
              </h3>
              <p className="text-gray-400 text-center max-w-md">
                Thử thay đổi từ khóa tìm kiếm, chọn danh mục khác,
                hoặc xóa bộ lọc để xem thêm.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination chỉ show nếu có pages */}
      {totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
