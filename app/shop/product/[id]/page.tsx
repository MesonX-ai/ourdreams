import React from 'react';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
  ];
}

const PRODUCTS = [
  { id: '1', name: 'Awesome Armchair', price: 123, regularPrice: 200, category: 'Furniture', image: '/images/e-commerce/home/product1.png', desc: 'There is no denying that eco-friendly materials can easily conquer the market. But can we produce enough to fulfill the growing demands? This armchair is made from the finest sustainable timber, bringing sustainable luxury right into your living room.' },
  { id: '2', name: 'Wooden casket', price: 90, regularPrice: 120, category: 'Decoration', image: '/images/e-commerce/home/product2.png', desc: 'This delicate minimalistic wooden casket serves as both an aesthetic centerpiece and a practical storage unit for your bedroom or vanity table.' },
  { id: '3', name: 'Awesome Lamp', price: 20, regularPrice: 45, category: 'Lighting', image: '/images/e-commerce/home/product3.png', desc: 'Shed bright new light onto your workspace or bedside table. Featuring energy-efficient LED modules hidden beneath an artistic Scandinavian dome.' },
  { id: '4', name: 'Soft Pillow', price: 40, regularPrice: 70, category: 'Bedding', image: '/images/e-commerce/home/product4.png', desc: 'Lie down and experience maximum cranial comfort. Filled with hypoallergenic microfiber blended with down feathers, covered in our organic cotton linen shell.' },
];

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find(p => p.id === params.id) || PRODUCTS[0];
  
  return <ProductDetailClient product={product} />;
}