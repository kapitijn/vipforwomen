'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductBanner() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Debug image loading
  const handleImageLoad = () => {
    console.log('Test image loaded successfully');
  };
  const handleImageError = (e: any) => {
    console.error('Test image failed to load', e);
  };

  return (
    <section className="relative w-full bg-neutral-900 border-y border-neutral-800 overflow-hidden my-16">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left: Image */}
          <div className="relative h-[500px] overflow-hidden bg-black">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/vipnewlogo.png"
                alt="Test VIP Logo"
                width={400}
                height={400}
                className="object-cover w-64 h-64 border border-luxury-silver"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="relative h-[500px] bg-black flex items-center px-12">
            <div 
              className="max-w-md"
              style={{
                transform: `translateX(${Math.max(0, (scrollY - 800) * 0.1)}px)`,
                opacity: Math.min(1, Math.max(0, (scrollY - 600) / 200)),
              }}
            >
              <div className="w-16 h-[1px] bg-luxury-silver mb-6"></div>
              <p className="text-luxury-silver text-xs tracking-[0.3em] uppercase mb-4">New Arrival</p>
              <h2 className="text-4xl font-serif font-light text-white mb-4 leading-tight">
                Signature Heritage Collection
              </h2>
              <p className="text-neutral-400 font-light mb-8 leading-relaxed">
                Timeless elegance meets contemporary design. Handcrafted with precision and attention to detail.
              </p>
              <Link
                href="/shop"
                className="inline-block border border-luxury-silver text-luxury-silver px-8 py-3 uppercase tracking-widest text-xs font-light hover:bg-luxury-silver hover:text-black transition-all duration-300"
              >
                Discover More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-luxury-silver opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-luxury-silver opacity-20"></div>
    </section>
  );
}
