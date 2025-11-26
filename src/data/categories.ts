import { cache } from "react";
import { getCourseCategories } from "@/server/actions/api";

import { Category } from "@/types/category";

export const getCategories = cache(async (): Promise<Category[]> => {
  console.log("Fetching categories from API...");

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
