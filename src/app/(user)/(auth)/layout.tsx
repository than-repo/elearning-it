// src\app\(user)\(auth)\layout.tsx
export const dynamic = "force-dynamic";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-black">
      {children}
    </div>
  );
}
