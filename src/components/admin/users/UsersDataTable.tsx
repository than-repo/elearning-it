// src/components/admin/users/UsersDataTable.tsx
"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Loader2,
  MoreHorizontal,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

import UserDialog from "./UserDialog";
import type { RawUserFromAPI } from "@/types/user";
import { deleteUser } from "@/server/admin-actions/userActions";

interface UsersDataTableProps {
  data: RawUserFromAPI[];
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onSearch: (keyword: string) => void;
}

export default function UsersDataTable({
  data,
  totalCount,
  currentPage,
  onPageChange,
  onSearch,
}: UsersDataTableProps) {
  const [isPending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] =
    useState<RawUserFromAPI | null>(null);
  const [searchInput, setSearchInput] = useState("");

  const handleEdit = (user: RawUserFromAPI) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleDelete = (taiKhoan: string) => {
    if (!confirm("Xóa người dùng này?")) return;

    startTransition(async () => {
      try {
        await deleteUser(taiKhoan);
        toast.success("Xóa thành công!");
      } catch (error: any) {
        toast.error(error.message || "Xóa thất bại");
      }
    });
  };

  const columns: ColumnDef<RawUserFromAPI>[] = [
    {
      accessorKey: "taiKhoan",
      header: "Tài khoản",
    },
    {
      accessorKey: "hoTen",
      header: "Họ tên",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "soDt",
      header: "Số điện thoại",
      cell: ({ row }) => row.original.soDt || "-",
    },
    {
      accessorKey: "maLoaiNguoiDung",
      header: "Loại",
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.maLoaiNguoiDung === "GV"
              ? "default"
              : "secondary"
          }
        >
          {row.original.maLoaiNguoiDung === "GV"
            ? "Quản trị"
            : "Học viên"}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => handleEdit(row.original)}
            >
              <Pencil className="mr-2 h-4 w-4" /> Sửa
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(row.original.taiKhoan)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalCount / 10),
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: 10,
      },
    },
    onPaginationChange: (updater) => {
      const newPageIndex =
        typeof updater === "function"
          ? updater({ pageIndex: currentPage - 1, pageSize: 10 })
              .pageIndex
          : updater.pageIndex;
      onPageChange(newPageIndex + 1);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2 max-w-md">
            <Input
              placeholder="Tìm tài khoản, tên, email..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && onSearch(searchInput)
              }
            />
            <Button onClick={() => onSearch(searchInput)}>Tìm</Button>
          </div>
          <Button
            onClick={() => {
              setSelectedUser(null);
              setDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm người dùng
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-10"
                  >
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.original.taiKhoan}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Hiển thị {(currentPage - 1) * 10 + 1} -{" "}
            {Math.min(currentPage * 10, totalCount)} trong{" "}
            {totalCount}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Sau
            </Button>
          </div>
        </div>
      </div>

      <UserDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        user={selectedUser}
        onSuccess={() => setDialogOpen(false)}
      />
    </>
  );
}
