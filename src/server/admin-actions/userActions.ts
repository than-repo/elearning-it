// src/server/admin-actions/userActions.ts
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import type {
  RawUserFromAPI,
  UserPaginationResponse,
  UserFormData,
} from "@/types/user";

//
// Helper: lấy headers chung (access_token + TokenCybersoft)
//
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

//
// 1. Lấy danh sách người dùng + phân trang + search
//
export async function getUsersPaginated({
  page = 1,
  pageSize = 10,
  tuKhoa = "",
}: {
  page?: number;
  pageSize?: number;
  tuKhoa?: string;
} = {}): Promise<UserPaginationResponse> {
  const { baseURL, headers } = await getAuthHeaders();

  let url = `${baseURL}/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang`;

  const params = new URLSearchParams({
    MaNhom: "GP01",
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  if (tuKhoa.trim()) {
    params.append("tuKhoa", tuKhoa.trim());
  }

  try {
    const res = await fetch(`${url}?${params.toString()}`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Lỗi API: ${res.status} - ${errorText}`);
    }

    const data = await res.json();

    // API trả về cấu trúc hơi khác một chút, chuẩn hóa lại
    return {
      currentPage: data.currentPage ?? page,
      count: data.count ?? 0,
      totalPages: data.totalPages ?? 0,
      totalCount: data.totalCount ?? 0,
      items: data.items ?? data, // đôi khi API trả mảng thẳng
    };
  } catch (error) {
    console.error("[getUsersPaginated] Error:", error);
    return {
      currentPage: page,
      count: 0,
      totalPages: 0,
      totalCount: 0,
      items: [],
    };
  }
}

//
// 2. Thêm người dùng mới
//
export async function createUser(
  formData: UserFormData
): Promise<boolean> {
  const { baseURL, headers } = await getAuthHeaders();

  const payload = {
    ...formData,
    maNhom: "GP01", // bắt buộc và luôn là GP01
  };

  try {
    const res = await fetch(
      `${baseURL}/QuanLyNguoiDung/ThemNguoiDung`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Thêm người dùng thất bại");
    }

    revalidatePath("/admin/users");
    return true;
  } catch (error: any) {
    console.error("[createUser] Error:", error);
    throw new Error(error.message || "Thêm người dùng thất bại");
  }
}

// 3. Cập nhật thông tin người dùng

export async function updateUser(
  formData: UserFormData
): Promise<boolean> {
  const { baseURL, headers } = await getAuthHeaders();

  const payload = {
    ...formData,
    maNhom: "GP01",
  };

  // Nếu không đổi mật khẩu thì có thể bỏ field matKhau
  if (!formData.matKhau?.trim()) {
    delete (payload as any).matKhau;
  }

  try {
    const res = await fetch(
      `${baseURL}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Cập nhật thất bại");
    }

    revalidatePath("/admin/users");
    return true;
  } catch (error: any) {
    console.error("[updateUser] Error:", error);
    throw new Error(error.message || "Cập nhật người dùng thất bại");
  }
}

// 4. Xóa người dùng

export async function deleteUser(taiKhoan: string): Promise<boolean> {
  const { baseURL, headers } = await getAuthHeaders();

  try {
    const res = await fetch(
      `${baseURL}/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${encodeURIComponent(
        taiKhoan
      )}`,
      {
        method: "DELETE",
        headers,
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Xóa thất bại");
    }

    revalidatePath("/admin/users");
    return true;
  } catch (error: any) {
    console.error("[deleteUser] Error:", error);
    throw new Error(error.message || "Xóa người dùng thất bại");
  }
}
