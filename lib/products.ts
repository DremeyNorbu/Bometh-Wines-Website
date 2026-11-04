import type { StaticImageData } from 'next/image';
import canRose from '@/assets/packs/can-rose.webp';
import canPeach from '@/assets/packs/can-peach.webp';
import canBerry from '@/assets/packs/can-berry.webp';
import canBrat from '@/assets/packs/can-brat.webp';
import bottleShiraz from '@/assets/packs/bottle-shiraz.webp';
import bottleWhite from '@/assets/packs/bottle-white.webp';

export type Category = 'spritz' | 'wine';

export type Product = {
  slug: string;
  name: string;
  category: Category;
  group: string;
  size: string;
  image: StaticImageData;
  /** Stage colour on the product page. */
  bg: string;
  /** Lighter tile colour on product cards. */
  tint: string;
  /** One-line flavour summary for product cards. */
  summary: string;
  keyNotes: string[];
  packaging: string;
  description: string;
};

export const products: Product[] = [
  {
    slug: 'rose-spritz',
    name: 'Rose Spritz',
    category: 'spritz',
    group: 'Wine Spritz',
    size: '250 ml can',
    image: canRose,
    bg: '#F7A8BE',
    tint: '#FBD0DB',
    summary: 'Strawberries, subtle florals, crisp bubbles',
    keyNotes: ['Strawberries', 'Subtle florals', 'Crisp bubbles'],
    packaging: '250 ml sleek portable can',
    description:
      'Bright and refreshing, Rosie is a sparkling rosé spritz bursting with fresh strawberry flavours and a hint of floral notes. Lightly fizzy and perfectly balanced, it’s your sparkling companion for celebrations, sunny afternoons, or anytime you want a crisp, easy-drinking wine spritz.',
  },
  {
    slug: 'peach-spritz',
    name: 'Peach Spritz',
    category: 'spritz',
    group: 'Wine Spritz',
    size: '250 ml can',
    image: canPeach,
    bg: '#FFB58A',
    tint: '#FFD2B4',
    summary: 'Peach cherry, lively sparkle',
    keyNotes: ['Peach cherry', 'Lively sparkle'],
    packaging: '250 ml portable can, ideal for on-the-go enjoyment',
    description:
      'Experience the juicy pop of peach and ripe cherries in our Peach spritz. This sparkling red blend is vibrant and lively with a playful fizz that makes it perfect for social gatherings or a refreshing twist on your usual wine glass.',
  },
  {
    slug: 'berry-spritz',
    name: 'Berry Spritz',
    category: 'spritz',
    group: 'Wine Spritz',
    size: '250 ml can',
    image: canBerry,
    bg: '#8D83CF',
    tint: '#D9D4F5',
    summary: 'Blue Berry, tropical fruits, crisp bubbles',
    keyNotes: ['Blue Berry', 'Tropical fruits', 'Crisp bubbles'],
    packaging: '250 ml travel-friendly can',
    description:
      'A zesty white wine spritz offering citrus and tropical fruit flavours with a bright, crisp finish. Berry’s smooth fizz makes it wonderfully refreshing for warm days, casual catch-ups, and alfresco dining.',
  },
  {
    slug: 'sparkling-brat',
    name: 'Sparkling Brat',
    category: 'spritz',
    group: 'Wine Spritz',
    size: '250 ml can',
    image: canBrat,
    bg: '#E4A743',
    tint: '#F6DBA4',
    summary: 'Rum, tropical fruits, caramel, sparkling finish',
    keyNotes: ['Rum', 'Tropical fruits', 'Caramel', 'Sparkling finish'],
    packaging: '250 ml handy can for anytime, anywhere',
    description:
      'Our exclusive rum-infused spritz blends tropical and caramel aromas with fine bubbles and a touch of sweetness. It brings a bold and refreshing twist, perfect for those who like their wine spritz with a little extra character.',
  },
  {
    slug: 'shiraz',
    name: 'Shiraz',
    category: 'wine',
    group: 'Wines',
    size: '750 ml bottle',
    image: bottleShiraz,
    bg: '#E7C7D3',
    tint: '#EBD3DC',
    summary: 'Full-bodied, structured, blackberry and plum',
    keyNotes: ['Full-bodied', 'Structured', 'Blackberry', 'Plum'],
    packaging: '750 ml bottle',
    description: 'Classic Australian Shiraz showcasing rich dark fruits, layered with subtle spice and oak.',
  },
  {
    slug: 'white-wine',
    name: 'White Wine',
    category: 'wine',
    group: 'Wines',
    size: '750 ml bottle',
    image: bottleWhite,
    bg: '#FBE7A9',
    tint: '#FBEFC4',
    summary: 'Crisp, clean, well-balanced',
    keyNotes: ['Crisp', 'Clean', 'Well-balanced'],
    packaging: '750 ml bottle',
    description: 'Refreshing white with bright citrus and tropical tones, perfect for warm afternoons.',
  },
];

export const findProduct = (slug: string) => products.find((p) => p.slug === slug);

/** The next three products in the range, wrapping round. */
export const relatedProducts = (slug: string) => {
  const i = products.findIndex((p) => p.slug === slug);
  return [1, 2, 3].map((n) => products[(i + n) % products.length]);
};
