//src\app\(admin)\admin\error.tsx
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin page error:", error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="flex flex-col items-center text-center max-w-md">
        <AlertTriangle className="h-14 w-14 text-red-500 mb-4" />

        <h2 className="text-2xl font-semibold mb-2">
          Đã có lỗi xảy ra trong trang Admin
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Vui lòng thử lại hoặc load lại trang. Nếu lỗi còn tiếp diễn,
          hãy báo cho quản trị viên.
        </p>

        <div className="flex gap-3">
          <Button onClick={() => reset()} className="px-6">
            Thử lại
          </Button>

          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="px-6"
          >
            Tải lại trang
          </Button>
        </div>
      </div>
    </div>
  );
}
