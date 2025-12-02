// components/Course/CourseListSkeleton.tsx
export default function CourseListSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="border rounded-lg overflow-hidden animate-pulse"
        >
          <div className="bg-gray-300 aspect-video" />
          <div className="p-4 space-y-3">
            <div className="h-6 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="flex gap-2 mt-4">
              <div className="h-6 bg-blue-200 rounded-full w-20" />
              <div className="h-6 bg-green-200 rounded-full w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
