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
      isSelfProduced: true,
      categorySlug: 'makaroni',
      variants: [
        { size: '100g', taste: 'Pedas Level 1', priceRetail: 8000, priceWholesale: 6500, minOrderWholesale: 12, imageUrl: '/img/product_snack.png' },
        { size: '250g', taste: 'Pedas Level 3', priceRetail: 15000, priceWholesale: 12000, minOrderWholesale: 12, imageUrl: '/img/product_snack.png' },
        { size: '250g', taste: 'Super Pedas', priceRetail: 15000, priceWholesale: 12000, minOrderWholesale: 12, imageUrl: '/img/product_snack.png' },
        { size: '500g', taste: 'Super Pedas', priceRetail: 28000, priceWholesale: 23000, minOrderWholesale: 6, imageUrl: '/img/product_snack.png' }
      ]
    },
    {
      id: 'P02',
      slug: 'basreng-pedas',
      name: 'Basreng Pedas Nendang',
      description: 'Baso goreng ikan berkualitas tinggi digoreng garing dengan taburan bumbu pedas mantap.',
      isSelfProduced: true,
      categorySlug: 'basreng',
      variants: [
        { size: '100g', taste: 'Original', priceRetail: 9000, priceWholesale: 7500, minOrderWholesale: 12, imageUrl: '/img/product_snack.png' },
        { size: '200g', taste: 'Pedas Manis', priceRetail: 18000, priceWholesale: 14500, minOrderWholesale: 12, imageUrl: '/img/product_snack.png' },
        { size: '200g', taste: 'Pedas Gila', priceRetail: 18000, priceWholesale: 14500, minOrderWholesale: 12, imageUrl: '/img/product_snack.png' },
        { size: '500g', taste: 'Pedas Gila', priceRetail: 34000, priceWholesale: 29000, minOrderWholesale: 6, imageUrl: '/img/product_snack.png' }
      ]
    },
    {
      id: 'P03',
      slug: 'mie-lidi-bumbu',
      name: 'Mie Lidi Bumbu Melimpah',
      description: 'Jajanan nostalgia mie lidi dengan potongan pas dan bumbu yang menempel sempurna di setiap helai.',
      isSelfProduced: true,
      categorySlug: 'mie-lidi',
      variants: [
        { size: '150g', taste: 'Balado', priceRetail: 12000, priceWholesale: 9000, minOrderWholesale: 24, imageUrl: '/img/product_snack.png' },
        { size: '150g', taste: 'Keju Asin', priceRetail: 12000, priceWholesale: 9000, minOrderWholesale: 24, imageUrl: '/img/product_snack.png' },
        { size: '300g', taste: 'Balado', priceRetail: 22000, priceWholesale: 17000, minOrderWholesale: 12, imageUrl: '/img/product_snack.png' }
      ]
    },
    {
      id: 'P04',
      slug: 'keripik-singkong-pedas',
      name: 'Keripik Singkong Pedas Merah',
      description: 'Keripik singkong iris tipis dengan bumbu pedas merah karamel yang lengket dan manis pedas.',
      isSelfProduced: false,
      categorySlug: 'keripik',
      variants: [
        { size: '150g', taste: 'Pedas Manis', priceRetail: 11000, priceWholesale: 9000, minOrderWholesale: 12, imageUrl: '/img/product_snack.png' },
        { size: '300g', taste: 'Pedas Manis', priceRetail: 20000, priceWholesale: 16500, minOrderWholesale: 10, imageUrl: '/img/product_snack.png' }
      ]
    },
    {
      id: 'P05',
      slug: 'makaroni-bantet',
      name: 'Makaroni Bantet Gurih',
      description: 'Varian makaroni bantet (tidak mekar) yang memberikan tekstur lebih padat dan gurih.',
      isSelfProduced: true,
      categorySlug: 'makaroni',
      variants: [
        { size: '100g', taste: 'Asin Gurih', priceRetail: 7000, priceWholesale: 5500, minOrderWholesale: 12, imageUrl: '/img/product_snack.png' },
        { size: '250g', taste: 'Asin Gurih', priceRetail: 14000, priceWholesale: 11000, minOrderWholesale: 12, imageUrl: '/img/product_snack.png' },
        { size: '250g', taste: 'Pedas Sedang', priceRetail: 14000, priceWholesale: 11000, minOrderWholesale: 12, imageUrl: '/img/product_snack.png' }
      ]
    },
    {
      id: 'P06',
      slug: 'seblak-kering',
      name: 'Seblak Kering Pedas Kencur',
      description: 'Kerupuk seblak bantet yang digoreng kering dengan bumbu kencur dan cabe rawit asli.',
      isSelfProduced: true,
      categorySlug: 'lainnya',
      variants: [
        { size: '200g', taste: 'Pedas Kencur', priceRetail: 16000, priceWholesale: 12500, minOrderWholesale: 12, imageUrl: '/img/product_snack.png' },
        { size: '400g', taste: 'Pedas Kencur', priceRetail: 30000, priceWholesale: 24000, minOrderWholesale: 6, imageUrl: '/img/product_snack.png' }
      ]
    }
  ];

  // Create products and variants
  for (const prod of productsData) {
    const { categorySlug, variants, ...productData } = prod;
    
    const createdProduct = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        name: productData.name,
        description: productData.description,
        isSelfProduced: productData.isSelfProduced,
        categoryId: categoryMap.get(categorySlug),
      },
      create: {
        id: productData.id,
        slug: prod.slug,
        name: productData.name,
        description: productData.description,
        isSelfProduced: productData.isSelfProduced,
        categoryId: categoryMap.get(categorySlug),
      },
    });

    // Delete existing variants for this product to prevent duplicate keys or stale data
    await prisma.productVariant.deleteMany({
      where: { productId: createdProduct.id },
    });

    // Create variants
    for (const variant of variants) {
      await prisma.productVariant.create({
        data: {
          productId: createdProduct.id,
          size: variant.size,
          taste: variant.taste,
          priceRetail: variant.priceRetail,
          priceWholesale: variant.priceWholesale,
          minOrderWholesale: variant.minOrderWholesale,
          imageUrl: variant.imageUrl,
        },
      });
    }
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
