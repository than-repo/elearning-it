// src/components/FeatureCourses/FeaturedCoursesSkeleton.tsx
import { CourseCardSkeleton } from "@/components/Course/CardSkeleton";

export function FeaturedCoursesSkeleton() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Tiêu đề + nút skeleton */}
        <div className="flex items-center justify-between mb-10">
          <div className="h-10 w-64 bg-muted rounded-lg animate-pulse" />
          <div className="h-11 w-40 bg-muted rounded-md animate-pulse" />
        </div>

        {/* Grid 4 card skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Render 4 skeleton cards */}
          {Array.from({ length: 4 }).map((_, i) => (
            <CourseCardSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
