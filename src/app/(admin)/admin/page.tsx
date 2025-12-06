// src/app/(admin)/admin/page.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, BookOpen, UserCheck, TrendingUp } from "lucide-react";
import { getDashboardStats } from "@/server/admin-actions/dashboardActions";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Tổng quan Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Chào mừng Giáo vụ quay lại hệ thống quản trị
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden">
          <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-800">
                <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-lg">Khóa học</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-3xl font-bold">
              {stats.totalCourses}
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Tổng số khóa học
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="bg-green-50 dark:bg-green-900/20">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2 dark:bg-green-800">
                <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-lg">Người dùng</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-3xl font-bold">
              {stats.totalUsers}
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Tổng số học viên & giáo vụ
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-800">
                <UserCheck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-lg">Ghi danh</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-3xl font-bold">
              {stats.totalEnrollments}
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Tổng số lượt ghi danh
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="bg-orange-50 dark:bg-orange-900/20">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-800">
                <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle className="text-lg">Tăng trưởng</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-3xl font-bold">
              +{stats.growthPercentage}%
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Học viên mới tháng này
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
