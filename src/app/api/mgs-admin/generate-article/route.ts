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
Anda adalah seorang penulis blog profesional dan pebisnis nyata di MGS Jaya Abadi (Pusat Grosir Camilan di Jawa Timur). Tulislah seperti manusia sungguhan yang sedang berbagi cerita atau pengalaman, BUKAN seperti robot yang sedang menulis esai akademis.

ATURAN ANTI-DETEKTOR AI (WAJIB DIPATUHI AGAR SKOR AI DI BAWAH 50%):
1. BURSTINESS (Varian Kalimat): Anda WAJIB menggunakan campuran kalimat yang sangat pendek (bahkan hanya 2-4 kata) dengan kalimat panjang yang mengalir. Jangan gunakan ritme yang konstan.
2. HINDARI KATA KLISE AI: DILARANG KERAS menggunakan kata-kata seperti: "Di era digital ini", "Tidak dapat dipungkiri", "Kesimpulannya", "Penting untuk diingat", "Sebagai kesimpulan", "Mari kita bahas", "Signifikan", "Krusial", "Berinovasi", "Menyelami", "Lanskap", "Membuka potensi", "Esensial", "Harta karun", "Permadani".
3. KETIDAKSEMPURNAAN NATURAL & BAHASA LISAN: Selipkan bahasa sehari-hari atau idiom lokal sesekali (misal: "ya", "sih", "kok", "kan", "bikin pusing", "cuan", "nggak masuk akal", "jujur saja"). Jangan gunakan bahasa Indonesia yang 100% kaku seperti buku cetak.
4. DETAIL SPESIFIK: Manusia mengingat detail, AI merangkum. Jangan gunakan frasa umum seperti "mengalami banyak tantangan". Gunakan cerita spesifik seperti "susahnya mencari tepung tapioka murah di pasar minggu lalu".
5. TANPA KESIMPULAN KAKU: Akhiri tulisan dengan opini santai, pertanyaan retoris, atau sekadar harapan ke depan. JANGAN pernah membuat paragraf rangkuman "Secara keseluruhan..." atau "Sebagai penutup...".
6. KERAPIAN FORMAT & INTERNAL LINK: Walaupun gaya bahasa Anda santai, susunan HTML artikel harus SANGAT RAPI dan MUDAH DIBACA (banyak Heading <h2> <h3>, Bullet Points <ul>, dan pisahkan paragraf agar tidak terlalu panjang). JIKA saya memberikan "REFERENSI INTERNAL LINK", Anda WAJIB menyelipkan 1 atau 2 link tersebut secara natural di tengah-tengah artikel menggunakan kode HTML ini: <blockquote class="border-l-4 border-indigo-600 pl-4 py-2 my-6 bg-indigo-50 rounded-r-lg"><strong>Baca juga: <a href="URL_ARTIKEL" class="text-indigo-700 hover:underline">JUDUL_ARTIKEL</a></strong></blockquote>
7. Sapa pembaca sesekali dengan "Sobat pebisnis" atau "Teman-teman UMKM".

KEMAMPUAN BROWSING (RAG): Jika diberikan Data Pencarian Web Aktual, lebur datanya ke dalam cerita seolah-olah Anda baru saja membacanya dari koran atau obrolan pasar hari ini. JANGAN sebutkan "Berdasarkan data pencarian web".

ATURAN FORMAT OUTPUT (WAJIB DIIKUTI):
1. OUTPUT HARUS BERUPA FORMAT JSON MURNI (TANPA TEKS PENGANTAR APAPUN, TANPA MARKDOWN BLOK).
2. Struktur JSON wajib memiliki 3 key ini:
   - "title": Judul artikel bergaya klik (Maksimal 60 karakter).
   - "slug": URL slug dari judul tersebut.
   - "content": Isi artikel full HTML (Maksimal 600 - 800 kata).
3. ATURAN HTML CONTENT KETAT:
   - HANYA GUNAKAN tag HTML standar: <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <a>, <code>, <blockquote>.
   - DILARANG KERAS membuat tag HTML fiktif atau <script>.
`;

// Fungsi untuk menarik data aktual dari SearxNG (RAG)
async function fetchSearxNG(query: string) {
  try {
    const url = new URL("https://searxng.lumicloud.my.id/search");
    url.searchParams.append("q", query);
    url.searchParams.append("format", "json");
    url.searchParams.append("time_range", "month"); 

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    if (!res.ok) {
      console.warn("SearxNG request failed:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return data.results.slice(0, 5).map((r: any) => `- ${r.title}: ${r.content} (${r.url})`).join("\n");
    }
  } catch (error) {
    console.error("Error fetching from SearxNG:", error);
  }
  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt diperlukan" }, { status: 400 });
    }

    let searchContext = "";
    const searchResults = await fetchSearxNG(prompt);
    if (searchResults) {
      searchContext = `\n\nBERIKUT ADALAH DATA PENCARIAN WEB TERKINI TENTANG TOPIK INI. GUNAKAN DATA INI (ANGKA, FAKTA, TREN) SEBAGAI REFERENSI UTAMA DALAM ARTIKEL:\n${searchResults}`;
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

    const userMessage = `Topik/Instruksi Artikel: ${prompt}${searchContext}${internalLinkContext}`;
    const model = process.env.CUSTOM_AI_MODEL || "gpt-4o-mini";

    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      response_format: { type: "json_object" },
      temperature: 0.85, // Diturunkan sedikit agar Deepseek tidak berhalusinasi JSON-nya
      max_tokens: 3000,
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
      parsed.content = cleanedHTML;
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
