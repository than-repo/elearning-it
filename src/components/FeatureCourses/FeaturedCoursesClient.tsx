// src/components/FeatureCourses/FeaturedCoursesClient.tsx
"use client";

import CourseCard from "@/components/Course/Card";
import Link from "next/link";
import type { Course } from "@/types/course";

interface FeaturedCoursesClientProps {
  courses: Course[];
}

export function FeaturedCoursesClient({
  courses,
}: FeaturedCoursesClientProps) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Khóa học nổi bật
          </h2>

          {/* Cách đơn giản nhất – dùng Link bọc button style */}
          <Link
            href="/courses"
            className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-6 text-lg font-medium transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Xem tất cả→
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
