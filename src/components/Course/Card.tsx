// src/components/Course/Card.tsx
import React, { useState } from "react";
import Link from "next/link";
import { Course } from "@/types/course";
import Image from "next/image";
import { Calendar, Eye, Users } from "lucide-react";

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const [imgSrc, setImgSrc] = useState(course.thumbnail);
  const cardContent = (
    <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 min-h-[450px] h-full flex flex-col cursor-pointer">
      {/* Image: Fixed height */}
      <div className="relative aspect-video bg-gray-100 shrink-0">
        <Image
          src={imgSrc}
          alt={course.title}
          fill
          className="object-cover"
          unoptimized
          onError={() => setImgSrc("/img/fallback-course.png")} // Fallback khi lỗi
          onLoadingComplete={(result) => {
            if (result.naturalWidth === 0)
              setImgSrc("/img/fallback-course.png"); // Backup cho broken image
          }}
        />
      </div>
      {/* Content: Stretch full, justify-between để bottom align */}
      <div className="p-6 flex-1 flex flex-col justify-between min-h-0">
        {/* Text section: Clamp với ellipsis tự nhiên, height tự động để tránh đè */}
        <div className="flex-1 space-y-3">
          <div className="line-clamp-2 text-xl font-bold text-gray-900 leading-relaxed overflow-hidden">
            {" "}
            {/* Wrapper div cho title: clamp + hidden */}
            {course.title}
          </div>
          <div className="line-clamp-3 text-sm text-gray-600 leading-relaxed overflow-hidden">
            {" "}
            {/* Wrapper div cho description: clamp + hidden */}
            {course.description}
          </div>
        </div>
        {/* Stats: Đẩy xuống bottom */}
        <div className="mt-auto grid grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Eye className="w-4 h-4 text-blue-600" />
            <span>{course.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4 text-green-600" />
            <span>{course.studentsCount}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 text-purple-600" />
            <span className="text-xs">{course.createdAt}</span>
          </div>
        </div>
        {/* Giảng viên: Dưới stats */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0">
            {course.creator.fullName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {course.creator.fullName}
            </p>
            <p className="text-xs text-gray-500">
              {course.creator.roleName}
            </p>
          </div>
        </div>
        {/* Mã khóa học: Bottom-right */}
        <div className="mt-3 text-right">
          <code className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono">
            {course.id}
          </code>
        </div>
      </div>
    </article>
  );

  return (
    <Link href={`/courses/${course.id}`} passHref>
      {cardContent}
    </Link>
  );
};

export default CourseCard;
