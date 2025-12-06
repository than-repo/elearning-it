"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE = "https://elearningnew.cybersoft.edu.vn/api";
const TOKEN = process.env.NEXT_PUBLIC_CYBERSOFT_TOKEN!;

export async function loginAction(formData: FormData) {
  const taiKhoan = formData.get("taiKhoan") as string;
  const matKhau = formData.get("matKhau") as string;

  let redirectPath = "/courses?success=login";

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
      throw new Error(
        data.message ||
          data.content ||
          "Tài khoản hoặc mật khẩu không đúng"
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("access_token", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
  } catch (err: any) {
    redirectPath = `/login?error=${encodeURIComponent(err.message)}`;
  }

  redirect(redirectPath);
}

export async function registerAction(formData: FormData) {
  const payload = {
    taiKhoan: formData.get("taiKhoan") as string,
    matKhau: formData.get("matKhau") as string,
    email: formData.get("email") as string,
    hoTen: (formData.get("hoTen") as string) || "",
    soDT: (formData.get("soDT") as string) || "",
    maNhom: "GP01",
    maLoaiNguoiDung: "HV",
  };

  let redirectPath = "/login?success=register";

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
      throw new Error(
        data.message || data.content || "Đăng ký thất bại"
      );
    }
  } catch (err: any) {
    redirectPath = `/register?error=${encodeURIComponent(
      err.message
    )}`;
  }

  redirect(redirectPath);
}

export async function logoutAction() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  redirect("/?success=logout");
}

// HÀM LẤY USER DUY NHẤT – KHÔNG ĐƯỢC TRÙNG Ở FILE NÀO KHÁC
export async function getCurrentUser() {
  "use server";
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) return null;

  try {
    const res = await fetch(
      `${API_BASE}/QuanLyNguoiDung/ThongTinNguoiDung`,
      {
        method: "POST",
        headers: {
          TokenCybersoft: TOKEN,
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) return null;
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
