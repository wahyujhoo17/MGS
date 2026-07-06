import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession, getJwtSecret } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let the login page load without redirection
  if (pathname === "/mgs-admin/login") {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get("mgs_session")?.value;

  if (!sessionToken) {
    const loginUrl = new URL("/mgs-admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // getJwtSecret throws error if JWT_SECRET is not set which is checked dynamically
  const secret = getJwtSecret();
  const session = await verifySession(sessionToken, secret);

  if (!session) {
    const response = NextResponse.redirect(new URL("/mgs-admin/login", request.url));
    response.cookies.delete("mgs_session");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mgs-admin/:path*"],
};
