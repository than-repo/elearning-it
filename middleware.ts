// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/server/actions/authActions";

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const user = await getCurrentUser();
  if (!user || user.maLoaiNguoiDung !== "GV") {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = { matcher: "/admin/:path*" };
