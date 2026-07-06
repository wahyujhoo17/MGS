"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { comparePassword, signSession, getJwtSecret } from "@/lib/auth";

export type LoginState = {
  error?: string;
  success?: boolean;
} | null;

// Simple in-memory rate limiter
interface RateLimitEntry {
  attempts: number;
  blockedUntil: number;
}
const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up expired entries every 30 minutes to prevent memory leak
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.blockedUntil < now && value.attempts === 0) {
        rateLimitMap.delete(key);
      }
    }
  }, 1000 * 60 * 30);
}

export async function loginAction(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username dan password wajib diisi" };
  }

  // Get Client IP for Rate Limiting
  let clientIp = "127.0.0.1";
  try {
    const headersList = await headers();
    clientIp = headersList.get("x-forwarded-for")?.split(",")[0] || headersList.get("x-real-ip") || "127.0.0.1";
  } catch (e) {
    console.error("Failed to read headers for rate limiting:", e);
  }

  const now = Date.now();
  const limit = rateLimitMap.get(clientIp);

  if (limit && limit.blockedUntil > now) {
    const remainingTime = Math.ceil((limit.blockedUntil - now) / (1000 * 60));
    return { error: `Terlalu banyak percobaan. Akses Anda diblokir sementara. Silakan coba lagi dalam ${remainingTime} menit.` };
  }

  let success = false;

  try {
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      // Record failed attempt
      recordFailedAttempt(clientIp);
      return { error: "Username atau password salah" };
    }

    const isPasswordCorrect = await comparePassword(password, admin.password);
    if (!isPasswordCorrect) {
      // Record failed attempt
      recordFailedAttempt(clientIp);
      return { error: "Username atau password salah" };
    }

    // Reset rate limiter on successful login
    rateLimitMap.delete(clientIp);

    const secret = getJwtSecret();
    const token = await signSession(
      { id: admin.id, username: admin.username },
      secret
    );

    const cookieStore = await cookies();
    cookieStore.set("mgs_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    success = true;
  } catch (error) {
    console.error("Login action error:", error);
    return { error: "Terjadi kesalahan pada server. Silakan coba lagi." };
  }

  if (success) {
    redirect("/mgs-admin");
  }

  return null;
}

function recordFailedAttempt(ip: string) {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  const maxAttempts = 5;
  const blockDuration = 1000 * 60 * 15; // 15 minutes block

  if (!limit) {
    rateLimitMap.set(ip, { attempts: 1, blockedUntil: 0 });
  } else {
    limit.attempts += 1;
    if (limit.attempts >= maxAttempts) {
      limit.blockedUntil = now + blockDuration;
      limit.attempts = 0; // reset attempts after blocking
    }
  }
}
