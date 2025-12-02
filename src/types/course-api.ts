// src/types/course-api.ts
import type { RawCourse } from "./course";
import type { RawCategory } from "./category";

export type PaginatedCoursesResponse = {
  items: RawCourse[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  count: number;
};

export type { RawCategory as CategoryFromAPI } from "./category";
