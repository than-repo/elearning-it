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
} from "@/components/Filter/CategoryFilter"; // SỬA: Import type
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

  if (paginatedCourses.length === 0) {
    return (
      <div className="text-center py-20 text-6xl">
        Không tìm thấy khóa học
      </div>
    );
  }

  return (
    <div className="space-y-8">
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
            />{" "}
            {/* Giờ TS match */}
            <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        )}
      </FilterControls>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {paginatedCourses.map((course) => (
          <div key={course.id} className="pointer-events-auto">
            <CourseCard course={course} />
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
