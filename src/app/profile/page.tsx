// src/app/profile/page.tsx
import { getCurrentUser } from "@/server/actions/authActions";
import ProfileForm from "./ProfileForm";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-10">Edit Profile</h1>
        <ProfileForm user={user} />
      </div>
    </div>
  );
}
