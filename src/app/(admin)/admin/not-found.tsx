//src\app\(admin)\admin\not-found.tsx
import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">
        404
      </h1>

      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        Không tìm thấy trang quản trị bạn đang truy cập.
      </p>

      <Link
        href="/admin"
        className="mt-6 inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
      >
        Quay lại Dashboard
      </Link>
    </div>
  );
}
