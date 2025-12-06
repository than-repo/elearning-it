// src/server/admin-actions/dashboardActions.ts
"use server";

import { cookies } from "next/headers";

/**
 * Lấy thống kê tổng quan cho Admin Dashboard
 * Dùng các API chính thức từ Cybersoft:
 * - LayDanhSachKhoaHoc
 * - LayDanhSachNguoiDung?MaNhom=GP01
 * - (Ghi danh & tăng trưởng sẽ tính từ dữ liệu người dùng)
 */
export async function getDashboardStats() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    throw new Error("Unauthorized: Không tìm thấy access_token");
  }

  const BASE_URL = "https://elearningnew.cybersoft.edu.vn/api";
  const TOKEN_CYBERSOFT = process.env.NEXT_PUBLIC_CYBERSOFT_TOKEN;

  const headers = {
    "Content-Type": "application/json;charset=UTF-8",
    TokenCybersoft: TOKEN_CYBERSOFT!,
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    // 1. Lấy danh sách khóa học
    const coursesRes = await fetch(
      `${BASE_URL}/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01`,
      { headers, cache: "no-store" }
    );

    // 2. Lấy danh sách người dùng
    const usersRes = await fetch(
      `${BASE_URL}/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`,
      { headers, cache: "no-store" }
    );

    if (!coursesRes.ok || !usersRes.ok) {
      throw new Error("Lỗi khi gọi API Cybersoft");
    }

    const courses = await coursesRes.json();
    const users = await usersRes.json();

    // Tính tổng lượt ghi danh từ chiTietKhoaHocGhiDanh của từng user
    const totalEnrollments = users.reduce(
      (sum: number, user: any) => {
        return sum + (user.chiTietKhoaHocGhiDanh?.length || 0);
      },
      0
    );

    // Tăng trưởng: tạm tính 12.5% (sẽ nâng cấp sau bằng so sánh tháng)
    const growthPercentage = 12.5;

    return {
      totalCourses: courses.length,
      totalUsers: users.length,
      totalEnrollments,
      growthPercentage,
    };
  } catch (error) {
    console.error("[Admin Dashboard] Lỗi fetch stats:", error);
    // Trả mock data nếu lỗi → UI không crash (chuẩn production)
    return {
      totalCourses: 0,
      totalUsers: 0,
      totalEnrollments: 0,
      growthPercentage: 0,
    };
  }
}
