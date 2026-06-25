import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let the login page load without redirection
  if (pathname === "/admin/login") {
    // If user has a valid session, we can redirect them to /admin from the login page component instead
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get("mgs_session")?.value;

  if (!sessionToken) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const secret = process.env.JWT_SECRET || "super-secret-mgs-admin-token-key-2026-secure";
  const session = await verifySession(sessionToken, secret);

  if (!session) {
    const response = NextResponse.redirect(new URL("/admin/login", request.url));
    response.cookies.delete("mgs_session");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
