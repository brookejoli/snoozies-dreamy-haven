/*
  src/components/AffiliateLinks.tsx
  Displays affiliate product recommendations
*/
import React from 'react';

export interface AffiliateProduct {
  name: string;
  amazonUrl: string;
  context: string;
}

interface AffiliateLinksProps {
  products: AffiliateProduct[];
}

export const AffiliateLinks: React.FC<AffiliateLinksProps> = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">🛍 Related Products</h2>
      <ul className="space-y-4">
        {products.map((product, idx) => (
          <li key={idx} className="border-t pt-4 first:border-none first:pt-0">
            <h3 className="font-semibold text-lg text-purple-700">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.context}</p>
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-purple-600 hover:underline"
            >
              View on Amazon
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};