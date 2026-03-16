'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function SummerDealsBanner() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full h-[500px] bg-black border-y border-neutral-800 overflow-hidden">
      {/* Parallax Background Layers */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-900"
        style={{
          transform: `translateY(${scrollY * 0.4}px) scale(${1 + scrollY * 0.0001})`,
        }}
      >
        {/* Animated silver glows */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-silver opacity-10 blur-3xl animate-pulse"
          style={{ animationDuration: '4s' }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxury-white-gold opacity-10 blur-3xl animate-pulse"
          style={{ animationDuration: '6s', animationDelay: '2s' }}
        ></div>
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(#E5E4E2 1px, transparent 1px), linear-gradient(90deg, #E5E4E2 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      ></div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div 
          className="text-center max-w-4xl px-8"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        >
          {/* Icon */}
          <div 
            className="inline-flex items-center justify-center mb-6"
            style={{
              transform: `rotate(${scrollY * 0.05}deg)`,
            }}
          >
            <Sparkles className="w-12 h-12 text-luxury-silver" />
          </div>

          {/* Subtitle */}
          <p 
            className="text-luxury-silver text-sm tracking-[0.3em] uppercase mb-4 font-light"
            style={{
              transform: `translateX(${-scrollY * 0.02}px)`,
            }}
          >
            Limited Time Offer
          </p>

          {/* Main Title */}
          <h2 
            className="text-7xl font-serif font-bold text-white mb-6 leading-none"
          >
            Summer Deals
          </h2>

          {/* Description */}
          <p 
            className="text-xl text-neutral-300 font-light mb-8 max-w-2xl mx-auto leading-relaxed"
            style={{
              transform: `translateX(${scrollY * 0.01}px)`,
            }}
          >
            Discover extraordinary savings on curated collections. Up to 50% off on selected items.
          </p>

          {/* CTA Button */}
          <div>
            <Link
              href="/shop?sale=true"
              className="inline-block bg-luxury-silver text-black px-12 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-white transition-all duration-300 border-2 border-luxury-silver"
            >
              Shop Summer Sale
            </Link>
          </div>

          {/* Decorative elements */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="w-20 h-[1px] bg-luxury-silver opacity-50"></div>
            <span className="text-luxury-silver text-xs tracking-[0.3em] uppercase">Limited Edition</span>
            <div className="w-20 h-[1px] bg-luxury-silver opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-luxury-silver to-transparent opacity-50"
        style={{
          transform: `scaleX(${Math.max(0.5, 1 - scrollY * 0.0003)})`,
        }}
      ></div>
    </section>
  );
}
