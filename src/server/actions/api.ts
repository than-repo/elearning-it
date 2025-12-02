// src/server/actions/api.ts
"use server";

import { api } from "@/lib/api";
import { RawCategory } from "@/types/category";
import { RawCourse } from "@/types/course";
import { PaginatedCoursesResponse } from "@/types/course-api";

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

type GetCoursesParams = {
  page?: number;
  pageSize?: number;
  tenKhoaHoc?: string;
  maDanhMuc?: string;
};

export const getPaginatedCourses = async (
  params: GetCoursesParams = {}
): Promise<PaginatedCoursesResponse> => {
  const {
    page = 1,
    pageSize = 12,
    tenKhoaHoc = "",
    maDanhMuc = "",
  } = params;

  const sp = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    MaNhom: "GP01",
    ...(tenKhoaHoc && { tenKhoaHoc }),
    ...(maDanhMuc && { maDanhMuc }),
  });

  return api<PaginatedCoursesResponse>(
    `/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?${sp}`,
    {
      server: true,
      next: {
        revalidate: 3600,
        tags: [
          "courses",
          `courses-page-${page}`,
          tenKhoaHoc && `courses-search-${tenKhoaHoc}`,
          maDanhMuc && `courses-cat-${maDanhMuc}`,
        ].filter(Boolean) as string[],
      },
    }
  );
};

export const getCategories = async (): Promise<RawCategory[]> => {
  return api<RawCategory[]>("/QuanLyKhoaHoc/LayDanhMucKhoaHoc", {
    server: true,
    next: { revalidate: 86400, tags: ["course-categories"] },
  });
};
