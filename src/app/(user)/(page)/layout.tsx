// src/app/(user)/(page)/layout.tsx
export const dynamic = "force-dynamic";

export default function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
