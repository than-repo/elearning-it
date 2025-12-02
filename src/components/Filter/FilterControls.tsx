//src\components\Filter\FilterControls.tsx
"use client";

import React, { ReactNode } from "react";
import { useFilter } from "./useFilter";
import type { Course } from "@/types/course";
import type { Category } from "@/types/category";

// Interface (export để import named)
export interface FilterCallbackProps {
  searchTerm: string;
  debouncedSetSearch: (value: string) => void;
  category: string;
  setCategory: (cat: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  allCategories: { id: string; name: string }[];
}

interface FilterControlsProps {
  courses: Course[];
  categories: Category[];
  children: (props: FilterCallbackProps) => ReactNode;
}

export default function FilterControls({
  courses,
  categories,
  children,
}: FilterControlsProps) {
  // export default component
  const {
    searchTerm,
    debouncedSetSearch,
    category,
    setCategory,
    sortBy,
    setSortBy,
    allCategories,
  } = useFilter(courses, categories);

  // Build props object
  const callbackProps: FilterCallbackProps = {
    searchTerm,
    debouncedSetSearch,
    category,
    setCategory,
    sortBy,
    setSortBy,
    allCategories,
  };

  return <>{children(callbackProps)}</>;
}
