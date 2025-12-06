//src\app\(user)\page.tsx
import CoursesServer from "@/components/Course/CoursesServer";
import { FeaturedCoursesServer } from "@/components/FeatureCourses/FeaturedCoursesServer";
import { FeaturedCoursesSkeleton } from "@/components/FeatureCourses/FeaturedCoursesSkeleton";
import Hero from "@/components/Hero/Hero";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Hero />

      {/* <CoursesServer /> */}
      <Suspense fallback={<FeaturedCoursesSkeleton />}>
        <FeaturedCoursesServer />
      </Suspense>
    </>
  );
}
