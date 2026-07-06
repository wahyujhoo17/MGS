import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import sharp from "sharp";

const s3Client = new S3Client({
  region: process.env.S3_REGION,
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_KEY || "",
  },
  forcePathStyle: true,
});

export async function POST(req: Request) {
  try {
    const { base64 } = await req.json();
    if (!base64) {
      return NextResponse.json({ error: "Base64 image data is required" }, { status: 400 });
    }

    // Parse base64 string
    const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return NextResponse.json({ error: "Invalid base64 string format" }, { status: 400 });
    }

    const buffer = Buffer.from(matches[2], "base64");

    // Compress using sharp (webp, 80% quality, max width 1000px)
    const compressedBuffer = await sharp(buffer)
      .resize({ width: 1000, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    const fileName = `variants/${crypto.randomUUID()}.webp`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: fileName,
        Body: compressedBuffer,
        ContentType: "image/webp",
      })
    );

    const imageUrl = `${process.env.S3_PUBLIC_URL}/${fileName}`;
    return NextResponse.json({ imageUrl });
  } catch (error: any) {
    console.error("Upload handler error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
