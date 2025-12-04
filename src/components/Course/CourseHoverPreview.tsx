// src/components/Course/CourseHoverPreview.tsx
"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Course } from "@/types/course";
import {
  Eye,
  Users,
  ArrowRight,
  Star,
  Clock,
  PlayCircle,
} from "lucide-react";

export default function CourseHoverPreview({
  course,
  children,
}: {
  course: Course;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<"left" | "right">("right");

  const cardRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const show = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const spaceRight = window.innerWidth - rect.right;

      // Nếu bên phải không đủ ~400px → hiện bên trái
      setPosition(spaceRight < 400 ? "left" : "right");
      setIsOpen(true);
    }, 180); // delay nhẹ, mượt như Shopee
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsOpen(false);
  };

  return (
    <div
      ref={cardRef}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <Link href={`/courses/${course.id}`} className="block">
        {children}
      </Link>

      {/* POPUP + CẦU NỐI VÔ HÌNH – FIX 100% LỖI RÊ CHẬM */}
      {isOpen && (
        <>
          {/* Cầu nối vô hình – cho phép rê chuột chậm vẫn sống */}
          <div
            className="absolute inset-y-0 w-20 z-40"
            style={{
              [position === "right" ? "left" : "right"]: "100%",
              marginLeft: position === "right" ? "16px" : undefined,
              marginRight: position === "left" ? "16px" : undefined,
            }}
            onMouseEnter={() =>
              timerRef.current && clearTimeout(timerRef.current)
            }
          />

          {/* Popup chính */}
          <div
            className={`
            absolute z-50 w-[420px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden
            top-1/2 -translate-y-1/2
            ${
              position === "right"
                ? "left-full ml-6"
                : "right-full mr-6"
            }
            animate-in fade-in zoom-in-95 duration-300
          `}
            onMouseEnter={() =>
              timerRef.current && clearTimeout(timerRef.current)
            }
            onMouseLeave={hide}
          >
            {/* Thumbnail */}
            <div className="relative h-56">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle className="w-20 h-20 text-white opacity-90 drop-shadow-2xl" />
              </div>
              <div className="absolute bottom-4 left-5">
                <span className="px-4 py-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full text-sm shadow-lg">
                  {course.category.name}
                </span>
              </div>
            </div>

            {/* Nội dung */}
            <div className="p-7">
              <h2 className="text-2xl font-black text-gray-900 leading-tight">
                {course.title}
              </h2>

              <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-bold">4.9</span> (1.2k đánh
                  giá)
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />~{"24"} giờ
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-gray-500">Lượt xem</p>
                    <p className="font-bold text-gray-900">
                      {course.views.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-gray-500">Học viên</p>
                    <p className="font-bold text-gray-900">
                      {course.studentsCount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-gray-700 leading-relaxed line-clamp-5">
                {course.description ||
                  "Khóa học thực chiến giúp bạn làm chủ công nghệ hiện đại nhất 2025 với dự án thực tế từ doanh nghiệp."}
              </p>

              {/* Giảng viên */}
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100">
                <div className="w-14 h-14 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-black text-xl shadow-xl">
                  {course.creator.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    {course.creator.fullName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {course.creator.roleName}
                  </p>
                </div>
              </div>

              {/* Nút */}
              <div className="mt-7">
                <Link
                  href={`/courses/${course.id}`}
                  className="flex w-full items-center justify-center gap-2 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-xl text-lg"
                >
                  Xem chi tiết ngay
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </div>

              <div className="mt-4 text-right">
                <code className="text-xs bg-gray-100 text-gray-600 px-4 py-2 rounded-full font-mono">
                  Mã khóa học: {course.id}
                </code>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
