import Link from 'next/link';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductCard from '@/components/shop/ProductCard';
import ShopGrid from '@/components/shop/ShopGrid';
import { products } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Premium bottled wines and our refreshing canned Wine Spritz range, ordered online for doorstep delivery.',
};

export default function Shop() {
  return (
    <>
      <section className="phead" style={{ backgroundColor: 'var(--rose)', color: '#58103A' }}>
        <div className="wrap phead-in">
          <h1>Shop Bometh</h1>
          <p>Premium bottled wines and our refreshing canned Wine Spritz range, ordered online for doorstep delivery.</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Suspense fallback={<div className="grid">{products.map((p) => <ProductCard key={p.slug} product={p} />)}</div>}>
            <ShopGrid />
          </Suspense>
        </div>
      </section>

      <section className="sec-end">
        <div className="wrap">
          <div className="strip r" style={{ backgroundColor: '#DDE5CC', color: '#24301C' }}>
            <div>
              <h2>Prefer to pick it up?</h2>
              <p>Find Bometh Wines and Wine Spritz cans and bottles at select liquor stores across Australia.</p>
            </div>
            <Link className="btn" href="/find-a-store">Find a Store</Link>
          </div>
        </div>
      </section>
    </>
  );
}
