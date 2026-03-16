'use client';

import Image from 'next/image';

type Brand = 
  | { type: 'text'; name: string }
  | { type: 'image'; src: string; alt: string };

export default function BrandCarousel() {
  const brands: Brand[] = [
    { type: 'text', name: 'CHANEL' },
    { type: 'image', src: '/beetop  .png', alt: 'Beetop' },
    { type: 'text', name: 'DIOR' },
    { type: 'image', src: '/closet deluxe.png', alt: 'Closet Deluxe' },
    { type: 'text', name: 'GUCCI' },
    { type: 'image', src: '/razzologo.png', alt: 'Razzo' },
    { type: 'text', name: 'PRADA' },
    { type: 'text', name: 'VERSACE' },
    { type: 'text', name: 'HERMÈS' },
    { type: 'text', name: 'VALENTINO' },
    { type: 'text', name: 'GIVENCHY' },
    { type: 'text', name: 'BALENCIAGA' },
    { type: 'text', name: 'FENDI' },
  ];

  return (
    <div className="w-full bg-black border-b border-neutral-800 py-6 overflow-hidden">
      <div className="relative flex">
        <div className="flex animate-scroll items-center space-x-16">
          {brands.concat(brands).map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center"
            >
              {brand.type === 'text' ? (
                <span className="text-luxury-silver text-sm tracking-[0.3em] font-light uppercase whitespace-nowrap opacity-50 hover:opacity-100 transition-opacity duration-300">
                  {brand.name}
                </span>
              ) : (
                <div className="relative h-10 w-24 opacity-50 hover:opacity-100 transition-opacity duration-300">
                  <Image
                    src={brand.src}
                    alt={brand.alt}
                    fill
                    className="object-contain"
                    style={{ filter: 'brightness(0.9) contrast(1.1)' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
