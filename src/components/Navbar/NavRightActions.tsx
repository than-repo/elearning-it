// src/components/Navbar/NavRightActions.tsx
"use client";

import Link from "next/link";
import {
  Globe,
  ShoppingCart,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import { logoutAction } from "@/server/actions/authActions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type User = {
  taiKhoan: string;
  hoTen: string;
  email?: string;
  soDT?: string;
  maLoaiNguoiDung: string;
} | null;

export default function NavRightActions({ user }: { user: User }) {
  if (!user) {
    return (
      <div className="hidden lg:flex items-center gap-3">
        <Link href="/login">
          <button className="px-4 py-2 text-sm font-bold border border-black hover:bg-gray-100 rounded-lg transition">
            Log in
          </button>
        </Link>
        <Link href="/register">
          <button className="px-4 py-2 text-sm font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-lg shadow-md transition">
            Sign up
          </button>
        </Link>
        <button className="p-2 border border-black rounded-lg hover:bg-gray-100 transition">
          <Globe className="h-5 w-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center gap-4">
      <Link
        href="/business"
        className="text-sm font-medium hover:text-purple-700"
      >
        Udemy Business
      </Link>
      <Link
        href="/teach"
        className="text-sm font-medium hover:text-purple-700"
      >
        Teach on Udemy
      </Link>

      <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
        <ShoppingCart className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-700 text-xs text-white font-bold">
          3
        </span>
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-3 py-2 transition">
          <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-sm">
            {user.hoTen.charAt(0).toUpperCase()}
          </div>
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <p className="font-semibold">{user.hoTen}</p>
              <p className="text-xs text-gray-500">
                {user.email || user.taiKhoan}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href="/my-learning"
              className="flex items-center gap-3"
            >
              <User className="h-4 w-4" /> My learning
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center gap-3">
              <User className="h-4 w-4" /> Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-3 text-red-600"
              >
                <LogOut className="h-4 w-4" /> Log out
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <button className="p-2 border border-black rounded-lg hover:bg-gray-100 transition">
        <Globe className="h-5 w-5" />
      </button>
    </div>
  );
}
