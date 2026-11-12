import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession, getJwtSecret } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let the login page load without redirection
  if (pathname === "/mgs-admin/login") {
    return NextResponse.next();
  }

  // API admin: balas 401 (bukan redirect) bila belum login
  const isApi = pathname.startsWith("/api/mgs-admin");
  const deny = (clearCookie = false) => {
    const response = isApi
      ? NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      : NextResponse.redirect(new URL("/mgs-admin/login", request.url));
    if (clearCookie) response.cookies.delete("mgs_session");
    return response;
  };

  const sessionToken = request.cookies.get("mgs_session")?.value;

  if (!sessionToken) {
    return deny();
  }

  // getJwtSecret throws error if JWT_SECRET is not set which is checked dynamically
  const secret = getJwtSecret();
  const session = await verifySession(sessionToken, secret);

  if (!session) {
    return deny(true);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mgs-admin/:path*", "/api/mgs-admin/:path*"],
};
