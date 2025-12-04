//src\components\FeatureCourses\FeaturedCoursesServer.tsx
import { FeaturedCoursesClient } from "./FeaturedCoursesClient";
import { getFeaturedCourses } from "@/data/courses";
import { FeaturedCoursesSkeleton } from "./FeaturedCoursesSkeleton";
import { Suspense } from "react";

export async function FeaturedCoursesServer() {
  // Nếu muốn loading đẹp thì dùng Suspense ở ngoài
  const courses = await getFeaturedCourses(4);

  return <FeaturedCoursesClient courses={courses} />;
}

// Nếu muốn fallback skeleton khi đang load
export function FeaturedCoursesWithSuspense() {
  return (
    <Suspense fallback={<FeaturedCoursesSkeleton />}>
      <FeaturedCoursesServer />
    </Suspense>
  );
}
