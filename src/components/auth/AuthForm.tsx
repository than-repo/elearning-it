// src/components/auth/AuthForm.tsx
"use client";

import {
  loginAction,
  registerAction,
} from "@/server/actions/authActions";
import { SubmitButton } from "./SubmitButton";

/*  ĐĂNG NHẬP  */
export function LoginForm() {
  return (
    <form action={loginAction} className="space-y-5">
      <input
        name="taiKhoan"
        required
        placeholder="Tài khoản"
        className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-4 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:border-gray-700"
      />

      <input
        name="matKhau"
        type="password"
        required
        placeholder="Mật khẩu"
        className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-4 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:border-gray-700"
      />

      <SubmitButton label="Continue" />
    </form>
  );
}

/*  ĐĂNG KÝ  */
export function RegisterForm() {
  return (
    <form action={registerAction} className="space-y-5">
      <input
        name="taiKhoan"
        required
        placeholder="Tài khoản"
        className="w-full rounded-lg border border-gray-300 px-5 py-4 focus:ring-2 focus:ring-purple-600 dark:border-gray-700"
      />

      <input
        name="matKhau"
        type="password"
        required
        placeholder="Mật khẩu"
        className="w-full rounded-lg border border-gray-300 px-5 py-4 focus:ring-2 focus:ring-purple-600 dark:border-gray-700"
      />

      <input
        name="hoTen"
        placeholder="Họ và tên (không bắt buộc)"
        className="w-full rounded-lg border border-gray-300 px-5 py-4 dark:border-gray-700"
      />

      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className="w-full rounded-lg border border-gray-300 px-5 py-4 focus:ring-2 focus:ring-purple-600 dark:border-gray-700"
      />

      <input
        name="soDT"
        placeholder="Số điện thoại (không bắt buộc)"
        className="w-full rounded-lg border border-gray-300 px-5 py-4 dark:border-gray-700"
      />

      <input type="hidden" name="maNhom" value="GP01" />

      <SubmitButton label="Sign up for free" />
    </form>
  );
}
