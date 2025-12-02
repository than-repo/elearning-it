// src/data/courses.ts
import { cache } from "react";
import { getAllCourses, getCourseDetail } from "@/server/actions/api";
import { RawCourse, Course } from "@/types/course";

// Map từ RawCourse → Course (chỉ dùng maKhoaHoc làm slug)
// src/data/courses.ts
export const mapRawToCourse = (raw: RawCourse): Course => {
  // ← FIX CHÍNH TẠI ĐÂY: Nếu maKhoaHoc rỗng → dùng biDanh hoặc fallback
  const safeId =
    raw.maKhoaHoc.trim() ||
    raw.biDanh?.trim() ||
    `course-${Date.now()}-${Math.random()}`;

  return {
    id: safeId,
    slug: safeId, // ← vẫn dùng làm slug
    title: raw.tenKhoaHoc,
    description:
      raw.moTa || "Khóa học chất lượng từ Cybersoft Academy",
    thumbnail: raw.hinhAnh || "/img/fallback-course.png",
    views: raw.luotXem || 0,
    studentsCount: raw.soLuongHocVien || 0,
    groupCode: raw.maNhom || "GP01",
    createdAt: raw.ngayTao || "Không rõ",
    creator: {
      account: raw.nguoiTao.taiKhoan || "unknown",
      fullName: raw.nguoiTao.hoTen || "Giảng viên",
      roleCode: raw.nguoiTao.maLoaiNguoiDung || "GV",
      roleName: raw.nguoiTao.tenLoaiNguoiDung || "Giáo vụ",
    },
    category: {
      id: raw.danhMucKhoaHoc.maDanhMucKhoahoc || "Unknown",
      name: raw.danhMucKhoaHoc.tenDanhMucKhoaHoc || "Chưa xác định",
    },
  };
};

// Cache danh sách toàn bộ khóa học (chỉ gọi API 1 lần)
const getAllCached = cache(getAllCourses);

// Lấy danh sách khóa học (dùng ở trang /courses)
export const getCourses = cache(async (): Promise<Course[]> => {
  const rawCourses = await getAllCached();
  return rawCourses.map(mapRawToCourse);
});

// Lấy chi tiết khóa học theo maKhoaHoc (dùng ở trang /courses/[id])
export const getCourseById = cache(
  async (id: string): Promise<Course | null> => {
    const allCourses = await getAllCached();
    const found = allCourses.find((c) => c.maKhoaHoc === id);
    if (!found) return null;

    try {
      const detail = await getCourseDetail(id);
      return mapRawToCourse(detail);
    } catch {
      // Nếu API detail lỗi → vẫn trả về từ danh sách (vẫn tốt hơn 404)
      return mapRawToCourse(found);
    }
  }
);
