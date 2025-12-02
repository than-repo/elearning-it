// src/app/(page)/courses/[slug]/loading.tsx
export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-gray-300 aspect-video rounded-xl animate-pulse" />
          <div className="h-12 bg-gray-300 rounded-lg w-3/4 animate-pulse" />
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-5/6 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-4/5 animate-pulse" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-gray-200 border rounded-xl p-6 h-48 animate-pulse" />
          <div className="bg-gray-200 border rounded-xl p-6 h-64 animate-pulse" />
        </div>
      </div>
    </main>
  );
}
