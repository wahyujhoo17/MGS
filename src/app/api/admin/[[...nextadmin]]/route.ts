import { createHandler } from "@premieroctet/next-admin/appHandler";
import prisma from "@/lib/prisma";
import { options } from "@/lib/next-admin";

const { run } = createHandler({
  apiBasePath: "/api/admin",
  prisma,
  options,
});

const handler = async (req: Request, ctx: { params: Promise<{ nextadmin?: string[] }> }) => {
  return run(req, ctx as any);
};

export { handler as GET, handler as POST, handler as DELETE };
