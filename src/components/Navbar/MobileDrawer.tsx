// src/components/Navbar/MobileDrawer.tsx
"use client";

import {
  Search,
  Globe,
  Menu,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Category } from "@/types/category";
import { logoutAction } from "@/server/actions/authActions";

// Type cho user (giống hệt ở NavbarClient)
type CurrentUser = {
  taiKhoan: string;
  hoTen: string;
  email?: string;
  soDT?: string;
  maLoaiNguoiDung: string;
} | null;

export default function MobileDrawer({
  categories,
  user,
}: {
  categories: Category[];
  user: CurrentUser;
}) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <div className="flex flex-col h-full">
      {/* Header cố định */}
      <div className="flex items-center justify-between px-6 py-5 border-b">
        <h2 className="text-xl font-bold">Menu</h2>
        <button className="p-2 -mr-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search for anything"
            className="w-full h-12 pl-12 pr-4 rounded-full border border-gray-300 bg-gray-50 text-sm"
          />
        </div>

        {/* Categories */}
        <div>
          <button
            onClick={() => setCategoriesOpen(!categoriesOpen)}
            className="w-full flex items-center justify-between py-4 text-lg font-semibold"
          >
            <span className="flex items-center gap-3">
              <Menu className="w-6 h-6" />
              Categories
            </span>
            <ChevronRight
              className={`w-5 h-5 transition-transform duration-200 ${
                categoriesOpen ? "rotate-90" : ""
              }`}
            />
          </button>

          {categoriesOpen && (
            <div className="mt-4 space-y-1 border-l-4 border-purple-600">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`/courses?danhMuc=${cat.id}`}
                  className="block py-3 pl-8 pr-4 text-gray-700 font-medium hover:text-purple-600 hover:bg-purple-50 rounded-r-lg transition-all duration-200"
                >
                  {cat.title}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Links */}
        <nav className="space-y-4 pt-4 border-t">
          <Link
            href="/business"
            className="block text-lg font-medium"
          >
            Udemy Business
          </Link>
          <Link href="/teach" className="block text-lg font-medium">
            Teach on Udemy
          </Link>
        </nav>

        {/* === PHẦN AUTH CHO MOBILE – ĐẸP NHƯ UDEMY === */}
        <div className="space-y-4 pt-4 border-t">
          {user ? (
            <>
              {/* Hiển thị tên user */}
              <div className="flex items-center gap-4 py-3">
                <div className="w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-lg">
                  {user.hoTen.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-lg">
                    {user.hoTen}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user.email || user.taiKhoan}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href="/my-learning"
                  className="flex items-center gap-4 py-3 text-lg"
                >
                  <User className="w-5 h-5" />
                  My learning
                </Link>

                <Link
                  href="/profile"
                  className="flex items-center gap-4 py-3 text-lg"
                >
                  <User className="w-5 h-5" />
                  Profile
                </Link>

                <form action={logoutAction} className="w-full">
                  <button
                    type="submit"
                    className="flex w-full items-center gap-4 py-3 text-lg text-red-600"
                  >
                    <LogOut className="w-5 h-5" />
                    Log out
                  </button>
                </form>
              </div>
            </>
          ) : (
            /* Chưa đăng nhập → hiện 2 nút */
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                className="px-6 py-3 text-center text-lg font-bold border border-black hover:bg-gray-100 rounded-lg"
              >
                Log in
              </Link>

              <Link
                href="/register"
                className="px-6 py-3 text-center text-lg font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-lg shadow-md"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Language */}
        <div className="pt-6 border-t">
          <button className="flex items-center gap-3 w-full py-4">
            <Globe className="w-6 h-6" />
            <span className="text-lg font-medium">English</span>
          </button>
        </div>
      </div>
    </div>
  );
}
