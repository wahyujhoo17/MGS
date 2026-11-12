import { NextResponse } from "next/server";
import OpenAI from "openai";
import prisma from "@/lib/prisma";

const openai = new OpenAI({
  apiKey: process.env.CUSTOM_AI_API_KEY || "YOUR_API_KEY",
  baseURL: "https://omnirouter.lumicloud.my.id/v1",
  defaultHeaders: {
    "HTTP-Referer": "https://mgs.web.id", // Often required by OpenRouter-style proxies
    "X-Title": "MGS Admin AI", 
    // Menyembunyikan default Node user-agent yang sering di-block WAF/Cloudflare
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  },
});

const SYSTEM_PROMPT = `
Anda adalah penulis/editor profesional di MGS Jaya Abadi (Pusat Grosir Camilan di Jawa Timur) yang memahami dunia UMKM, pedagang pasar, distributor, dan konsumen camilan. Tulislah seperti manusia sungguhan yang punya sudut pandang, BUKAN seperti robot yang menulis esai akademis dan BUKAN seperti konten motivasi bisnis.

LANGKAH PERTAMA — TENTUKAN SUDUT PANDANG (ANGLE) SESUAI KONTEKS TOPIK:
Baca topik/instruksi dengan teliti, tentukan apa yang sebenarnya diminta/relevan, lalu pilih SATU angle yang paling cocok. Isi artikel dan JUDUL harus mencerminkan angle itu:
- ANALISIS DAMPAK: apa yang terjadi, siapa yang terdampak (UMKM, pedagang pasar, produsen, distributor, konsumen), seberapa besar, dan kenapa. Sertakan angka/pernyataan dari sumber.
- PENJELASAN (EXPLAINER): kenapa hal ini terjadi, rantai sebab-akibatnya, latar belakang yang perlu diketahui pembaca.
- BERITA/UPDATE: kabar terbaru, kronologi singkat, apa artinya bagi pelaku usaha camilan.
- DATA & TREN: tren pasar, angka, perbandingan, arah ke depan.
- OPINI/SUDUT PANDANG: pendapat beralasan dengan argumen dan data pendukung.
- CERITA/STUDI KASUS: pengalaman nyata atau contoh kasus yang spesifik.
- PANDUAN PRAKTIS: langkah/tips — HANYA jika topik atau instruksi memang meminta cara, tips, atau solusi.
ATURAN ANGLE:
a. JANGAN otomatis mengubah semua topik menjadi tips/solusi/siasat "tetap untung". Contoh: topik "harga tepung naik" → angle yang tepat adalah dampaknya ke UMKM, penyebab kenaikan, atau data harganya; bukan otomatis "cara bertahan". Bagian solusi/saran boleh ada, tetapi maksimal satu bagian kecil di dalam artikel dan hanya jika relevan.
b. Bahas dari beberapa pihak yang terkait, bukan hanya dari sisi penjual.
c. JUDUL: spesifik dan informatif sesuai angle. DILARANG pola judul formulaik seperti "Tips...", "Siasat...", "Cara...", "...Tetap Cuan", "Rahasia...", kecuali angle-nya memang PANDUAN PRAKTIS.
d. Hindari nada motivasi/jualan yang dipaksakan. Promosi MGS hanya disebut jika benar-benar relevan dan tidak lebih dari sekali, singkat.

ATURAN ANTI-DETEKTOR AI (WAJIB DIPATUHI AGAR SKOR AI DI BAWAH 50%):
1. BURSTINESS (Varian Kalimat): Anda WAJIB menggunakan campuran kalimat yang sangat pendek (bahkan hanya 2-4 kata) dengan kalimat panjang yang mengalir. Jangan gunakan ritme yang konstan.
2. HINDARI KATA KLISE AI: DILARANG KERAS menggunakan kata-kata seperti: "Di era digital ini", "Tidak dapat dipungkiri", "Kesimpulannya", "Penting untuk diingat", "Sebagai kesimpulan", "Mari kita bahas", "Signifikan", "Krusial", "Berinovasi", "Menyelami", "Lanskap", "Membuka potensi", "Esensial", "Harta karun", "Permadani".
3. KETIDAKSEMPURNAAN NATURAL & BAHASA LISAN: Selipkan bahasa sehari-hari atau idiom lokal sesekali (misal: "ya", "sih", "kok", "kan", "bikin pusing", "nggak masuk akal", "jujur saja"). Jangan gunakan bahasa Indonesia yang 100% kaku seperti buku cetak.
4. DETAIL SPESIFIK: Manusia mengingat detail, AI merangkum. Jangan gunakan frasa umum seperti "mengalami banyak tantangan". Gunakan cerita spesifik seperti "susahnya mencari tepung tapioka murah di pasar minggu lalu".
5. TANPA KESIMPULAN KAKU: Akhiri tulisan dengan opini santai, pertanyaan retoris, atau sekadar harapan ke depan. JANGAN pernah membuat paragraf rangkuman "Secara keseluruhan..." atau "Sebagai penutup...".
6. KERAPIAN FORMAT & INTERNAL LINK: Walaupun gaya bahasa Anda santai, susunan HTML artikel harus SANGAT RAPI dan MUDAH DIBACA (banyak Heading <h2> <h3>, Bullet Points <ul>, dan pisahkan paragraf agar tidak terlalu panjang). JIKA saya memberikan "REFERENSI INTERNAL LINK", Anda WAJIB menyelipkan 1 atau 2 link tersebut secara natural di tengah-tengah artikel menggunakan kode HTML ini: <blockquote class="border-l-4 border-indigo-600 pl-4 py-2 my-6 bg-indigo-50 rounded-r-lg"><strong>Baca juga: <a href="URL_ARTIKEL" class="text-indigo-700 hover:underline">JUDUL_ARTIKEL</a></strong></blockquote>
7. Sapaan ke pembaca ("Sobat pebisnis", "Teman-teman UMKM") boleh dipakai paling banyak sekali, dan hanya jika cocok dengan angle.

KEMAMPUAN BROWSING (RAG) & SUMBER EKSTERNAL (WAJIB UNTUK SEO/KREDIBILITAS):
Jika diberikan "SUMBER WEB" bernomor, Anda WAJIB:
1. Memakai minimal 3 data konkret (angka, persentase, tren, nama lembaga, tahun) dari sumber tersebut, dan meleburkannya ke dalam cerita secara natural.
2. Setiap kali memakai data/fakta dari sebuah sumber, tautkan kata kuncinya ke sumber itu di tempat, contoh: <a href="URL_SUMBER" target="_blank" rel="noopener noreferrer">menurut data BPS</a>. Gunakan HANYA URL persis dari daftar sumber. DILARANG mengarang URL atau mengutip angka yang tidak ada di sumber.
3. Gunakan minimal 2 sumber berbeda (jika tersedia). Jangan menempelkan semua tautan di satu paragraf.
4. JANGAN membuat bagian daftar "Sumber/Referensi" sendiri; sistem akan menambahkannya otomatis.
5. Jika sumber tidak relevan dengan topik, abaikan saja dan jangan memaksakan.

ATURAN FORMAT OUTPUT (WAJIB DIIKUTI):
1. OUTPUT HARUS BERUPA FORMAT JSON MURNI (TANPA TEKS PENGANTAR APAPUN, TANPA MARKDOWN BLOK).
2. Struktur JSON wajib memiliki 4 key ini:
   - "title": Judul menarik, spesifik, dan sesuai angle (Maksimal 60 karakter).
   - "slug": URL slug dari judul tersebut.
   - "description": Meta description untuk Google, 130-155 karakter, satu kalimat padat yang memuat kata kunci utama dan manfaat/inti artikel. Bukan salinan kalimat pertama artikel, tanpa tanda kutip, tanpa HTML.
   - "content": Isi artikel full HTML (Maksimal 600 - 800 kata).
3. ATURAN HTML CONTENT KETAT:
   - HANYA GUNAKAN tag HTML standar: <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <a>, <code>, <blockquote>.
   - DILARANG KERAS membuat tag HTML fiktif atau <script>.
`;

interface WebSource {
  title: string;
  url: string;
  snippet: string;
  domain: string;
}

// Domain yang tidak layak dijadikan sumber kutipan
const BLOCKED_DOMAINS = [
  "mgs.my.id", "mgs.web.id", "pinterest.", "facebook.com", "instagram.com",
  "tiktok.com", "youtube.com", "twitter.com", "x.com", "shopee.", "tokopedia.", "lazada.",
];

async function searxSearch(query: string, timeRange?: string): Promise<any[]> {
  try {
    const base = (process.env.SEARXNG_URL || "https://searxng.obs.web.id").replace(/\/$/, "");
    const url = new URL(`${base}/search`);
    url.searchParams.append("q", query);
    url.searchParams.append("format", "json");
    url.searchParams.append("language", "id");
    if (timeRange) url.searchParams.append("time_range", timeRange);

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      console.warn("SearxNG request failed:", res.status, res.statusText);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data.results) ? data.results : [];
  } catch (error) {
    console.error("Error fetching from SearxNG:", error);
    return [];
  }
}

// Ambil sumber web aktual (RAG): filter, dedupe per domain, maksimal 8
async function fetchWebSources(query: string): Promise<WebSource[]> {
  let results = await searxSearch(query, "year");
  if (results.length < 4) {
    results = results.concat(await searxSearch(query));
  }

  const seenDomains = new Set<string>();
  const sources: WebSource[] = [];
  for (const r of results) {
    if (!r?.url || !r?.title || !r?.content) continue;
    let domain = "";
    try {
      const u = new URL(r.url);
      if (u.protocol !== "https:" && u.protocol !== "http:") continue;
      domain = u.hostname.replace(/^www\./, "");
    } catch {
      continue;
    }
    if (BLOCKED_DOMAINS.some((d) => domain.includes(d))) continue;
    if (seenDomains.has(domain)) continue;
    seenDomains.add(domain);
    sources.push({
      title: String(r.title).trim(),
      url: r.url,
      snippet: String(r.content).replace(/\s+/g, " ").trim().substring(0, 400),
      domain,
    });
    if (sources.length >= 8) break;
  }
  return sources;
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/**
 * Validasi tautan eksternal: link yang bukan dari daftar sumber (halusinasi AI) dibuang
 * (teks tetap dipertahankan), link valid diberi target/rel yang aman.
 * Lalu tambahkan bagian "Sumber Referensi" dari sumber yang benar-benar dikutip.
 */
function finalizeSources(html: string, sources: WebSource[]): { html: string; used: WebSource[] } {
  const allowed = new Map(sources.map((s) => [s.url.replace(/\/$/, ""), s]));
  const used = new Map<string, WebSource>();

  let out = html.replace(/<a\s+([^>]*?)href=["']([^"']+)["']([^>]*)>([\s\S]*?)<\/a>/gi, (full, _pre, href, _post, inner) => {
    // Link internal & anchor dibiarkan
    if (href.startsWith("/") || href.startsWith("#")) return full;
    const src = allowed.get(href.replace(/\/$/, ""));
    if (!src) return inner; // URL tidak ada di sumber → buang link, simpan teks
    used.set(src.url, src);
    return `<a href="${escapeHtml(src.url)}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
  });

  const usedList = Array.from(used.values());
  if (usedList.length > 0) {
    const items = usedList
      .map(
        (s) =>
          `<li><a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.title)}</a> — ${escapeHtml(s.domain)}</li>`
      )
      .join("");
    out += `<h2>Sumber Referensi</h2><ul>${items}</ul>`;
  }
  return { html: out, used: usedList };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, angle } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt diperlukan" }, { status: 400 });
    }

    let searchContext = "";
    const webSources = await fetchWebSources(prompt);
    if (webSources.length > 0) {
      const list = webSources
        .map((s, i) => `[${i + 1}] ${s.title}\n    URL: ${s.url}\n    Isi: ${s.snippet}`)
        .join("\n");
      searchContext = `\n\nSUMBER WEB (hasil browsing terkini). Gunakan angka/fakta dari sini dan tautkan ke URL-nya sesuai aturan:\n${list}`;
    }

    let internalLinkContext = "";
    try {
      const existingArticles = await prisma.article.findMany({
        where: { published: true },
        select: { title: true, slug: true },
        take: 3,
        orderBy: { createdAt: "desc" }
      });
      if (existingArticles.length > 0) {
        internalLinkContext = "\n\nREFERENSI INTERNAL LINK (Sisipkan 1 atau 2 link ini di tengah artikel dengan format blockquote sesuai aturan):\n";
        existingArticles.forEach(a => {
          internalLinkContext += `- Judul: ${a.title} | URL: /artikel/${a.slug}\n`;
        });
      }
    } catch (e) {
      console.error("Gagal mengambil artikel untuk internal link", e);
    }

    const ANGLES: Record<string, string> = {
      dampak: "ANALISIS DAMPAK",
      penjelasan: "PENJELASAN (EXPLAINER)",
      berita: "BERITA/UPDATE",
      data: "DATA & TREN",
      opini: "OPINI/SUDUT PANDANG",
      cerita: "CERITA/STUDI KASUS",
      panduan: "PANDUAN PRAKTIS",
    };
    const angleContext =
      typeof angle === "string" && ANGLES[angle]
        ? `\n\nANGLE YANG DIMINTA ADMIN (WAJIB DIPAKAI): ${ANGLES[angle]}`
        : "\n\nANGLE: tentukan sendiri yang paling sesuai dengan konteks topik (bukan otomatis tips/solusi).";

    const userMessage = `Topik/Instruksi Artikel: ${prompt}${angleContext}${searchContext}${internalLinkContext}`;
    const model = process.env.CUSTOM_AI_MODEL || "gpt-4o-mini";

    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      response_format: { type: "json_object" },
      temperature: 0.85, // Diturunkan sedikit agar Deepseek tidak berhalusinasi JSON-nya
      max_tokens: 4000,
      presence_penalty: 0.3,
      frequency_penalty: 0.3,
    });

    let content = response.choices[0]?.message?.content || "";
    let cleanedContent = content.trim();
    // Bersihkan markdown backticks jika AI mengembalikannya
    if (cleanedContent.startsWith("```json")) {
      cleanedContent = cleanedContent.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (cleanedContent.startsWith("```")) {
      cleanedContent = cleanedContent.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    // Ekstrak HANYA kurung kurawal terluar (mengabaikan teks basa-basi AI)
    const jsonMatch = cleanedContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanedContent = jsonMatch[0];
    }

    let parsed;
    try {
      parsed = JSON.parse(cleanedContent);
    } catch (e) {
      console.error("Gagal parsing JSON dari AI. Raw content:", content);
      throw new Error("Format respon AI tidak valid. Coba lagi.");
    }
    
    // Membersihkan tag <script> jika AI secara tidak sengaja mengeluarkannya di content
    if (parsed.content) {
      let cleanedHTML = parsed.content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
      cleanedHTML = cleanedHTML.replace(/>\s+</g, "><");
      cleanedHTML = cleanedHTML.replace(/\n{2,}/g, "\n");
      const finalized = finalizeSources(cleanedHTML, webSources);
      parsed.content = finalized.html;
      parsed.sources = finalized.used.map((s) => ({ title: s.title, url: s.url }));
    }

    if (typeof parsed.description === "string") {
      parsed.description = parsed.description.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 160);
    } else {
      parsed.description = "";
    }

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("AI Generate Error:", error);
    return NextResponse.json(
      { error: error.message || "Terjadi kesalahan saat membuat artikel." },
      { status: 500 }
    );
  }
}
