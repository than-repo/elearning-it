// src/app/(admin)/admin/courses/[id]/page.tsx
import { getCourseDetail } from "@/server/admin-actions/courseActions";
import { RawCourseFromAPI } from "@/types/course";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Eye, Users, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course: RawCourseFromAPI | null = await getCourseDetail(id);

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Header + Back button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/courses">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Chi tiết khóa học
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Mã khóa học:{" "}
              <code className="font-mono">{course.maKhoaHoc}</code>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Image + Info */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gray-100">
                <Image
                  src={course.hinhAnh || "/fallback-course.png"}
                  alt={course.tenKhoaHoc}
                  fill
                  className="object-cover rounded-t-lg"
                  unoptimized
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Lượt xem</span>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">
                    {course.luotXem ?? 0}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Học viên</span>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-600" />
                  <span className="font-medium">
                    {course.soLuongHocVien}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Ngày tạo</span>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-purple-600" />
                  <span className="font-medium">
                    {format(
                      new Date(
                        course.ngayTao.split("/").reverse().join("-")
                      ),
                      "dd/MM/yyyy"
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {course.tenKhoaHoc}
                  </h2>
                  <Badge variant="secondary" className="mt-2">
                    {course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Mô tả khóa học
                </h3>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {course.moTa || "Chưa có mô tả"}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Người tạo
                </h3>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                    {course.nguoiTao.hoTen?.[0] || "A"}
                  </div>
                  <div>
                    <p className="font-medium">
                      {course.nguoiTao.hoTen || "Chưa xác định"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {course.nguoiTao.taiKhoan || "—"} •{" "}
                      {(course.nguoiTao as any).tenLoaiNguoiDung ??
                        "Giáo vụ"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Thông tin kỹ thuật
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">
                      Bí danh (slug):
                    </span>
                    <code className="block mt-1 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {course.biDanh}
                    </code>
                  </div>
                  <div>
                    <span className="text-gray-600">Mã nhóm:</span>
                    <Badge variant="outline" className="ml-2">
                      {course.maNhom}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
