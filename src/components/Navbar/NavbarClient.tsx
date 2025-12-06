// src/components/Navbar/NavbarClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import DesktopCategories from "./DesktopCategories";
import MobileDrawer from "./MobileDrawer";
import SearchBar from "./SearchBar";
import NavRightActions from "./NavRightActions";
import { Category } from "@/types/category";

type CurrentUser = {
  taiKhoan: string;
  hoTen: string;
  email?: string;
  soDT?: string;
  maLoaiNguoiDung: string;
} | null;

export default function NavbarClient({
  categories,
  user,
}: {
  categories: Category[];
  user: CurrentUser;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            <Link href="/" className="flex items-center">
              <img
                src="/mylogo.svg"
                alt="GPT Learning"
                className="h-8 w-auto lg:h-9"
              />
            </Link>

            <DesktopCategories categories={categories} />
          </div>

          <SearchBar />

          <div className="flex items-center gap-2 md:hidden">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Truyền user xuống */}
          <NavRightActions user={user} />

          <div className="flex items-center gap-2 lg:hidden">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-700 text-xs text-white font-bold">
                3
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer – cũng truyền user */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white">
          <MobileDrawer categories={categories} user={user} />
        </div>
      )}
    </header>
  );
}
