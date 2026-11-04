'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/shop/ProductCard';
import { products, type Category } from '@/lib/products';

type Filter = 'all' | Category;

const tabs: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'spritz', label: 'Wine Spritz' },
  { id: 'wine', label: 'Wines' },
];

const parse = (value: string | null): Filter => (value === 'spritz' || value === 'wine' ? value : 'all');

export default function ShopGrid() {
  const params = useSearchParams();
  const requested = parse(params.get('category'));
  const [filter, setFilter] = useState<Filter>(requested);

  useEffect(() => setFilter(requested), [requested]);

  const shows = (category: Category) => filter === 'all' || filter === category;
  const count = products.filter((p) => shows(p.category)).length;

  return (
    <>
      <div className="bar">
        <div className="tabs" role="group" aria-label="Filter products">
          {tabs.map((t) => (
            <button key={t.id} className={`tab ${t.id === filter ? 'on' : ''}`} aria-pressed={t.id === filter} onClick={() => setFilter(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
        <span className="count" aria-live="polite">{count} products</span>
      </div>
      <div className="grid">
        {products.map((p) => <ProductCard key={p.slug} product={p} hidden={!shows(p.category)} />)}
      </div>
    </>
  );
}
