// src/components/Filter/useFilter.ts
"use client";
import { useState, useMemo, useEffect, useCallback } from "react";
import {
  useSearchParams,
  useRouter,
  usePathname,
} from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Course } from "@/types/course";
import { Category } from "@/types/category";

// Local type cho dropdown
interface CourseCategory {
  id: string;
  name: string;
}

interface FilterState {
  immediateSearch: string; // Real-time cho input + URL
  category: string;
  sortBy: string;
  currentPage: number;
}

export function useFilter(courses: Course[], categories: Category[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Map categories
  const allCategories = useMemo(() => {
    const unique: CourseCategory[] = categories.map((cat) => ({
      id: cat.id,
      name: cat.title,
    }));
    return [{ id: "", name: "Tất cả danh mục" }, ...unique];
  }, [categories]);

  // Initial state từ URL
  const [state, setState] = useState<FilterState>({
    immediateSearch: searchParams.get("q") || "",
    category: searchParams.get("danhMuc") || "",
    sortBy: searchParams.get("sort") || "newest",
    currentPage: Math.max(
      1,
      parseInt(searchParams.get("page") || "1")
    ),
  });

  // Debounced search TERM cho FILTER (separate từ URL update)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(
    state.immediateSearch
  );
  const debouncedFilterSearch = useDebouncedCallback(
    (value: string) => {
      setDebouncedSearchTerm(value);
    },
    300
  );

  // Update URL (dùng immediateSearch cho sync URL)
  const updateUrl = useCallback(
    (newState: Partial<FilterState>) => {
      const newFullState = { ...state, ...newState };
      setState(newFullState);
      const params = new URLSearchParams(searchParams.toString());
      if (newFullState.immediateSearch) {
        params.set("q", newFullState.immediateSearch);
      } else {
        params.delete("q");
      }
      if (newFullState.category) {
        params.set("danhMuc", newFullState.category);
      } else {
        params.delete("danhMuc");
      }
      if (newFullState.sortBy && newFullState.sortBy !== "newest") {
        params.set("sort", newFullState.sortBy);
      } else {
        params.delete("sort");
      }
      params.set("page", newFullState.currentPage.toString());
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    },
    [state, router, pathname, searchParams]
  );

  // Set search: Update immediate + debounce filter
  const setImmediateSearch = useCallback(
    (value: string) => {
      updateUrl({ immediateSearch: value, currentPage: 1 });
      debouncedFilterSearch(value); // Debounce chỉ cho filter
    },
    [updateUrl, debouncedFilterSearch]
  );

  // Sync state từ URL
  useEffect(() => {
    const urlSearch = searchParams.get("q") || "";
    const urlCategory = searchParams.get("danhMuc") || "";
    const urlSort = searchParams.get("sort") || "newest";
    const urlPage = Math.max(
      1,
      parseInt(searchParams.get("page") || "1")
    );
    setState({
      immediateSearch: urlSearch,
      category: urlCategory,
      sortBy: urlSort,
      currentPage: urlPage,
    });
    debouncedFilterSearch(urlSearch); // Sync debounce
  }, [searchParams, debouncedFilterSearch]);

  // Sync debounced với immediate khi URL change
  useEffect(() => {
    setDebouncedSearchTerm(state.immediateSearch);
  }, [state.immediateSearch]);

  // Filter + Sort: Chỉ dùng debouncedSearchTerm để tránh lag khi typing
  const filteredAndSorted = useMemo(() => {
    let result = [...courses];
    // Filter search (debounced)
    if (debouncedSearchTerm) {
      const term = debouncedSearchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(term) ||
          c.description.toLowerCase().includes(term)
      );
    }
    // Filter category
    if (state.category) {
      result = result.filter((c) => c.category.id === state.category);
    }
    // Sort
    switch (state.sortBy) {
      case "views":
        result.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "newest":
      default:
        result.sort((a, b) => {
          const dateA = new Date(
            a.createdAt.split("/").reverse().join("-")
          );
          const dateB = new Date(
            b.createdAt.split("/").reverse().join("-")
          );
          return dateB.getTime() - dateA.getTime();
        });
        break;
    }
    return result;
  }, [courses, debouncedSearchTerm, state.category, state.sortBy]); // Deps: debounced thay vì immediate

  // Pagination
  const limit = 12;
  const totalPages = Math.ceil(filteredAndSorted.length / limit);
  const paginatedCourses = useMemo(() => {
    const start = (state.currentPage - 1) * limit;
    return filteredAndSorted.slice(start, start + limit);
  }, [filteredAndSorted, state.currentPage]);

  return {
    searchTerm: state.immediateSearch, // Cho input (real-time)
    debouncedSetSearch: setImmediateSearch, // Callback cho input
    debouncedSearchTerm, // Internal cho filter
    category: state.category,
    setCategory: (cat: string) =>
      updateUrl({
        category: cat === state.category ? "" : cat,
        currentPage: 1,
      }),
    sortBy: state.sortBy,
    setSortBy: (sort: string) =>
      updateUrl({ sortBy: sort, currentPage: 1 }),
    currentPage: state.currentPage,
    setPage: (page: number) => updateUrl({ currentPage: page }),
    allCategories,
    filteredAndSorted,
    paginatedCourses,
    totalPages,
    limit,
  };
}
