import { LoginForm } from "@/components/auth/AuthForm";
import Link from "next/link";
import Image from "next/image";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>; // ← Promise ở đây
}) {
  const { error } = await searchParams; // ← BẮT BUỘC await

  return (
    <div className="min-h-screen flex">
      {/* Left side – Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col justify-center items-center text-white px-12 text-center">
          <h1 className="text-5xl font-bold leading-tight">
            Log in to continue your
            <br />
            learning journey
          </h1>
          <p className="mt-4 text-xl opacity-90">
            Hàng ngàn khóa học chất lượng đang chờ bạn
          </p>
          <div className="mt-16 w-96 h-96 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
            <span className="text-4xl font-light">Illustration</span>
          </div>
        </div>
      </div>

      {/* Right side – Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white dark:bg-black px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Image
              src="/mylogo.svg"
              alt="Logo"
              width={120}
              height={40}
              className="mx-auto"
            />
          </div>

          {/* Hiển thị lỗi */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-center text-sm font-medium">
              {decodeURIComponent(error)}
            </div>
          )}

          <LoginForm />

          <div className="my-8 text-center text-sm text-gray-500">
            Other log in options
          </div>

          <div className="grid grid-cols-3 gap-4">
            {["google", "facebook", "apple"].map((p) => (
              <button
                key={p}
                className="flex items-center justify-center h-12 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <Image
                  src={`/${p}.svg`}
                  alt={p}
                  width={24}
                  height={24}
                />
              </button>
            ))}
          </div>

          <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-purple-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>

          <p className="text-center text-xs text-gray-500 mt-6">
            By signing in, you agree to our{" "}
            <a href="#" className="underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
