// src/components/Course/Card.tsx
import React from "react";
import CourseHoverPreview from "./CourseHoverPreview";
import { Course } from "@/types/course";
import Image from "next/image";
import { Calendar, Eye, Users } from "lucide-react";

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const cardContent = (
    <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col cursor-pointer">
      {/* Nội dung card như cũ – nhưng KHÔNG có Link */}
      <div className="relative aspect-video bg-gray-100">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
          {course.title}
        </h3>
        <p className="mt-3 text-sm text-gray-600 line-clamp-3 flex-1">
          {course.description}
        </p>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-5 text-sm">
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

        {/* Giảng viên */}
        <div className="mt-5 pt-5 border-t border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
            {course.creator.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {course.creator.fullName}
            </p>
            <p className="text-xs text-gray-500">
              {course.creator.roleName}
            </p>
          </div>
        </div>

        {/* Mã khóa học (nhỏ nhỏ ở góc) */}
        <div className="mt-3 text-right">
          <code className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono">
            {course.id}
          </code>
        </div>
      </div>
    </article>
  );

  return (
    <CourseHoverPreview course={course}>
      {cardContent}
    </CourseHoverPreview>
  );
};

export default CourseCard;
