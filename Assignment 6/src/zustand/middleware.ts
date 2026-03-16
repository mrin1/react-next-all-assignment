import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  console.log("path", pathname);
  console.log("token from midleware", token);
  console.log("role from midleware", role);

  const isLoginPage = pathname === "/login";
  const isAdminPage = pathname.startsWith("/admin");

  if (isLoginPage) {
    if (token) {
    //   if (role === "admin") {
        return NextResponse.redirect(new URL("/admin/products", request.url));
    //   }
    //   return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (isAdminPage) {
      if (!token) {
          return NextResponse.redirect(new URL("/login", request.url))
      }
      return NextResponse.next()
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/admin/:path*"],
};
