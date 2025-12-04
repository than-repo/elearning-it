//src\data\categories.ts
import { cache } from "react";
import {
  getAllCourses,
  getCourseCategories,
} from "@/server/actions/api";

import { Category } from "@/types/category";
import { Course } from "@/types/course";
import { mapRawToCourse } from "./courses";

export const getCategories = cache(async (): Promise<Category[]> => {
  // console.log("Fetching categories from API...");
  const rawCategories = await getCourseCategories();

  return rawCategories.map((cat) => ({
    id: cat.maDanhMuc,
    title: cat.tenDanhMuc,
    slug: cat.tenDanhMuc
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // bỏ dấu tiếng Việt
      .replace(/đ/g, "d")
      .replace(/Đ/g, "d")
      .replace(/ & /g, "-")
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, ""),
  }));
});

export const getCoursesByCategoryId = cache(
  async (categoryId: string): Promise<Course[]> => {
    const allRawCourses = await getAllCourses(); // đã cache 1h

    const filtered = allRawCourses.filter(
      (c) => c.danhMucKhoaHoc?.maDanhMucKhoahoc === categoryId
    );

    return filtered.map(mapRawToCourse);
  }
);
