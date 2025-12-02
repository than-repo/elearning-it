import CoursesServer from "@/components/Course/CoursesServer";
import Hero from "@/components/Hero/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Phần còn lại của trang bạn sẽ thêm sau */}

      <CoursesServer />
    </>
  );
}
