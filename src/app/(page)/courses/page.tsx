// src/app/(page)/courses/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import CoursesClient from "@/components/Course/CoursesClient";
import CourseListSkeleton from "@/components/Course/CourseListSkeleton";
import { getCourses } from "@/data/courses";
import { getCategories } from "@/data/categories"; // MỚI: Import
import type { Category } from "@/types/category"; // MỚI: Import type

export const metadata: Metadata = {
  title: "Tất cả khóa học - Cybersoft Academy 2025",
  description:
    "Khám phá hàng trăm khóa học lập trình: Frontend, Backend, Fullstack, Mobile, Design và hơn thế nữa.",
  openGraph: {
    title: "Khóa học lập trình tốt nhất 2025",
    description:
      "Học kỹ năng thực tế từ dự án thực tế cùng chuyên gia hàng đầu",
    images: "/og-courses.jpg",
  },
};

export default function CoursesPage() {
  return (
    <main className="container mx-auto px-4 py-12 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Tất cả khóa học
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Nâng tầm kỹ năng với các khóa học thực chiến từ chuyên gia
          hàng đầu
        </p>
      </div>

      <Suspense fallback={<CourseListSkeleton count={12} />}>
        <CoursesContent />
      </Suspense>
    </main>
  );
}

async function CoursesContent() {
  const courses = await getCourses();
  const categories = await getCategories(); // MỚI: Fetch categories (cache tự động)
  return <CoursesClient courses={courses} categories={categories} />; // MỚI: Pass categories
}
