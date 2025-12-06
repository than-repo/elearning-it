// src/components/admin/courses/DataTable.tsx
"use client";
import { CourseDialog } from "./CourseDialog";
import { useEffect, useState, useTransition } from "react";
import {
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { RawCourseFromAPI, RawCategoryFromAPI } from "@/types/course";
import { deleteCourse } from "@/server/admin-actions/courseActions";
import { format } from "date-fns";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Plus,
  Search,
  Trash2,
  Edit,
  Eye,
} from "lucide-react";
import { useDebounce } from "@/lib/useDebounce";

type Props = {
  data: {
    items: RawCourseFromAPI[];
    currentPage: number;
    totalPages: number;
    totalCount: number;
  };
  categories: RawCategoryFromAPI[];
  currentPage: number;
  searchQuery: string;
  categoryFilter: string;
};

export function CoursesDataTable({
  data,
  categories,
  currentPage,
  searchQuery,
  categoryFilter,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(name, value);
    else params.delete(name);
    return params.toString();
  };

  const handleSearch = (value: string) => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString("search", value)}&page=1`
      );
    });
  };

  const handleCategoryChange = (value: string) => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString("category", value)}&page=1`
      );
    });
  };

  const handlePageChange = (page: number) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleDelete = async (
    maKhoaHoc: string,
    tenKhoaHoc: string
  ) => {
    if (
      !confirm(
        `Xóa khóa học "${tenKhoaHoc}"? Hành động này không thể hoàn tác!`
      )
    )
      return;

    const success = await deleteCourse(maKhoaHoc);
    if (success) {
      toast.success("Xóa khóa học thành công!");
    } else {
      toast.error("Xóa thất bại. Vui lòng thử lại.");
    }
  };

  if (data.items.length === 0 && !searchQuery && !categoryFilter) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Chưa có khóa học nào
        </p>
      </div>
    );
  }

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    if (debouncedSearch !== searchQuery) {
      startTransition(() => {
        router.push(
          `${pathname}?${createQueryString(
            "search",
            debouncedSearch
          )}&page=1`
        );
      });
    }
  }, [debouncedSearch]);
  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm khóa học..."
            className="pl-10"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            disabled={isPending}
          />
        </div>

        <Select
          value={categoryFilter || "all"}
          onValueChange={(value) =>
            handleCategoryChange(value === "all" ? "" : value)
          }
          disabled={isPending}
        >
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Tất cả danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả danh mục</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.maDanhMuc} value={cat.maDanhMuc}>
                {cat.tenDanhMuc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={() => {
            setEditingCourse(null);
            setDialogOpen(true);
          }}
          className="shrink-0"
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm khóa học
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">#</TableHead>
              <TableHead>Khóa học</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Người tạo</TableHead>
              <TableHead>Lượt xem</TableHead>
              <TableHead>Học viên</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-64" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-20 ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : data.items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-12 text-gray-500"
                >
                  Không tìm thấy khóa học nào
                </TableCell>
              </TableRow>
            ) : (
              data.items.map((course, index) => (
                <TableRow key={course.maKhoaHoc}>
                  <TableCell className="font-medium">
                    {(currentPage - 1) * 10 + index + 1}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium line-clamp-1">
                        {course.tenKhoaHoc}
                      </p>
                      <p className="text-sm text-gray-500">
                        ID: {course.maKhoaHoc}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {course.nguoiTao.hoTen || "Chưa có"}
                  </TableCell>
                  <TableCell>{course.luotXem ?? 0}</TableCell>
                  <TableCell>{course.soLuongHocVien}</TableCell>
                  <TableCell>
                    {format(
                      new Date(
                        course.ngayTao.split("/").reverse().join("-")
                      ),
                      "dd/MM/yyyy"
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        router.push(
                          `/admin/courses/${course.maKhoaHoc}`
                        )
                      }
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingCourse(course);
                        setDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() =>
                        handleDelete(
                          course.maKhoaHoc,
                          course.tenKhoaHoc
                        )
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {data.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Hiển thị {(currentPage - 1) * 10 + 1} -{" "}
            {Math.min(currentPage * 10, data.totalCount)} trong tổng
            số {data.totalCount} khóa học
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1 || isPending}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= data.totalPages || isPending}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Sau
            </Button>
          </div>
        </div>
      )}

      <CourseDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        categories={categories}
        initialData={editingCourse || undefined}
        mode={editingCourse ? "edit" : "create"}
        onSuccess={() => {
          // Revalidate data (sẽ làm ở bước sau)
          window.location.reload(); // tạm thời reload
        }}
      />
    </div>
  );
}
