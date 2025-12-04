"use client";

import React, { useMemo } from "react";
import CourseCard from "./Card";
import Pagination from "@/components/Pagination";
import FilterControls from "@/components/Filter/FilterControls";
import SearchInput from "@/components/Filter/SearchInput";
import CategoryFilter from "@/components/Filter/CategoryFilter";
import SortSelect from "@/components/Filter/SortSelect";
import { useFilter } from "@/components/Filter/useFilter";
import type { Course } from "@/types/course";
import type { Category } from "@/types/category";

interface Props {
  serializedCourses: string;
  serializedCategories: string;
  defaultCategorySlug?: string;
}

export default function CoursesClient({
  serializedCourses,
  serializedCategories,
  defaultCategorySlug,
}: Props) {
  // Parse chỉ 1 lần duy nhất → React không tạo lại object mới mỗi render
  const courses = useMemo<Course[]>(
    () => JSON.parse(serializedCourses),
    [serializedCourses]
  );

  const categories = useMemo<Category[]>(
    () => JSON.parse(serializedCategories),
    [serializedCategories]
  );

  // useFilter nhận đúng data đã parse + memoized
  const {
    searchTerm,
    debouncedSetSearch,
    category,
    setCategory,
    sortBy,
    setSortBy,
    allCategories,
    paginatedCourses,
    totalPages,
    currentPage,
    setPage,
  } = useFilter(courses, categories);

  // Nếu là trang SEO → tự động chọn danh mục (không hiện filter cũng được, nhưng vẫn hoạt động)
  React.useEffect(() => {
    if (defaultCategorySlug && category === "") {
      setCategory(defaultCategorySlug);
    }
  }, [defaultCategorySlug, category, setCategory]);
  return (
    <div className="space-y-8">
      {/* Bộ lọc */}
      <FilterControls courses={courses} categories={categories}>
        {(props: any) => (
          <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm">
            <SearchInput
              searchTerm={props.searchTerm}
              debouncedSetSearch={props.debouncedSetSearch}
            />
            <CategoryFilter
              category={props.category}
              setCategory={props.setCategory}
              allCategories={props.allCategories}
            />
            <SortSelect
              sortBy={props.sortBy}
              setSortBy={props.setSortBy}
            />
          </div>
        )}
      </FilterControls>

      {/* Danh sách khóa học */}
      <div
        id="courses-list"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-h-[600px]"
      >
        {paginatedCourses.length > 0 ? (
          paginatedCourses.map((course) => (
            <div key={course.id} className="h-full">
              <CourseCard course={course} />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-32 text-center">
            <div className="text-7xl mb-6">Search Icon</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Không tìm thấy khóa học nào
            </h3>
            <p className="text-gray-500 max-w-md">
              Hãy thử thay đổi từ khóa, chọn danh mục khác hoặc bỏ bộ
              lọc để xem thêm kết quả.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
