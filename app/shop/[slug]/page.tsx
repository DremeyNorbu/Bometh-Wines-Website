import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AddToCart from '@/components/shop/AddToCart';
import ProductCard from '@/components/shop/ProductCard';
import { findProduct, products, relatedProducts } from '@/lib/products';
import { placeholders } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = findProduct((await params).slug);
  return product ? { title: product.name, description: product.description } : {};
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();

  return (
    <>
      <section className="pdp">
        <div className="pdp-stage" style={{ backgroundColor: product.bg }}>
          <div className="pdp-disc" aria-hidden="true" />
          <Image className="pack" src={product.image} alt={`${product.name}, ${product.size}`} sizes="300px" priority />
        </div>
        <div className="info">
          <div className="crumb"><Link href="/shop">Shop</Link> / {product.group}</div>
          <h1>{product.name}</h1>
          <div className="price">{placeholders.price}</div>
          <p>{product.description}</p>
          <div className="chips">
            {product.keyNotes.map((n) => <span key={n}>{n}</span>)}
          </div>
          <p className="meta">{product.packaging}</p>
          <AddToCart key={product.slug} />
          <p className="meta">Doorstep delivery, or <Link href="/find-a-store">find a store</Link> near you.</p>
        </div>
      </section>

      <section className="sec related">
        <div className="wrap">
          <h2 className="title r">You might also like</h2>
          <div className="grid r d1">
            {relatedProducts(product.slug).map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}
