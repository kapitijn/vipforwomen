'use client';

import Image from 'next/image';

type Brand = 
  | { type: 'text'; name: string }
  | { type: 'image'; src: string; alt: string };

export default function BrandCarousel() {
  const brands: Brand[] = [
    { type: 'image', src: '/beetop  .png', alt: 'Beetop' },
    { type: 'image', src: '/closet deluxe.png', alt: 'Closet Deluxe' },
    { type: 'image', src: '/razzologo.png', alt: 'Razzo' },
  ];

  return (
    <div className="w-full bg-black border-b border-neutral-800 py-6 overflow-hidden">
      <div className="relative flex">
        <div className="flex animate-scroll items-center space-x-16">
          {brands.concat(brands)
            .filter((brand): brand is { type: 'image'; src: string; alt: string } => brand.type === 'image')
            .map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center"
              >
                <div className="relative h-10 w-24 opacity-50 hover:opacity-100 transition-opacity duration-300">
                  <Image
                    src={brand.src}
                    alt={brand.alt}
                    fill
                    className="object-contain"
                    style={{ filter: 'brightness(0.9) contrast(1.1)' }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
