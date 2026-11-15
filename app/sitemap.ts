import type { MetadataRoute } from 'next';
import { products } from '@/lib/products';
import { siteUrl } from '@/lib/site';

const pages = ['', '/shop', '/events-news', '/find-a-store', '/contact', '/privacy-policy', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((path) => ({ url: `${siteUrl}${path}` })),
    ...products.map((p) => ({ url: `${siteUrl}/shop/${p.slug}` })),
  ];
}
