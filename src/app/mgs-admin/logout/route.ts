import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete("mgs_session");
  redirect("/admin/login");
}
