import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }

    const variants = await prisma.productVariant.findMany({
      where: { productId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(variants);
  } catch (error: any) {
    console.error("Error fetching variants:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
