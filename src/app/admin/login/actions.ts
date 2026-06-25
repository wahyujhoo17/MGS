"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { hashPassword, signSession } from "@/lib/auth";

export type LoginState = {
  error?: string;
  success?: boolean;
} | null;

export async function loginAction(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username dan password wajib diisi" };
  }

  let success = false;

  try {
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return { error: "Username atau password salah" };
    }

    const hashedPassword = await hashPassword(password);
    if (admin.password !== hashedPassword) {
      return { error: "Username atau password salah" };
    }

    const secret = process.env.JWT_SECRET || "super-secret-mgs-admin-token-key-2026-secure";
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
    redirect("/admin");
  }

  return null;
}
