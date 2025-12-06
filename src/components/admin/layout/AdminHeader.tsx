// src/components/admin/layout/AdminHeader.tsx
"use client";

import { Bell, LogOut, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

// Import Server Action
import { logoutAction } from "@/server/actions/authActions";

export function AdminHeader() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b bg-white dark:bg-gray-800">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Notification */}
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
          </Button>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Avatar dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 rounded-full"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold">
                  GV
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Tài khoản Giáo vụ</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* ĐĂNG XUẤT – DÙNG FORM ACTION NHƯ USER */}
              <DropdownMenuItem asChild>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="flex w-full items-center gap-3 text-red-600 hover:text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    Đăng xuất
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
