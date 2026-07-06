import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession, getJwtSecret } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("mgs_session")?.value;

  if (sessionToken) {
    const secret = getJwtSecret();
    const session = await verifySession(sessionToken, secret);
    if (session) {
      redirect("/mgs-admin");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-offwhite px-4">
      <LoginForm />
    </div>
  );
}
