import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("mgs_session")?.value;

  if (sessionToken) {
    const secret = process.env.JWT_SECRET || "super-secret-mgs-admin-token-key-2026-secure";
    const session = await verifySession(sessionToken, secret);
    if (session) {
      redirect("/admin");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-offwhite px-4">
      <LoginForm />
    </div>
  );
}
