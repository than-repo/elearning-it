// src/components/admin/users/UserDialog.tsx
"use client";

import { useState, useEffect, useTransition } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

import type { RawUserFromAPI } from "@/types/user";
import {
  createUser,
  updateUser,
} from "@/server/admin-actions/userActions";

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: RawUserFromAPI | null;
  onSuccess?: () => void;
}

export default function UserDialog({
  open,
  onOpenChange,
  user,
  onSuccess,
}: UserDialogProps) {
  const [isPending, startTransition] = useTransition();
  const isEdit = !!user;

  const [formData, setFormData] = useState({
    taiKhoan: user?.taiKhoan || "",
    matKhau: "",
    hoTen: user?.hoTen || "",
    email: user?.email || "",
    soDT: user?.soDt || "",
    maLoaiNguoiDung: user?.maLoaiNguoiDung || "HV",
  });

  // Reset form khi mở dialog
  useEffect(() => {
    if (open) {
      if (user) {
        setFormData({
          taiKhoan: user.taiKhoan,
          matKhau: "",
          hoTen: user.hoTen,
          email: user.email,
          soDT: user.soDt || "",
          maLoaiNguoiDung: user.maLoaiNguoiDung,
        });
      } else {
        setFormData({
          taiKhoan: "",
          matKhau: "",
          hoTen: "",
          email: "",
          soDT: "",
          maLoaiNguoiDung: "HV",
        });
      }
    }
  }, [open, user]);

  const handleSubmit = () => {
    if (!formData.taiKhoan.trim())
      return toast.error("Vui lòng nhập tài khoản");
    if (!isEdit && !formData.matKhau)
      return toast.error("Vui lòng nhập mật khẩu");
    if (!formData.hoTen.trim())
      return toast.error("Vui lòng nhập họ tên");
    if (!formData.email.trim())
      return toast.error("Vui lòng nhập email");

    startTransition(async () => {
      try {
        if (isEdit) {
          await updateUser({
            ...formData,
            matKhau: formData.matKhau || undefined,
          } as any);
          toast.success("Cập nhật thành công!");
        } else {
          await createUser(formData as any);
          toast.success("Thêm người dùng thành công!");
        }
        onSuccess?.();
        onOpenChange(false);
      } catch (error: any) {
        toast.error(error.message || "Có lỗi xảy ra");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Sửa người dùng" : "Thêm người dùng mới"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Chỉnh sửa thông tin người dùng. Để trống mật khẩu nếu không muốn đổi."
              : "Tạo tài khoản mới. Mật khẩu bắt buộc."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Tài khoản</Label>
            <Input
              value={formData.taiKhoan}
              onChange={(e) =>
                setFormData({ ...formData, taiKhoan: e.target.value })
              }
              disabled={isEdit}
              placeholder="Nhập tài khoản"
            />
          </div>

          <div className="space-y-2">
            <Label>
              Mật khẩu{" "}
              {!isEdit && <span className="text-red-500">*</span>}
              {isEdit && " (để trống nếu không đổi)"}
            </Label>
            <Input
              type="password"
              value={formData.matKhau}
              onChange={(e) =>
                setFormData({ ...formData, matKhau: e.target.value })
              }
              placeholder={isEdit ? "••••••••" : "Nhập mật khẩu"}
            />
          </div>

          <div className="space-y-2">
            <Label>Họ tên</Label>
            <Input
              value={formData.hoTen}
              onChange={(e) =>
                setFormData({ ...formData, hoTen: e.target.value })
              }
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="user@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label>Số điện thoại</Label>
            <Input
              value={formData.soDT}
              onChange={(e) =>
                setFormData({ ...formData, soDT: e.target.value })
              }
              placeholder="0901234567"
            />
          </div>

          <div className="space-y-2">
            <Label>Loại người dùng</Label>
            <Select
              value={formData.maLoaiNguoiDung}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  maLoaiNguoiDung: value as "GV" | "HV",
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HV">Học viên (HV)</SelectItem>
                <SelectItem value="GV">
                  Giáo viên / Admin (GV)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isEdit ? "Cập nhật" : "Thêm mới"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
