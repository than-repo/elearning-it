import Hero from "@/components/Hero/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Phần còn lại của trang bạn sẽ thêm sau */}
      <div className="h-[400vh]" /> {/* để test scroll */}
    </>
  );
}
