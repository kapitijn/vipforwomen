'use client';

import Image from 'next/image';

type Brand = 
  | { type: 'text'; name: string }
  | { type: 'image'; src: string; alt: string };

export default function BrandCarousel() {
  const brands: Brand[] = Array(7).fill([
    { type: 'text', name: 'Beetop' },
    { type: 'text', name: 'Closet Deluxe' },
    { type: 'text', name: 'Razzo' },
  ]).flat();

  return (
    <div className="w-full bg-black border-b border-neutral-800 py-6 overflow-hidden">
      <div className="relative flex">
        <div className="flex animate-scroll items-center space-x-8">
          {brands
            .filter((brand): brand is { type: 'text'; name: string } => brand.type === 'text')
            .map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center"
              >
                <span className="text-base font-extralight font-obvia-narrow tracking-tight text-white opacity-70 hover:opacity-100 transition-opacity duration-300 px-2">
                  {brand.name}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
