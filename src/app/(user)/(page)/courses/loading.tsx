//src\app\(user)\(page)\courses\loading.tsx
import CourseListSkeleton from "@/components/Course/CourseListSkeleton";

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-12 min-h-screen">
      <div className="text-center mb-12">
        <div className="h-12 bg-gray-300 rounded-lg w-96 mx-auto mb-4 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
      </div>
      <CourseListSkeleton count={9} />
    </main>
  );
}
