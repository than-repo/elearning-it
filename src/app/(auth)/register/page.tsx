//src\app\(auth)\register\page.tsx
import { RegisterForm } from "@/components/auth/AuthForm";
import Link from "next/link";
import Image from "next/image";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const { error, success } = await searchParams;

  return (
    <div className="flex h-screen">
      {/* Trái – Illustration */}
      <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-purple-700 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-white px-16 text-center">
          <h1 className="text-6xl font-bold leading-tight mb-6">
            Start learning with
            <br />
            millions of students
            <br />
            worldwide
          </h1>
          <p className="text-2xl">
            Đăng ký miễn phí – học ngay hôm nay
          </p>
        </div>
      </div>

      {/* Phải – Form đăng ký */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center px-8 bg-white dark:bg-black">
        <div className="w-full max-w-md mx-auto space-y-8">
          <div className="flex justify-center -mt-12 lg:-mt-16">
            <Image
              src="/mylogo.svg"
              alt="Logo"
              width={160}
              height={64}
              className="object-contain"
            />
          </div>

          {/* Hiển thị lỗi */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-center text-sm font-medium">
              {decodeURIComponent(error)}
            </div>
          )}

          <RegisterForm />

          <div className="relative text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative inline-block px-4 bg-white dark:bg-black text-sm text-gray-500">
              or continue with
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {["google", "facebook", "apple"].map((provider) => (
              <button
                key={provider}
                className="flex items-center justify-center h-12 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <Image
                  src={`/${provider}.svg`}
                  alt={provider}
                  width={28}
                  height={28}
                />
              </button>
            ))}
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-purple-600 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
