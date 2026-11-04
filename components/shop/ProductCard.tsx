import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import { placeholders } from '@/lib/site';

export default function ProductCard({ product, hidden = false }: { product: Product; hidden?: boolean }) {
  return (
    <Link className={`pc ${hidden ? 'off' : ''}`} href={`/shop/${product.slug}`}>
      <div className="im" style={{ backgroundColor: product.tint }}>
        <Image src={product.image} alt={product.name} sizes="160px" />
      </div>
      <b>{product.name}</b>
      <span>{product.summary}</span>
      <span className="pr">{placeholders.price} · {product.size}</span>
    </Link>
  );
}
