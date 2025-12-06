// src/server/auth/get-user.ts
"use server";

import { cookies } from "next/headers";

const API_BASE = "https://elearningnew.cybersoft.edu.vn/api";
const TOKEN = process.env.NEXT_PUBLIC_CYBERSOFT_TOKEN!;

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) return null;

  try {
    const res = await fetch(
      `${API_BASE}/QuanLyNguoiDung/ThongTinNguoiDung`,
      {
        method: "POST",
        headers: {
          TokenCybersoft: TOKEN,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.ok) {
      const cookieStore = await cookies();
      cookieStore.delete("access_token"); // ← QUAN TRỌNG: xóa token chết
      return null;
    }

    const data = await res.json();

    return {
      taiKhoan: data.taiKhoan,
      hoTen: data.hoTen || data.taiKhoan,
      email: data.email,
      soDT: data.soDT,
      maLoaiNguoiDung: data.maLoaiNguoiDung,
    };
  } catch {
    return null;
  }
}
