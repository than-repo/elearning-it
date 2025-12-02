// src/components/Course/Card.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Course } from "@/types/course";
import { Eye, Users, Calendar } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="group block h-full transform transition-all duration-300 hover:-translate-y-2"
    >
      <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-indigo-100">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
            onError={(e) => {
              e.currentTarget.src = "/img/fallback-course.png";
            }}
          />
          {/* Overlay + Badge */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-md">
              {course.category.name}
            </span>
          </div>
        </div>

        {/* Nội dung */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>

          <p className="mt-3 text-sm text-gray-600 line-clamp-3 flex-1">
            {course.description ||
              "Khóa học chất lượng cao từ Cybersoft Academy"}
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
    </Link>
  );
};

export default CourseCard;
