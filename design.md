# Design Brief — MGS Jaya Abadi
**Website Snack & Makanan Ringan Tradisional**
**Arah Visual: Industrial Modern**
Stack: Next.js + Tailwind CSS

---

## Konsep Visual

**"Bold Factory"** — Memadukan kekuatan visual industri manufaktur dengan keterbacaan digital modern.
Tidak ada kesan warung atau UMKM kecil. MGS Jaya Abadi tampil seperti brand snack nasional
yang punya pabrik, punya sistem, dan layak dipercaya ribuan reseller.

Referensi mood: Tesla factory page + kemasan Pringles + industrial B2B catalog.

**Elemen khas:**
- Grid tegas, garis lurus, sudut tajam (border-radius minimal atau nol di elemen struktural)
- Tipografi besar, bold, condensed — bukan tipografi cafe yang bulat-bulat
- Warna dari logo: biru dongker dominan, aksen putih bersih, sentuhan silver/steel
- Section gelap bergantian dengan section terang — ritme halaman yang kuat
- Foto produk dengan treatment high-contrast, bukan foto lembut-pastel

---

## Token Desain

### Palet Warna (Diambil dari Logo MGS)

```
/* === WARNA UTAMA (dari logo) === */
--color-navy:       #0B1F6B   /* Biru dongker oval logo — background gelap utama */
--color-royal:      #1A3BAF   /* Biru royal teks "JAYA ABADI" — primary brand */
--color-sky:        #2E6FD4   /* Biru tengah logo — hover state, link */
--color-steel:      #7EB8E8   /* Biru muda/silver logo swoosh — aksen, border */

/* === NETRAL === */
--color-white:      #FFFFFF   /* Putih bersih — surface, teks di bg gelap */
--color-offwhite:   #F4F7FC   /* Putih kebiruan — background section terang */
--color-concrete:   #D1D9E6   /* Abu biru — border, divider, disabled */
--color-iron:       #4A5568   /* Abu gelap — teks sekunder */
--color-charcoal:   #0D1117   /* Hitam industrial — background section terdalam */

/* === AKSEN FUNGSIONAL === */
--color-signal:     #E8B400   /* Kuning sinyal — badge "Best Seller", warning */
--color-halal:      #16A34A   /* Hijau — badge Halal, status positif */
--color-danger:     #DC2626   /* Merah — error, stok habis */
```

### Tipografi

```
Display:  "Barlow Condensed" (Google Fonts)
          Weight: 700 (Bold) & 800 (ExtraBold)
          Digunakan: Hero headline, section title besar, nama brand
          Karakter: Tegas, industrial, cocok dengan font logo MGS

Body:     "Inter" (Google Fonts)
          Weight: 400 (Regular) & 600 (SemiBold)
          Digunakan: Semua body text, navigasi, deskripsi produk, form

Label:    "Barlow" (bukan Condensed)
          Weight: 500 (Medium)
          Digunakan: Badge, caption, stat label, filter tab
```

**Skala Tipe:**
```
--text-display:  clamp(3rem, 8vw, 6rem)      /* Hero headline */
--text-h1:       clamp(2rem, 5vw, 3.5rem)    /* Page title */
--text-h2:       clamp(1.5rem, 3vw, 2.25rem) /* Section title */
--text-h3:       1.25rem                      /* Card title, subheading */
--text-body:     1rem       /* line-height: 1.7 */
--text-sm:       0.875rem
--text-label:    0.75rem    /* letter-spacing: 0.08em, uppercase */
```

### Spacing & Layout

```
Container max-width:  1280px
Section padding:      py-24 (desktop) / py-16 (mobile)
Grid gap:             gap-4 (mobile) / gap-6 (desktop)

/* Border radius — industrial: MINIMAL */
--radius-none:   0px      /* Tabel, divider, stat bar */
--radius-sm:     4px      /* Badge, tag kecil */
--radius-card:   8px      /* Product card — sedikit saja */
--radius-btn:    4px      /* Tombol — tegas, tidak pill */
```

### Elemen Signature

**Garis biru diagonal** (`/`) sebagai akselerasi visual — muncul di hero sebagai divider antara
teks dan gambar, di section header sebagai eyebrow dekoratif, dan di footer. Terinspirasi dari
swoosh biru pada logo MGS. Dibuat dengan CSS `clip-path: polygon()` bukan gambar.

---

## Pola Warna per Section

Halaman bergantian antara section gelap dan terang untuk ritme visual yang kuat:

```
Navbar          → bg: navy (#0B1F6B), text: white
Hero            → bg: charcoal (#0D1117) + diagonal clip biru, text: white
Trust Bar       → bg: royal (#1A3BAF), text: white
Featured Produk → bg: offwhite (#F4F7FC), text: navy
Dual Path CTA   → bg: white, border tegas navy
Tentang Singkat → bg: navy (#0B1F6B), text: white
Testimoni       → bg: offwhite (#F4F7FC), text: navy
CTA Footer      → bg: royal (#1A3BAF), text: white
Footer          → bg: charcoal (#0D1117), text: concrete
```

---

## Struktur Halaman

### 1. Homepage (`/`)

#### Navbar
```
bg: navy | height: 64px
[Logo MGS PNG] kiri | [Produk] [Tentang] [Grosir] [Kontak] tengah | [Hubungi WA] kanan
Font: Inter SemiBold, text-white, hover: text-sky
WA Button: bg-royal border border-steel, rounded-sm
Mobile: hamburger → full-screen overlay menu bg-charcoal
```

#### Hero Section
```
bg: charcoal | min-height: 100vh
Layout 2 kolom dengan diagonal clip kanan:

┌──────────────────────────────────────────────────────────┐
│ bg: #0D1117                          /  bg: navy         │
│                                    /                     │
│  LABEL KECIL:                    /    [Foto produk       │
│  "PRODUSEN & GROSIR SNACK"      /     unggulan —        │
│                                /      high contrast,     │
│  MAKS RASA,                   /       bukan foto         │
│  MAKS                        /        lembut]            │
│  UNTUNG.                    /                            │
│                            /                             │
│  Subtext: 2 baris,        /                              │
│  Inter Regular            /                              │
│                          /                               │
│  [LIHAT PRODUK]  [INFO GROSIR]                          │
│   bg-royal        border-steel                           │
│                                                          │
└──────────────────────────────────────────────────────────┘

Eyebrow label: font-label uppercase tracking-widest text-steel
Headline: Barlow Condensed ExtraBold 800, text-white, clamp(3rem,8vw,6rem)
Subtext: Inter Regular, text-concrete, max-w-md
```

#### Trust Bar
```
bg: royal | py-6
4 item horizontal, divider garis vertikal steel antar item:
[ 10+ Tahun Berdiri ] | [ 50+ Produk ] | [ 500+ Reseller ] | [ ✓ Halal & BPOM ]
Angka: Barlow Condensed Bold text-white text-3xl
Label: Inter text-steel text-sm uppercase tracking-wider
```

#### Produk Unggulan
```
bg: offwhite | py-24
Header:
  Eyebrow: "KATALOG KAMI" — text-royal label style
  Title: "Produk Pilihan" — Barlow Condensed Bold navy

Grid: 4 kolom desktop / 2 kolom tablet / 1 kolom mobile

Product Card:
┌────────────────────┐
│ [Badge: Produksi   │  ← bg-royal text-white, rounded-sm text-xs
│  Sendiri]          │
│                    │
│  ┌──────────────┐  │
│  │  Foto Produk │  │  ← bg-white, object-contain, p-4
│  │  (bg putih)  │  │
│  └──────────────┘  │
│                    │
│  Makaroni Pedas    │  ← Barlow Condensed Bold text-navy
│  Original · Pedas  │  ← Inter text-iron text-sm
│  250g              │
│  ──────────────    │  ← border-t border-concrete
│  Rp 5.000 / pcs   │  ← text-royal font-semibold
│  Rp 3.500 (grosir)│  ← text-iron text-sm
│                    │
│  [PESAN VIA WA  →] │  ← bg-navy text-white w-full, hover: bg-royal
└────────────────────┘
border: 1px solid concrete, rounded-[8px]
hover: border-royal, shadow-md (shadow-navy/20)
```

#### Dual Path Section
```
bg: white | py-20 | border-y border-concrete

2 kolom dengan divider garis vertikal di tengah:

┌─────────────────────┬─────────────────────┐
│ border-r            │                     │
│                     │                     │
│  UNTUK KONSUMEN     │  UNTUK RESELLER     │
│  ─────────────      │  ─────────────      │
│  Beli satuan        │  Harga grosir       │
│  langsung via WA    │  MOQ mulai 1 lusin  │
│                     │  Support promosi    │
│  ✓ Pengiriman cepat │  ✓ Harga pabrik    │
│  ✓ Produk fresh     │  ✓ Margin lebar    │
│  ✓ Berbagai varian  │  ✓ Stok selalu ada │
│                     │                     │
│  [PESAN SEKARANG]   │  [DAFTAR RESELLER]  │
│   bg-royal          │   bg-navy           │
└─────────────────────┴─────────────────────┘
```

#### Tentang Singkat
```
bg: navy | py-24 | text-white

2 kolom: kiri teks, kanan foto (dengan overlay biru gelap)

Eyebrow: "TENTANG KAMI" — text-steel
Title: "Berdiri Sejak [Tahun], Kami Produksi Sendiri"
Body: 2–3 paragraf singkat tentang MGS
3 stat kecil: [✓ Pabrik Sendiri] [✓ Bahan Pilihan] [✓ Produksi Higienis]
Link: "Pelajari Lebih Lanjut →" text-steel hover:text-white
```

#### Testimoni
```
bg: offwhite | py-20

Header: "Dipercaya Ribuan Pelanggan"
Carousel 3 card (desktop), 1 (mobile), auto-scroll opsional

Testimoni Card:
┌──────────────────────────┐
│ ★★★★★                    │
│                          │
│ "Makaroninya enak, garing│
│  tahan lama. Reseller    │
│  kami selalu repeat      │
│  order tiap minggu!"     │
│                          │
│ ─────────────────────    │
│ Budi S. — Surabaya       │
│ Pemilik Toko Kelontong   │
└──────────────────────────┘
border-l-4 border-royal | bg-white
```

#### CTA Akhir
```
bg: royal | py-20 | text-white | text-center

Title: "Siap Bermitra dengan MGS Jaya Abadi?"
Subtext: "Hubungi kami sekarang dan dapatkan penawaran harga grosir terbaik."
[HUBUNGI VIA WHATSAPP  →]  bg-white text-royal, hover: bg-offwhite
```

#### Footer
```
bg: charcoal | text-concrete
4 kolom: Logo+deskripsi | Navigasi | Produk | Kontak
Border-t: border-iron/30
Copyright: "© 2025 MGS Jaya Abadi. All rights reserved."
```

---

### 2. Katalog Produk (`/produk`)

#### Page Header
```
bg: navy | py-16
Eyebrow + Title: "Katalog Produk Kami"
Subtext pendek
Diagonal clip bawah → transition ke bg-offwhite
```

#### Filter Bar (sticky top-16)
```
bg: white | border-b border-concrete | py-3
Scroll horizontal di mobile

Filter Kategori (Tab):
[Semua] [Produksi Sendiri] [Grosir Distributor]
Active tab: bg-navy text-white
Inactive: text-iron hover:text-navy

Filter Jenis (Chip):
[Makaroni] [Basreng] [Mie Lidi] [Keripik] [Lainnya]
Active chip: bg-royal text-white rounded-sm
Inactive: border border-concrete text-iron rounded-sm
```

#### Product Grid
```
2 kolom (mobile) / 3 kolom (tablet) / 4 kolom (desktop)
Sama dengan card di homepage
```

#### Product Detail (`/produk/[slug]`)
```
Layout 2 kolom:
Kiri: Gallery foto (thumbnail row bawah)
Kanan:
  - Badge kategori
  - Nama produk (h1 Barlow Condensed)
  - Deskripsi singkat
  - Varian tersedia (chip selector)
  - Tabel harga:
    ┌──────────────┬──────────────┐
    │ Eceran       │ Rp X.XXX     │
    ├──────────────┼──────────────┤
    │ Grosir       │ Rp X.XXX     │
    │ (min. X pcs) │              │
    └──────────────┴──────────────┘
  - Komposisi & info produk (accordion)
  - [PESAN VIA WHATSAPP] — full width bg-navy
  - [Download Katalog PDF] — ghost button
```

---

### 3. Tentang Kami (`/tentang`)

```
Section 1: Hero — bg-navy, foto tim/pabrik, judul besar
Section 2: Cerita — bg-white, 2 kolom teks + foto
Section 3: Nilai — bg-offwhite, 3 card industrial
           ┌────────┐ ┌────────┐ ┌────────┐
           │ [ikon] │ │ [ikon] │ │ [ikon] │
           │Kualitas│ │Higieni │ │Amanah  │
           └────────┘ └────────┘ └────────┘
Section 4: Legalitas — bg-navy, logo BPOM / Halal / NIB
Section 5: Jangkauan distribusi — bg-white, list atau peta
```

---

### 4. Grosir & Reseller (`/grosir`)

```
Hero: bg-charcoal, headline bold "Raih Margin Lebih Bersama MGS"
Keunggulan: bg-offwhite, 4 item grid dengan ikon + angka kunci
Cara Daftar: bg-white, 3 step horizontal dengan garis konektor
  [1. Hubungi WA] ——→ [2. Pilih Produk] ——→ [3. Mulai Jual]
FAQ: bg-offwhite, accordion
CTA: bg-royal, tombol WA
```

---

### 5. Kontak (`/kontak`)

```
Split layout:
Kiri: Info kontak + Google Maps embed
Kanan: Form kontak
  - Nama
  - No. HP
  - Jenis (Konsumen / Reseller) — radio button
  - Pesan
  - [KIRIM VIA WHATSAPP] → buka WA dengan pesan pre-fill
```

---

## Komponen UI

### Button Variants
```tsx
// Primary — aksi utama
<button className="bg-royal text-white px-6 py-3 text-sm font-semibold 
                   tracking-wider uppercase rounded-[4px] 
                   hover:bg-navy transition-colors">
  Lihat Produk
</button>

// Secondary — outline
<button className="border border-steel text-white px-6 py-3 text-sm 
                   font-semibold tracking-wider uppercase rounded-[4px]
                   hover:bg-white/10 transition-colors">
  Info Grosir
</button>

// Dark — di section terang
<button className="bg-navy text-white px-6 py-3 text-sm font-semibold
                   tracking-wider uppercase rounded-[4px]
                   hover:bg-royal transition-colors">
  Pesan Sekarang
</button>
```

### Badge Variants
```tsx
type BadgeVariant = 'produksi' | 'grosir' | 'halal' | 'bestseller'

const badgeStyles = {
  produksi:   'bg-royal text-white',
  grosir:     'bg-sky text-white',
  halal:      'bg-halal text-white',
  bestseller: 'bg-signal text-navy',
}
// Semua: text-xs font-medium uppercase tracking-wider px-2 py-0.5 rounded-[4px]
```

### WhatsApp Floating Button
```tsx
// Fixed bottom-6 right-6 z-50
// bg-[#25D366] (hijau WA resmi) text-white
// rounded-[4px] — konsisten dengan estetik industrial
// Shadow: shadow-lg shadow-black/30
// Icon: WhatsApp SVG + teks "Chat WA" di desktop
// Pulse animation: ring hijau saat pertama muncul (sekali saja)
```

### Section Eyebrow
```tsx
// Pola konsisten di semua section:
<div className="flex items-center gap-3 mb-3">
  <div className="w-8 h-[2px] bg-royal" />  {/* garis pendek */}
  <span className="text-royal text-xs font-medium uppercase tracking-[0.15em]">
    KATALOG KAMI
  </span>
</div>
```

---

## Animasi & Interaksi

| Elemen | Animasi | Catatan |
|--------|---------|---------|
| Hero headline | Fade up, delay stagger | Framer Motion |
| Product card | Fade in saat masuk viewport | Intersection Observer |
| Stat counter | Count up saat visible | Custom hook |
| Navbar | bg opacity + border muncul saat scroll | CSS transition |
| Diagonal clip | Static CSS — tidak dianimasikan | clip-path |
| WA button | Pulse ring sekali saat muncul | CSS keyframes |
| Filter tab | Sliding indicator bawah | CSS transition |
| Hover card | border-color + shadow transition | CSS transition |

Semua animasi: `@media (prefers-reduced-motion: reduce) { * { animation: none } }`

---

## Struktur Folder Next.js

```
mgs-jaya-abadi/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Homepage
│   ├── produk/
│   │   ├── page.tsx                # Katalog
│   │   └── [slug]/page.tsx         # Detail produk
│   ├── tentang/page.tsx
│   ├── grosir/page.tsx
│   └── kontak/page.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   └── SectionEyebrow.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── TrustBar.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── DualPathCTA.tsx
│   │   ├── AboutSnippet.tsx
│   │   └── Testimonials.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── FilterBar.tsx
│   └── shared/
│       └── WhatsAppButton.tsx
├── data/
│   └── products.ts
├── lib/
│   ├── utils.ts
│   └── whatsapp.ts                 # Helper WA link builder
├── public/
│   ├── logo-mgs.png                # Logo upload dari klien
│   └── images/products/
└── styles/
    └── globals.css
```

---

## Setup

### Instalasi
```bash
npx create-next-app@latest mgs-jaya-abadi \
  --typescript --tailwind --eslint --app

npm install framer-motion lucide-react
```

### `tailwind.config.ts`
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy:      '#0B1F6B',
        royal:     '#1A3BAF',
        sky:       '#2E6FD4',
        steel:     '#7EB8E8',
        offwhite:  '#F4F7FC',
        concrete:  '#D1D9E6',
        iron:      '#4A5568',
        charcoal:  '#0D1117',
        signal:    '#E8B400',
        halal:     '#16A34A',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        sans:    ['"Inter"', 'sans-serif'],
        barlow:  ['"Barlow"', 'sans-serif'],
      },
      clipPath: {
        'hero-diagonal': 'polygon(0 0, 58% 0, 48% 100%, 0 100%)',
      },
    },
  },
  plugins: [],
}

export default config
```

### `app/layout.tsx` — Google Fonts
```tsx
import { Barlow_Condensed, Barlow, Inter } from 'next/font/google'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-barlow',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
})
```

### `lib/whatsapp.ts`
```ts
const WA_NUMBER = '628xxxxxxxxxx' // Ganti dengan nomor WA aktif MGS

export function buildWALink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

export function productOrderMessage(productName: string, variant?: string): string {
  return `Halo MGS Jaya Abadi 👋\n\nSaya ingin memesan:\n*${productName}*${variant ? `\nVarian: ${variant}` : ''}\n\nMohon info ketersediaan & harga. Terima kasih!`
}

export function resellerMessage(): string {
  return `Halo MGS Jaya Abadi 👋\n\nSaya tertarik untuk menjadi *Reseller* produk MGS.\n\nMohon info syarat dan harga grosir. Terima kasih!`
}
```

---

## SEO Meta

```tsx
export const metadata = {
  title: 'MGS Jaya Abadi — Produsen & Grosir Snack Tradisional',
  description: 'Produsen dan grosir snack makanan ringan tradisional: makaroni, basreng, mie lidi. Melayani eceran dan reseller seluruh Indonesia. Harga pabrik, kualitas terjamin.',
  keywords: ['snack tradisional', 'makaroni pedas', 'basreng', 'mie lidi', 'grosir snack surabaya', 'MGS Jaya Abadi'],
  openGraph: {
    title: 'MGS Jaya Abadi',
    description: 'Produsen snack tradisional, harga grosir pabrik.',
    url: 'https://mgs.my.id',
    siteName: 'MGS Jaya Abadi',
    locale: 'id_ID',
    type: 'website',
  },
}
```

---

## Checklist Aset yang Dibutuhkan

### Wajib
- [ ] Logo PNG transparan (sudah ada ✓ — export versi transparan)
- [ ] Nomor WhatsApp bisnis aktif
- [ ] Foto produk per SKU (latar putih/abu netral, pencahayaan baik)

### Sangat Disarankan
- [ ] Foto fasilitas produksi / pabrik
- [ ] Teks profil perusahaan (tahun berdiri, cerita singkat)
- [ ] Data semua produk: nama, varian, berat, harga eceran, harga grosir, min. order
- [ ] Scan sertifikat Halal / BPOM (jika ada)

### Opsional
- [ ] Foto tim / founder
- [ ] Video singkat proses produksi (untuk hero atau tentang kami)
- [ ] Testimoni dari reseller (nama, kota, review)
