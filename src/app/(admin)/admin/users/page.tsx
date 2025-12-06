// src/app/(admin)/admin/users/page.tsx
"use client";

import { useEffect, useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import UsersDataTable from "@/components/admin/users/UsersDataTable";
import { getUsersPaginated } from "@/server/admin-actions/userActions";

export default function UsersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const page = Number(searchParams.get("page")) || 1;
  const tuKhoa = searchParams.get("tuKhoa") || "";

  const [data, setData] = useState<any>({
    items: [],
    totalCount: 0,
    currentPage: 1,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    startTransition(async () => {
      const result = await getUsersPaginated({
        page,
        pageSize: 10,
        tuKhoa,
      });
      setData({
        items: result.items,
        totalCount: result.totalCount,
        currentPage: result.currentPage,
      });
      setLoading(false);
    });
  }, [page, tuKhoa]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const handleSearch = (keyword: string) => {
    const params = new URLSearchParams();
    params.set("page", "1");
    if (keyword.trim()) params.set("tuKhoa", keyword.trim());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Quản lý người dùng</h1>

      {loading ? (
        <div className="space-y-6">
          <div className="h-10 bg-muted rounded w-full max-w-md animate-pulse" />
          <div className="rounded-md border">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex gap-4 p-6 border-b last:border-b-0"
              >
                <div className="h-6 bg-muted rounded flex-1 animate-pulse" />
                <div className="h-6 bg-muted rounded flex-1 animate-pulse" />
                <div className="h-6 bg-muted rounded w-32 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <UsersDataTable
          data={data.items}
          totalCount={data.totalCount}
          currentPage={data.currentPage}
          onPageChange={handlePageChange}
          onSearch={handleSearch}
        />
      )}
    </div>
  );
}
