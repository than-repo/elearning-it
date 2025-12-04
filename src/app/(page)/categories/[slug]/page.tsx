// src/app/(page)/categories/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { api } from "@/lib/api";

// BẮT BUỘC: thêm dòng này để Next.js chấp nhận dynamic route khi dev
export const dynamicParams = true;

// Tạo sẵn 6 trang (chỉ chạy lúc build, dev thì dynamicParams lo)
export async function generateStaticParams() {
  const cats = await api<any[]>("/QuanLyKhoaHoc/LayDanhMucKhoaHoc", {
    server: true,
  });

  return cats.map((c) => ({
    slug: c.tenDanhMuc
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "d")
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cats = await api<any[]>("/QuanLyKhoaHoc/LayDanhMucKhoaHoc", {
    server: true,
  });
  const cat = cats.find((c: any) => {
    const s = c.tenDanhMuc
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "d")
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    return s === slug;
  });
  return {
    title: cat ? `Khóa học ${cat.tenDanhMuc}` : "Không tìm thấy",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const cats = await api<any[]>("/QuanLyKhoaHoc/LayDanhMucKhoaHoc", {
    server: true,
  });
  const cat = cats.find((c: any) => {
    const s = c.tenDanhMuc
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "d")
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    return s === slug;
  });

  if (!cat) notFound();

  const courses = await api<any[]>(
    `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${cat.maDanhMuc}&MaNhom=GP01`,
    {
      server: true,
      next: { revalidate: 3600 },
    }
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">{cat.tenDanhMuc}</h1>
      {courses.length === 0 ? (
        <p>Chưa có khóa học</p>
      ) : (
        <ul className="space-y-4">
          {courses.map((c) => (
            <li key={c.maKhoaHoc} className="border p-4">
              {c.tenKhoaHoc}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
