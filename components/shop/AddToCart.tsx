'use client';

import { useState } from 'react';

// Not connected yet: cart and checkout depend on how Bometh will take payment.
export default function AddToCart() {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(0);

  return (
    <>
      <div className="buy">
        <div className="qty" role="group" aria-label="Quantity">
          <button aria-label="Decrease quantity" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
          <output aria-live="polite">{quantity}</output>
          <button aria-label="Increase quantity" onClick={() => setQuantity((q) => q + 1)}>+</button>
        </div>
        <button className="btn" onClick={() => setAdded((a) => a + quantity)}>Add to cart</button>
      </div>
      <p className="added" aria-live="polite">{added ? `${added} added to cart` : ''}</p>
    </>
  );
}
