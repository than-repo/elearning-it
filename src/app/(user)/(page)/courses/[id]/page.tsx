// src\app\(user)\(page)\courses\[id]\page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { getCourseById } from "@/data/courses";
import { Clock, Users, Eye, Calendar } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

// generateMetadata
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    return {
      title: "Khóa học không tồn tại | Cybersoft Academy",
    };
  }

  return {
    title: `${course.title} - Cybersoft Academy`,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      images: [course.thumbnail],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description: course.description,
      images: [course.thumbnail],
    },
  };
}

// Page component
export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params;
  const course = await getCourseById(id);

  // 404 nếu không tìm thấy
  if (!course) notFound();

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Nội dung chính */}
        <div className="lg:col-span-2">
          <div className="relative aspect-video rounded-xl overflow-hidden mb-8 shadow-lg">
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
          </div>

          <h1 className="text-4xl font-bold mb-6 text-gray-900">
            {course.title}
          </h1>

          <p className="text-lg text-gray-700 mb-10 leading-relaxed">
            {course.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-gray-50 p-5 rounded-xl border">
              <Eye className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-gray-800">
                {course.views.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Lượt xem</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border">
              <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-gray-800">
                {course.studentsCount}
              </p>
              <p className="text-sm text-gray-600">Học viên</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="text-lg font-bold text-gray-800">
                {course.createdAt}
              </p>
              <p className="text-sm text-gray-600">Ngày tạo</p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border">
              <Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="text-lg font-bold text-gray-800">
                Linh hoạt
              </p>
              <p className="text-sm text-gray-600">Thời lượng</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Giảng viên */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Giảng viên</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-md">
                {course.creator.fullName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-lg text-gray-900">
                  {course.creator.fullName}
                </p>
                <p className="text-sm text-gray-600">
                  {course.creator.roleName}
                </p>
              </div>
            </div>
          </div>

          {/* Thông tin khóa học */}
          <div className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4 text-blue-900">
              Thông tin khóa học
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">
                  Danh mục:
                </span>{" "}
                <span className="text-blue-700 font-medium">
                  {course.category.name}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Mã khóa học:
                </span>{" "}
                <code className="bg-white px-2 py-1 rounded text-blue-800 font-mono text-xs">
                  {course.id}
                </code>
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Nhóm:
                </span>{" "}
                <span className="text-gray-800">
                  {course.groupCode}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
