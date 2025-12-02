// src/server/actions/api.ts
"use server";

import { api } from "@/lib/api";
import { RawCategory } from "@/types/category";
import { RawCourse } from "@/types/course";

export const getAllCourses = async (): Promise<RawCourse[]> => {
  return api<RawCourse[]>(
    "/QuanLyKhoaHoc/LayDanhSachKhoaHoc?maNhom=GP01",
    {
      server: true,
      next: { revalidate: 3600, tags: ["courses"] },
    }
  );
};

export const getCourseDetail = async (
  maKhoaHoc: string
): Promise<RawCourse> => {
  return api<RawCourse>(
    `/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`,
    {
      server: true,
      next: { revalidate: 3600, tags: [`course-${maKhoaHoc}`] },
    }
  );
};

export const getCourseCategories = async () => {
  return api<any[]>("/QuanLyKhoaHoc/LayDanhMucKhoaHoc", {
    server: true,
    next: { revalidate: 86400, tags: ["categories"] },
  });
};
