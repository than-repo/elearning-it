// src/components/admin/courses/CourseDialog.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type {
  RawCategoryFromAPI,
  RawCourseFromAPI,
} from "@/types/course";
import {
  createCourseWithImage,
  updateCourse,
} from "@/server/admin-actions/courseActions";
import { getCurrentUser } from "@/server/actions/authActions";

// Định nghĩa form data trực tiếp – không cần Zod
type FormData = {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: string;
  danhGia: string;
  maNhom: string;
  maDanhMucKhoaHoc: string;
  hinhAnh?: File;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: RawCategoryFromAPI[];
  initialData?: RawCourseFromAPI | null;
  mode: "create" | "edit";
  onSuccess?: () => void;
};

export function CourseDialog({
  open,
  onOpenChange,
  categories,
  initialData,
  mode,
  onSuccess,
}: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: "0",
      danhGia: "0",
      maNhom: "GP01",
      maDanhMucKhoaHoc: "",
    },
  });

  // Reset form khi mở dialog
  useEffect(() => {
    if (!open) {
      setPreviewUrl(null);
      return;
    }

    const defaults = {
      maKhoaHoc: initialData?.maKhoaHoc ?? "",
      biDanh: initialData?.biDanh ?? "",
      tenKhoaHoc: initialData?.tenKhoaHoc ?? "",
      moTa: initialData?.moTa ?? "",
      luotXem: String(initialData?.luotXem ?? 0),
      danhGia: String(initialData?.danhGia ?? 0),
      maNhom: initialData?.maNhom ?? "GP01",
      maDanhMucKhoaHoc:
        initialData?.danhMucKhoaHoc?.maDanhMucKhoahoc ?? "",
    };

    reset(defaults);

    if (
      initialData?.hinhAnh &&
      typeof initialData.hinhAnh === "string"
    ) {
      setPreviewUrl(initialData.hinhAnh);
    } else {
      setPreviewUrl(null);
    }
  }, [initialData, open, reset]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error("Không tìm thấy người dùng");

      const today = new Date().toLocaleDateString("en-GB");

      if (mode === "create") {
        const formData = new FormData();
        formData.append("maKhoaHoc", data.maKhoaHoc);
        formData.append("biDanh", data.biDanh);
        formData.append("tenKhoaHoc", data.tenKhoaHoc);
        formData.append("moTa", data.moTa);
        formData.append("luotXem", data.luotXem);
        formData.append("danhGia", data.danhGia);
        formData.append("maNhom", data.maNhom);
        formData.append("ngayTao", today);
        formData.append("maDanhMucKhoaHoc", data.maDanhMucKhoaHoc);
        formData.append("taiKhoanNguoiTao", user.taiKhoan);

        if (data.hinhAnh) {
          formData.append("file", data.hinhAnh);
        }

        await createCourseWithImage(formData);
        toast.success("Tạo khóa học thành công!");
      } // Trong onSubmit, phần "edit"
      else {
        // Gửi đầy đủ + fallback an toàn
        await updateCourse({
          maKhoaHoc: data.maKhoaHoc,
          biDanh:
            data.biDanh ||
            data.maKhoaHoc.toLowerCase().replace(/\s+/g, "-"),
          tenKhoaHoc: data.tenKhoaHoc,
          moTa: data.moTa,
          luotXem: Number(data.luotXem) || 0,
          danhGia: Number(data.danhGia) || 0,
          hinhAnh:
            previewUrl || "https://picsum.photos/seed/course/300/200", // giữ ảnh cũ nếu không đổi
          maNhom: data.maNhom || "GP01",
          maDanhMucKhoaHoc: data.maDanhMucKhoaHoc,
          ngayTao: new Date().toLocaleDateString("en-GB"),
          taiKhoanNguoiTao: user.taiKhoan,
        });
        toast.success("Cập nhật thành công!");
      }

      onSuccess?.();
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err.message || "Có lỗi xảy ra");
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("hinhAnh", file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setPreviewUrl(null);
    setValue("hinhAnh", undefined);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Thêm khóa học mới"
              : "Chỉnh sửa khóa học"}
          </DialogTitle>
          <DialogDescription>
            Nhập đầy đủ thông tin khóa học
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cột trái */}
            <div className="space-y-4">
              <div>
                <Label>Mã khóa học *</Label>
                <Input
                  {...register("maKhoaHoc", { required: "Bắt buộc" })}
                  disabled={mode === "edit"}
                />
                {errors.maKhoaHoc && (
                  <p className="text-sm text-red-600">
                    {errors.maKhoaHoc.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Bí danh *</Label>
                <Input
                  {...register("biDanh", { required: "Bắt buộc" })}
                />
                {errors.biDanh && (
                  <p className="text-sm text-red-600">
                    {errors.biDanh.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Tên khóa học *</Label>
                <Input
                  {...register("tenKhoaHoc", {
                    required: "Bắt buộc",
                    minLength: {
                      value: 5,
                      message: "Tối thiểu 5 ký tự",
                    },
                  })}
                />
                {errors.tenKhoaHoc && (
                  <p className="text-sm text-red-600">
                    {errors.tenKhoaHoc.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Danh mục *</Label>
                <Select
                  value={watch("maDanhMucKhoaHoc")}
                  onValueChange={(v) =>
                    setValue("maDanhMucKhoaHoc", v)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem
                        key={c.maDanhMuc}
                        value={c.maDanhMuc}
                      >
                        {c.tenDanhMuc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Mã nhóm</Label>
                <Input {...register("maNhom")} placeholder="GP01" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Lượt xem</Label>
                  <Input
                    type="number"
                    {...register("luotXem")}
                    defaultValue="0"
                  />
                </div>
                <div>
                  <Label>Đánh giá</Label>
                  <Input
                    type="number"
                    step="0.1"
                    {...register("danhGia")}
                    defaultValue="0"
                  />
                </div>
              </div>
            </div>

            {/* Cột phải */}
            <div className="space-y-4">
              <div>
                <Label>Mô tả *</Label>
                <Textarea
                  rows={8}
                  {...register("moTa", {
                    required: "Bắt buộc",
                    minLength: {
                      value: 10,
                      message: "Tối thiểu 10 ký tự",
                    },
                  })}
                />
                {errors.moTa && (
                  <p className="text-sm text-red-600">
                    {errors.moTa.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Hình ảnh khóa học</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  {previewUrl ? (
                    <div className="relative inline-block">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-h-64 rounded-lg object-cover"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full border-red-600 text-red-600 hover:bg-red-50"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Click để upload
                      </p>
                      <Input
                        type="file"
                        accept="image/*"
                        className="mt-4"
                        onChange={handleFileChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Đang lưu..."
                : mode === "create"
                ? "Tạo"
                : "Cập nhật"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
