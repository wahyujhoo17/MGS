const WA_NUMBER = '6281333560417';

export function buildWALink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function productOrderMessage(productName: string, variant?: string): string {
  return `Halo MGS Jaya Abadi 👋\n\nSaya ingin memesan:\n*${productName}*${variant ? `\nVarian: ${variant}` : ''}\n\nMohon info ketersediaan & harga. Terima kasih!`;
}

export function resellerMessage(): string {
  return `Halo MGS Jaya Abadi 👋\n\nSaya tertarik untuk menjadi *Reseller* produk MGS.\n\nMohon info syarat dan harga grosir. Terima kasih!`;
}
