// src/components/auth/SubmitButton.tsx
"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex items-center justify-center gap-3 rounded-lg bg-purple-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending && (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      )}
      {pending ? "Đang xử lý..." : label}
    </button>
  );
}
