// src/components/Course/CoursesClient.tsx
"use client";

import React from "react";
import CourseCard from "./Card";
import type { Course } from "@/types/course";

export default function CoursesClient({
  courses,
}: {
  courses: Course[];
}) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-20 text-6xl">
        Không tìm thấy khóa học
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {courses.map((course) => (
        <div key={course.id} className="pointer-events-auto">
          <CourseCard course={course} />
        </div>
      ))}
    </div>
  );
}
