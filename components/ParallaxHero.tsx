'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ParallaxHero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full h-[600px] bg-black border-b border-neutral-800 overflow-hidden">
      {/* Parallax background layers */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        {/* Animated silver glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-silver opacity-5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-luxury-white-gold opacity-5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div 
        className="relative container mx-auto px-8 h-full flex items-center"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div className="max-w-3xl">
          <div 
            className="overflow-hidden mb-4"
            style={{
              transform: `translateX(${-scrollY * 0.2}px)`,
            }}
          >
            <p className="text-luxury-silver uppercase tracking-[0.3em] text-sm font-light">
              Exclusive Collection
            </p>
          </div>
          
          <div 
            className="overflow-hidden mb-6"
            style={{
              transform: `translateX(${scrollY * 0.1}px)`,
            }}
          >
            <h1 className="text-7xl font-serif font-bold text-white leading-tight">
              Luxury Redefined
            </h1>
          </div>
          
          <div 
            className="overflow-hidden mb-8"
            style={{
              opacity: Math.max(0, 1 - scrollY / 300),
            }}
          >
            <p className="text-xl text-neutral-300 font-light leading-relaxed max-w-2xl">
              Experience unparalleled elegance with our curated selection of premium fashion and accessories.
            </p>
          </div>
          
          <div
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
              opacity: Math.max(0, 1 - scrollY / 400),
            }}
          >
            <Link
              href="/shop"
              className="inline-block bg-white text-black px-10 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-luxury-silver hover:text-black transition-all duration-300 border border-white hover:border-luxury-silver"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative lines */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-luxury-silver to-transparent opacity-30"></div>
    </section>
  );
}
