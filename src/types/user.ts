// src/types/user.ts
export type UserRole = "GV" | "HV"; // GV = Giáo viên (Quản trị), HV = Học viên

export interface RawUserFromAPI {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDt: string; // API trả về soDt (không phải soDT)
  maLoaiNguoiDung: UserRole;
}

export interface UserPaginationResponse {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: RawUserFromAPI[];
}

// Dữ liệu gửi lên API khi tạo/sửa user
export interface UserFormData {
  taiKhoan: string;
  matKhau: string; // bắt buộc khi tạo, tùy chọn khi sửa (nếu muốn đổi mật khẩu)
  hoTen: string;
  email: string;
  soDT: string; // API nhận soDT (D và T in hoa)
  maLoaiNguoiDung: UserRole;
  maNhom?: "GP01"; // luôn là GP01  để optional, code sẽ tự điền
}
