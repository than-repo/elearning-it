// src/components/Course/CoursesServer.tsx

import { getCourses } from "@/data/courses";
import { getCategories } from "@/data/categories";
import CoursesClient from "./CoursesClient";

export default async function CoursesServer() {
  // Fetch song song + cache tự động nhờ React cache()
  const [courses, categories] = await Promise.all([
    getCourses(),
    getCategories(),
  ]);

  return (
    <CoursesClient
      serializedCourses={JSON.stringify(courses)}
      serializedCategories={JSON.stringify(categories)}
    />
  );
}
