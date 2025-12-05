// src/server/actions/authActions.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE = "https://elearningnew.cybersoft.edu.vn/api";
const TOKEN = process.env.NEXT_PUBLIC_CYBERSOFT_TOKEN!;

// ĐĂNG NHẬP
export async function loginAction(formData: FormData) {
  const taiKhoan = formData.get("taiKhoan") as string;
  const matKhau = formData.get("matKhau") as string;

  let redirectTo = "/courses";
  let errorMessage: string | null = null;

  try {
    const res = await fetch(`${API_BASE}/QuanLyNguoiDung/DangNhap`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        TokenCybersoft: TOKEN,
      },
      body: JSON.stringify({ taiKhoan, matKhau }),
    });

    const data = await res.json();

    if (!res.ok) {
      errorMessage =
        data.message ||
        data.content ||
        "Tài khoản hoặc mật khẩu không đúng";
    } else {
      // Thành công → lưu cookie
      const cookieStore = await cookies();
      cookieStore.set("access_token", data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60, // 30 ngày
      });
    }
  } catch (err) {
    errorMessage = "Có lỗi mạng, vui lòng thử lại";
  }

  // QUAN TRỌNG: redirect() PHẢI nằm NGOÀI try/catch hoàn toàn
  if (errorMessage) {
    redirect(`/login?error=${encodeURIComponent(errorMessage)}`);
  }

  redirect(redirectTo);
}

// ĐĂNG KÝ
export async function registerAction(formData: FormData) {
  const payload = {
    taiKhoan: formData.get("taiKhoan") as string,
    matKhau: formData.get("matKhau") as string,
    email: formData.get("email") as string,
    hoTen: (formData.get("hoTen") as string) || "",
    soDT: (formData.get("soDT") as string) || "",
    maNhom: "GP01",
    maLoaiNguoiDung: "HV", // sửa đúng tên field
  };

  let errorMessage: string | null = null;

  try {
    const res = await fetch(`${API_BASE}/QuanLyNguoiDung/DangKy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        TokenCybersoft: TOKEN,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      errorMessage =
        data.message || data.content || "Đăng ký thất bại";
    } else {
      // Đăng ký thành công → tự động login
      const cookieStore = await cookies();
      cookieStore.set("access_token", data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
      });
    }
  } catch (err) {
    errorMessage = "Có lỗi mạng khi đăng ký";
  }

  if (errorMessage) {
    redirect(`/register?error=${encodeURIComponent(errorMessage)}`);
  }

  redirect("/courses");
}
