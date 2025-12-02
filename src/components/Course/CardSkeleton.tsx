// src/components/Course/CardSkeleton.tsx
export const CourseCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 animate-pulse">
    <div className="aspect-video bg-gray-200" />
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-32" />
          <div className="h-3 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </div>
  </div>
);
