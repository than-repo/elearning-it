// src/server/admin-actions/courseActions.ts
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";
import type {
  RawCourseFromAPI,
  CoursePaginationResponse,
  RawCategoryFromAPI,
} from "@/types/course";

// Helper: lấy headers chung (access_token + TokenCybersoft)

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    throw new Error("Unauthorized: Không tìm thấy access_token");
  }

  const BASE_URL = process.env.BASE_URL!;
  const TOKEN_CYBERSOFT = process.env.NEXT_PUBLIC_CYBERSOFT_TOKEN!;

  return {
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      TokenCybersoft: TOKEN_CYBERSOFT,
      Authorization: `Bearer ${accessToken}`,
    } as Record<string, string>,
  };
}

// 1. Lấy danh sách khóa học + phân trang + search + filter danh mục

export async function getCoursesPaginated({
  page = 1,
  pageSize = 10,
  tenKhoaHoc = "",
  maDanhMuc = "",
}: {
  page?: number;
  pageSize?: number;
  tenKhoaHoc?: string;
  maDanhMuc?: string;
} = {}): Promise<CoursePaginationResponse> {
  const { baseURL, headers } = await getAuthHeaders();

  let url = `${baseURL}/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?MaNhom=GP01&page=${page}&pageSize=${pageSize}`;

  if (tenKhoaHoc.trim()) {
    url += `&tenKhoaHoc=${encodeURIComponent(tenKhoaHoc.trim())}`;
  }

  try {
    const res = await fetch(url, {
      headers,
      cache: "no-store", // luôn lấy mới trong admin
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Lỗi API: ${res.status} - ${errorText}`);
    }

    const data = (await res.json()) as CoursePaginationResponse;

    // Nếu muốn filter thêm theo danh mục ở phía client thì trả luôn items gốc
    // (ở đây mình filter ở server nếu có maDanhMuc – API chưa hỗ trợ nên tạm filter client)
    if (maDanhMuc) {
      data.items = data.items.filter(
        (c) => c.danhMucKhoaHoc.maDanhMucKhoahoc === maDanhMuc
      );
      // Cập nhật totalCount nếu cần (ở đây giữ nguyên để pagination vẫn đúng)
    }

    return data;
  } catch (error) {
    console.error("[getCoursesPaginated] Error:", error);
    // Trả data rỗng để UI không crash (production pattern)
    return {
      currentPage: page,
      count: 0,
      totalPages: 0,
      totalCount: 0,
      items: [],
    };
  }
}

// 2. Lấy danh sách danh mục (cho filter dropdown)

export async function getCategories(): Promise<RawCategoryFromAPI[]> {
  const { baseURL, headers } = await getAuthHeaders();

  try {
    const res = await fetch(
      `${baseURL}/QuanLyKhoaHoc/LayDanhMucKhoaHoc`,
      {
        headers,
        next: { revalidate: 3600 }, // cache 1 giờ
      }
    );

    if (!res.ok) throw new Error("Lỗi lấy danh mục");

    return (await res.json()) as RawCategoryFromAPI[];
  } catch (error) {
    console.error("[getCategories] Error:", error);
    return [];
  }
}

// 3. Lấy chi tiết 1 khóa học

export async function getCourseDetail(
  maKhoaHoc: string
): Promise<RawCourseFromAPI | null> {
  const { baseURL, headers } = await getAuthHeaders();

  try {
    const res = await fetch(
      `${baseURL}/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`,
      { headers, cache: "no-store" }
    );

    if (!res.ok) {
      console.warn(
        `[getCourseDetail] Không tìm thấy khóa học với maKhoaHoc = ${maKhoaHoc}`
      );
      return null; // Trả null thay vì throw - không crash server
    }

    return (await res.json()) as RawCourseFromAPI;
  } catch (error) {
    console.error("[getCourseDetail] Error:", error);
    return null;
  }
}

// 4. Xóa khóa học (API thật: POST + body { "maKhoaHoc": "..." })

export async function deleteCourse(
  maKhoaHoc: string
): Promise<boolean> {
  const { baseURL, headers } = await getAuthHeaders();

  try {
    const res = await fetch(
      `${baseURL}/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`,
      {
        method: "DELETE",
        headers,
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Xóa thất bại");
    }

    revalidatePath("/admin/courses");
    return true;
  } catch (error: any) {
    console.error("[deleteCourse] Error:", error);
    throw new Error(error.message || "Xóa khóa học thất bại");
  }
}

// 5. Tạo khóa học + upload ảnh (API chính thức CyberSoft)

export async function createCourseWithImage(
  formData: FormData
): Promise<boolean> {
  const { baseURL, headers } = await getAuthHeaders();

  try {
    const res = await fetch(
      `${baseURL}/QuanLyKhoaHoc/ThemKhoaHocUploadHinh`,
      {
        method: "POST",
        headers: {
          TokenCybersoft: headers.TokenCybersoft,
          // Không set Content-Type - browser tự set multipart/form-data
        },
        body: formData,
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Tạo khóa học thất bại");
    }

    revalidatePath("/admin/courses");
    return true;
  } catch (error: any) {
    console.error("[createCourseWithImage] Error:", error);
    throw new Error(error.message || "Tạo khóa học thất bại");
  }
}

// 6. Cập nhật khóa học (API PUT - không có upload ảnh)

export async function updateCourse(
  courseData: any
): Promise<boolean> {
  const { baseURL, headers } = await getAuthHeaders();

  // ĐẢM BẢO CÓ ĐỦ CÁC TRƯỜNG BẮT BUỘC – KHÔNG ĐƯỢC THIẾU HOẶC RỖNG!
  const payload = {
    maKhoaHoc: courseData.maKhoaHoc?.trim() || "",
    biDanh:
      courseData.biDanh?.trim() ||
      courseData.maKhoaHoc?.toLowerCase().replace(/\s+/g, "-"),
    tenKhoaHoc: courseData.tenKhoaHoc?.trim() || "Chưa đặt tên",
    moTa: courseData.moTa?.trim() || "Chưa có mô tả",
    luotXem: Number(courseData.luotXem ?? 0),
    danhGia: Number(courseData.danhGia ?? 0),
    hinhAnh:
      courseData.hinhAnh ||
      "https://picsum.photos/seed/default/300/200", // ảnh mặc định nếu rỗng
    maNhom: courseData.maNhom || "GP01",
    ngayTao:
      courseData.ngayTao || new Date().toLocaleDateString("en-GB"),
    maDanhMucKhoaHoc:
      courseData.maDanhMucKhoaHoc?.trim() || "BackEnd", // fallback
    taiKhoanNguoiTao: courseData.taiKhoanNguoiTao?.trim() || "admin",
  };

  // Kiểm tra bắt buộc không được rỗng
  if (
    !payload.maKhoaHoc ||
    !payload.biDanh ||
    !payload.tenKhoaHoc ||
    !payload.maDanhMucKhoaHoc
  ) {
    throw new Error("Thiếu thông tin bắt buộc để cập nhật khóa học");
  }

  try {
    const res = await fetch(
      `${baseURL}/QuanLyKhoaHoc/CapNhatKhoaHoc`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("API Update Error:", err);
      throw new Error(err || "Cập nhật thất bại");
    }

    revalidatePath("/admin/courses");
    revalidatePath(`/admin/courses/${payload.maKhoaHoc}`);
    return true;
  } catch (error: any) {
    console.error("[updateCourse] Error:", error);
    throw new Error(error.message || "Cập nhật khóa học thất bại");
  }
}
