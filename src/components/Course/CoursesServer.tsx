// src/components/Course/CoursesServer.tsx
import { Metadata } from "next";
import { getCourses } from "@/data/courses";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
  title: "Tất cả khóa học lập trình - Cybersoft Academy",
  description:
    "Hơn 1000+ khóa học Frontend, Backend, Fullstack, Mobile, Design từ cơ bản đến nâng cao.",
  openGraph: {
    title: "Khóa học lập trình tốt nhất 2025",
    description: "Học lập trình thực chiến cùng Cybersoft",
    images: "/og-courses.jpg",
  },
};

export default async function CoursesServer() {
  const courses = await getCourses(); // cache + transform + SEO ready

  return <CoursesClient courses={courses} />;
}
