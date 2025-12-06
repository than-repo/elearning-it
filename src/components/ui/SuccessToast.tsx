// src/components/ui/SuccessToast.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function SuccessToast() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const success = searchParams.get("success");

    if (success === "register") {
      toast.success("Đăng ký thành công!", {
        description: "Bạn có thể đăng nhập ngay bây giờ",
        duration: 5000,
      });
    }

    if (success === "login") {
      toast.success("Đăng nhập thành công!", {
        description: "Chào mừng bạn trở lại",
        duration: 4000,
      });
    }

    // Xóa ?success=... khỏi URL cho đẹp
    if (success) {
      const timer = setTimeout(() => {
        router.replace(window.location.pathname, { scroll: false });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  return null;
}
