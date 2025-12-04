// src/app/(seo)/categories/[slug]/page.tsx

import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCategories } from "@/data/categories";
import CoursesServer from "@/components/Course/CoursesServer";

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  const cats = await getCategories();
  return cats.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>; // ← Promise!
}): Promise<Metadata> {
  const { slug } = await params; // ← PHẢI AWAIT
  const cats = await getCategories();
  const cat = cats.find((c) => c.slug === slug);

  if (!cat) return { title: "Không tìm thấy danh mục" };

  return {
    title: `Khóa học ${cat.title} tốt nhất 2025 - Cybersoft Academy`,
    description: `Top khóa học ${cat.title} thực chiến, dự án thật, có việc làm sau khóa học`,
    openGraph: {
      title: `Khóa học ${cat.title} chất lượng cao`,
      description: `Học ${cat.title} từ A-Z • Cam kết việc làm • Hơn 50.000 học viên`,
      images: ["/og-course.jpg"],
    },
  };
}

// SỬA CHÍNH TẠI ĐÂY
export default async function CategorySeoPage({
  params,
}: {
  params: Promise<{ slug: string }>; // ← Promise!
}) {
  const { slug } = await params; // ← BẮT BUỘC AWAIT

  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) notFound();

  return <CoursesServer initialCategorySlug={slug} />;
}
