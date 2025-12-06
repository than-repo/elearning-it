// src/app/my-learning/page.tsx
import { getCurrentUser } from "@/server/auth/get-user";
import { redirect } from "next/navigation";

export default async function MyLearningPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Khóa học của tôi</h1>
      <p className="text-gray-600">
        Sắp có danh sách khóa học bạn đã đăng ký...
      </p>
    </div>
  );
}
