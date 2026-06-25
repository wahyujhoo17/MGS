import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const categoriesData = [
    { name: 'Makaroni', slug: 'makaroni' },
    { name: 'Basreng', slug: 'basreng' },
    { name: 'Mie Lidi', slug: 'mie-lidi' },
    { name: 'Keripik', slug: 'keripik' },
    { name: 'Lainnya', slug: 'lainnya' },
  ];

  const categoryMap = new Map();

  // Create categories
  for (const cat of categoriesData) {
    const createdCat = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name: cat.name,
        slug: cat.slug,
      },
    });
    categoryMap.set(cat.slug, createdCat.id);
  }

  const productsData = [
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
      categorySlug: 'makaroni',
      imageUrl: '/img/product_snack.png'
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
      categorySlug: 'basreng',
      imageUrl: '/img/product_snack.png'
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
      categorySlug: 'mie-lidi',
      imageUrl: '/img/product_snack.png'
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
      categorySlug: 'keripik',
      imageUrl: '/img/product_snack.png'
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
      categorySlug: 'makaroni',
      imageUrl: '/img/product_snack.png'
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
      categorySlug: 'lainnya',
      imageUrl: '/img/product_snack.png'
    }
  ];

  // Create products
  for (const prod of productsData) {
    const { categorySlug, ...productData } = prod;
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: {
        ...productData,
        categoryId: categoryMap.get(categorySlug),
      },
    });
  }

  // Create admin user
  const hashedPassword = await hashPassword('admin123');
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  });
  console.log('Admin account seeded: admin / admin123');

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
