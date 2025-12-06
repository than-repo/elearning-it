//src\app\(user)\profile\ProfileForm.tsx
"use client";

import { updateProfile } from "@/server/actions/updateProfileAction";
import { useState } from "react";
import { Camera, Mail, Phone } from "lucide-react";

export default function ProfileForm({ user }: { user: any }) {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar giống Udemy */}
      <aside className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-purple-700 flex items-center justify-center text-white text-3xl font-bold">
                {user.hoTen?.charAt(0).toUpperCase() ||
                  user.taiKhoan?.charAt(0) ||
                  "?"}
              </div>
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border">
                <Camera className="w-4 h-4 text-gray-600" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {user.hoTen || user.taiKhoan}
              </h2>
            </div>
          </div>
        </div>
      </aside>

      {/* Form */}
      <main className="lg:col-span-3">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h3 className="text-2xl font-bold mb-8">Public profile</h3>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg text-center font-medium ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          <form
            action={async (formData) => {
              setMessage(null);
              const result = await updateProfile(formData);
              setMessage({
                type: result.success ? "success" : "error",
                text: result.message,
              });
            }}
            className="space-y-8"
          >
            {/* Ẩn tài khoản và mật khẩu hiện tại */}
            <input
              type="hidden"
              name="taiKhoan"
              value={user.taiKhoan}
            />
            <input
              type="hidden"
              name="currentPassword"
              value={user.matKhau || ""}
            />

            <div>
              <label className="block text-sm font-medium mb-2">
                Full name *
              </label>
              <input
                name="hoTen"
                defaultValue={user.hoTen}
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  defaultValue={user.email}
                  required
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Phone number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="soDT"
                  defaultValue={user.soDT || ""}
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                New password
              </label>
              <input
                name="matKhau"
                type="password"
                placeholder="Để trống nếu không muốn đổi mật khẩu"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-xs text-gray-500 mt-2">
                Chỉ nhập khi bạn muốn thay đổi mật khẩu
              </p>
            </div>

            <button
              type="submit"
              className="px-8 py-3 bg-purple-700 text-white font-bold rounded-lg hover:bg-purple-800 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
