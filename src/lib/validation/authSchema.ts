// src/lib/validation/authSchema.ts
import { z } from "zod";

export const loginSchema = z.object({
  taiKhoan: z.string().min(3, "Tài khoản ít nhất 3 ký tự"),
  matKhau: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
});

export const registerSchema = z.object({
  taiKhoan: z.string().min(3, "Tài khoản ít nhất 3 ký tự"),
  matKhau: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
  hoTen: z
    .string()
    .min(2, "Vui lòng nhập họ tên")
    .optional()
    .or(z.literal("")),
  email: z.string().email("Email không hợp lệ"),
  soDT: z
    .string()
    .regex(/^0\d{9,10}$/, "Số điện thoại không đúng định dạng")
    .optional()
    .or(z.literal("")),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
