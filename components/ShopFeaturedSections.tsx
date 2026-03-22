'use client';

import FlashSale from '@/components/FlashSale';
import CategoryGrid from '@/components/CategoryGrid';
import BestSellers from '@/components/BestSellers';
import GiftIdeas from '@/components/GiftIdeas';

export default function ShopFeaturedSections() {
  return (
    <>
      <FlashSale />
      <CategoryGrid />
      <BestSellers />
      <GiftIdeas />
    </>
  );
}
