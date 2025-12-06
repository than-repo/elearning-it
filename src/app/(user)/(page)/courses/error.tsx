// src\app\(user)\(page)\courses\error.tsx
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Courses page error:", error);
  }, [error]);

  return (
    <main className="container mx-auto px-4 py-20 text-center">
      <h2 className="text-3xl font-bold text-red-600 mb-4">
        Oops! Something went wrong
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        {error.message ||
          "We couldn't load the courses. Please try again."}
      </p>
      <button
        onClick={reset}
        className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Try Again
      </button>
    </main>
  );
}
