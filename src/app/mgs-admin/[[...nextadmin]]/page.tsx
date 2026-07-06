import { NextAdmin } from "@premieroctet/next-admin/adapters/next";
import { getNextAdminProps } from "@premieroctet/next-admin/appRouter";
import prisma from "@/lib/prisma";
import { options } from "@/lib/next-admin";

export const dynamic = "force-dynamic";

type PromisePageProps = {
  params: Promise<{ nextadmin: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AdminPage(props: PromisePageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const adminProps = await getNextAdminProps({
    params: params.nextadmin,
    searchParams,
    basePath: "/admin",
    apiBasePath: "/api/admin",
    prisma,
    options,
  });

  return <NextAdmin {...adminProps} />;
}
