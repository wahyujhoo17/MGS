export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://mgs.my.id").replace(/\/$/, "");

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
};

/** HTML → teks polos. Tag blok diganti spasi agar judul & paragraf tidak menempel. */
export function toPlainText(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<\/(p|h[1-6]|li|ul|ol|blockquote|div|tr)>|<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&(amp|lt|gt|quot|#39|apos|nbsp);/g, (m) => ENTITIES[m] ?? m)
    .replace(/\s+/g, " ")
    .trim();
}

/** Potong di batas kata (bukan di tengah kata) dan beri elipsis bila terpotong. */
export function truncateAtWord(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  const base = (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:–—-]+$/, "");
  return `${base}…`;
}

/**
 * Deskripsi artikel: pakai metaDescription bila diisi; kalau tidak, ambil paragraf
 * pertama yang cukup panjang (mengabaikan "Baca juga" dan daftar sumber).
 */
export function articleDescription(
  article: { content: string; metaDescription?: string | null },
  max = 155
): string {
  const custom = article.metaDescription?.trim();
  if (custom) return truncateAtWord(custom, max);

  const cleaned = article.content
    .replace(/<blockquote[\s\S]*?<\/blockquote>/gi, " ")
    .replace(/<h2[^>]*>\s*Sumber Referensi\s*<\/h2>[\s\S]*$/i, " ");

  const paragraphs = Array.from(cleaned.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi))
    .map((m) => toPlainText(m[1]))
    .filter((t) => t.length >= 60);

  const source = paragraphs[0] ?? toPlainText(cleaned);
  return truncateAtWord(source, max);
}

export function absoluteUrl(pathOrUrl: string | null | undefined, fallback = "/img/MGS.png"): string {
  const v = pathOrUrl || fallback;
  if (v.startsWith("http")) return v;
  return `${SITE_URL}${v.startsWith("/") ? "" : "/"}${v}`;
}
