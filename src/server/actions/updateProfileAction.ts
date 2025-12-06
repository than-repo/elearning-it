// src/server/actions/updateProfileAction.ts
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_BASE = "https://elearningnew.cybersoft.edu.vn/api";
const TOKEN = process.env.NEXT_PUBLIC_CYBERSOFT_TOKEN!;

export async function updateProfile(formData: FormData) {
  "use server";

  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return { success: false, message: "Chưa đăng nhập" };
  }

  const currentPassword = formData.get("currentPassword") as string; // mật khẩu hiện tại từ hidden field
  const newPassword = (formData.get("matKhau") as string)?.trim();

  const payload: any = {
    taiKhoan: formData.get("taiKhoan") as string,
    hoTen: (formData.get("hoTen") as string)?.trim() || "",
    email: formData.get("email") as string,
    soDT: (formData.get("soDT") as string)?.trim() || "",
    maNhom: "GP01",
    maLoaiNguoiDung: "HV",
    // QUAN TRỌNG: Luôn gửi matKhau để backend không set thành null // Do BE nó thế
    matKhau:
      newPassword && newPassword !== ""
        ? newPassword
        : currentPassword,
  };

  try {
    const res = await fetch(
      `${API_BASE}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          TokenCybersoft: TOKEN,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      let errorMsg = "Cập nhật thất bại";

      try {
        const json = JSON.parse(text);
        errorMsg = json.message || json[0]?.message || text;
      } catch {
        errorMsg = text || "Lỗi server";
      }

      return { success: false, message: errorMsg };
    }

    // Thành công
    revalidatePath("/profile");
    return { success: true, message: "Cập nhật hồ sơ thành công!" };
  } catch (error) {
    console.error("Update profile error:", error);
    return { success: false, message: "Lỗi kết nối đến server" };
  }
}
