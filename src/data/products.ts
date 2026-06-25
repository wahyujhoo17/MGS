export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  variants: string[];
  weight: string;
  priceRetail: number;
  priceWholesale: number;
  minOrderWholesale: number;
  isSelfProduced: boolean;
  category: 'makaroni' | 'basreng' | 'mie-lidi' | 'keripik' | 'lainnya';
}

export const products: Product[] = [
  {
    id: 'P01',
    slug: 'makaroni-pedas',
    name: 'Makaroni Pedas Daun Jeruk',
    description: 'Makaroni renyah dengan bumbu pedas rahasia dan irisan daun jeruk asli. Diproduksi fresh setiap hari.',
    variants: ['Pedas Level 1', 'Pedas Level 3', 'Super Pedas'],
    weight: '250g',
    priceRetail: 15000,
    priceWholesale: 12000,
    minOrderWholesale: 12,
    isSelfProduced: true,
    category: 'makaroni',
  },
  {
    id: 'P02',
    slug: 'basreng-pedas',
    name: 'Basreng Pedas Nendang',
    description: 'Baso goreng ikan berkualitas tinggi digoreng garing dengan taburan bumbu pedas mantap.',
    variants: ['Original', 'Pedas Manis', 'Pedas Gila'],
    weight: '200g',
    priceRetail: 18000,
    priceWholesale: 14500,
    minOrderWholesale: 12,
    isSelfProduced: true,
    category: 'basreng',
  },
  {
    id: 'P03',
    slug: 'mie-lidi-bumbu',
    name: 'Mie Lidi Bumbu Melimpah',
    description: 'Jajanan nostalgia mie lidi dengan potongan pas dan bumbu yang menempel sempurna di setiap helai.',
    variants: ['Balado', 'Keju Asin', 'Jagung Bakar'],
    weight: '150g',
    priceRetail: 12000,
    priceWholesale: 9000,
    minOrderWholesale: 24,
    isSelfProduced: true,
    category: 'mie-lidi',
  },
  {
    id: 'P04',
    slug: 'keripik-singkong-pedas',
    name: 'Keripik Singkong Pedas Merah',
    description: 'Keripik singkong iris tipis dengan bumbu pedas merah karamel yang lengket dan manis pedas.',
    variants: ['Pedas Manis'],
    weight: '300g',
    priceRetail: 20000,
    priceWholesale: 16500,
    minOrderWholesale: 10,
    isSelfProduced: false,
    category: 'keripik',
  },
  {
    id: 'P05',
    slug: 'makaroni-bantet',
    name: 'Makaroni Bantet Gurih',
    description: 'Varian makaroni bantet (tidak mekar) yang memberikan tekstur lebih padat dan gurih.',
    variants: ['Asin Gurih', 'Pedas Sedang'],
    weight: '250g',
    priceRetail: 14000,
    priceWholesale: 11000,
    minOrderWholesale: 12,
    isSelfProduced: true,
    category: 'makaroni',
  },
  {
    id: 'P06',
    slug: 'seblak-kering',
    name: 'Seblak Kering Pedas Kencur',
    description: 'Kerupuk seblak bantet yang digoreng kering dengan bumbu kencur dan cabe rawit asli.',
    variants: ['Pedas Kencur'],
    weight: '200g',
    priceRetail: 16000,
    priceWholesale: 12500,
    minOrderWholesale: 12,
    isSelfProduced: true,
    category: 'lainnya',
  }
];
