import { api } from "@/lib/api";

export const fetchCourses = async (search?: string) => {
  // "use server";
  console.log(" ĐANG FETCH LẠI DATA -", new Date().toISOString());
  const endpoint = search
    ? `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${search}&maNhom=GP01`
    : `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?maNhom=GP01`;

  return await api<any[]>(endpoint, {
    method: "GET",
    server: true,
    auth: false,
    next: { revalidate: 3600 },
  });
};

export const getCourseCategories = async () => {
  // "use server";

  const endpoint = "/QuanLyKhoaHoc/LayDanhMucKhoaHoc";

  return await api<any[]>(endpoint, {
    method: "GET",
    server: true,
    auth: false,
    next: { revalidate: 3600 },
  });
};
