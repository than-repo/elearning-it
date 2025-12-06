// src/app/(admin)/admin/courses/page.tsx
export const dynamic = "force-dynamic";
import {
  getCoursesPaginated,
  getCategories,
} from "@/server/admin-actions/courseActions";
import { CoursesDataTable } from "@/components/admin/courses/DataTable";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SearchParams = Promise<{
  page?: string;
  search?: string;
  category?: string;
}>;

export default async function AdminCoursesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page, search, category } = await searchParams;

  const currentPage = Number(page) || 1;
  const searchQuery = search || "";
  const categoryFilter = category || "";

  // Song song fetch data
  const [coursesData, categories] = await Promise.all([
    getCoursesPaginated({
      page: currentPage,
      pageSize: 10,
      tenKhoaHoc: searchQuery,
      maDanhMuc: categoryFilter,
    }),
    getCategories(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Quản lý Khóa học
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Xem, thêm, sửa, xóa các khóa học trong hệ thống
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách khóa học</CardTitle>
        </CardHeader>
        <CardContent>
          <CoursesDataTable
            data={coursesData}
            categories={categories}
            currentPage={currentPage}
            searchQuery={searchQuery}
            categoryFilter={categoryFilter}
          />
        </CardContent>
      </Card>
    </div>
  );
}
