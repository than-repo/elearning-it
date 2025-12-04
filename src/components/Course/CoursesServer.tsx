// src/components/Course/CoursesServer.tsx

import { getCourses } from "@/data/courses";
import { getCategories } from "@/data/categories";
import CoursesClient from "./CoursesClient";
import { Category } from "@/types/category";

interface Props {
  initialCategorySlug?: string; // mới thêm – dùng cho trang SEO
}
export default async function CoursesServer({
  initialCategorySlug,
}: Props = {}) {
  const [courses, categories] = await Promise.all([
    getCourses(),
    getCategories(),
  ]);

  // Đây là dòng duy nhất cần sửa – tìm category có slug khớp → lấy id → so sánh với course.category.id
  const filteredCourses = initialCategorySlug
    ? courses.filter((course) => {
        const matched = categories.find(
          (cat) => cat.slug === initialCategorySlug
        );
        return matched?.id === course.category.id;
      })
    : courses;

  return (
    <CoursesClient
      serializedCourses={JSON.stringify(courses)}
      serializedCategories={JSON.stringify(categories)}
      defaultCategorySlug={initialCategorySlug}
    />
  );
}
