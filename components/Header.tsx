'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X, Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  const categories = [
    { name: 'Top', href: '/shop?category=top' },
    { name: 'Jackets + Blazers', href: '/shop?category=jackets-blazers' },
    { name: 'Rompers', href: '/shop?category=rompers' },
    { 
      name: 'Dresses', 
      href: '/shop?category=dresses',
      subcategories: [
        { name: 'Normal Size', href: '/shop?category=dresses&size=normal' },
        { name: 'Plus Size', href: '/shop?category=dresses&size=plus' },
      ]
    },
    { 
      name: '2 Pc Set', 
      href: '/shop?category=2pc-set',
      subcategories: [
        { name: 'Normal Size', href: '/shop?category=2pc-set&size=normal' },
        { name: 'Plus Size', href: '/shop?category=2pc-set&size=plus' },
      ]
    },
    { name: '3 Pc Set', href: '/shop?category=3pc-set' },
    { name: 'Pants', href: '/shop?category=pants' },
    { name: 'Skirt', href: '/shop?category=skirt' },
    { name: 'Jeans', href: '/shop?category=jeans' },
    { name: 'Shorts', href: '/shop?category=shorts' },
    { name: 'Jumpsuit', href: '/shop?category=jumpsuit' },
    { name: 'Underwear: Lingeries', href: '/shop?category=lingeries' },
    { name: 'Shoes', href: '/shop?category=shoes' },
    { name: 'Bags', href: '/shop?category=bags' },
  ];

  return (
    <header className="bg-black border-b border-neutral-800 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 transition-all duration-300">
      <nav className="w-full px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center gap-4">
              {!logoError ? (
                <Image
                  src="/images/banners/vipheaderbanner.png"
                  alt="VIP For Women"
                  width={200}
                  height={50}
                  className="h-12 w-auto object-contain"
                  onError={() => setLogoError(true)}
                  priority
                />
              ) : null}
              <span className="text-2xl font-bold text-white">
                VIP For Women
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-neutral-300 transition uppercase text-sm tracking-widest font-light">
              Home
            </Link>
            
            {/* Categories Dropdown */}
            <div 
              className="relative z-50 group"
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setCategoriesOpen(false)}
            >
              <button className="text-white hover:text-neutral-300 transition uppercase text-sm tracking-widest font-light flex items-center gap-1 py-4">
                Shop
                <ChevronDown className={`w-4 h-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {categoriesOpen && (
                <>
                  {/* Invisible bridge to prevent gap issues */}
                  <div className="absolute top-full left-0 w-64 h-2 -mt-2" />
                  
                  <div className="absolute top-full left-0 w-64 bg-black border border-neutral-800 shadow-2xl py-2 max-h-[70vh] overflow-y-auto z-50 rounded-b-md">
                    {categories.map((category) => (
                      <div key={category.name}>
                        <Link
                          href={category.href}
                          className="block px-6 py-2.5 text-white hover:bg-neutral-900 hover:text-luxury-silver transition text-sm font-light"
                          onClick={() => setCategoriesOpen(false)}
                        >
                          {category.name}
                        </Link>
                        {category.subcategories && (
                          <div className="pl-4 bg-neutral-950">
                            {category.subcategories.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                className="block px-6 py-2 text-neutral-400 hover:text-luxury-silver transition text-xs font-light"
                                onClick={() => setCategoriesOpen(false)}
                              >
                                • {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Link href="/new-arrivals" className="text-white hover:text-neutral-300 transition uppercase text-sm tracking-widest font-light">
              New Arrivals
            </Link>
            <Link href="/sale" className="text-luxury-silver hover:text-white transition uppercase text-sm tracking-widest font-light">
              Sale
            </Link>
            <Link href="/about" className="text-white hover:text-neutral-300 transition uppercase text-sm tracking-widest font-light">
              About
            </Link>
            <Link href="/contact" className="text-white hover:text-neutral-300 transition uppercase text-sm tracking-widest font-light">
              Contact
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-neutral-800 rounded-full transition">
              <Search className="w-5 h-5 text-white" />
            </button>

            <Link
              href="/cart"
              className="relative p-2 hover:bg-neutral-800 rounded-full transition"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-2 bg-black max-h-[80vh] overflow-y-auto">
            <Link
              href="/"
              className="block py-2 text-white hover:text-neutral-300 transition uppercase text-sm tracking-widest"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* Mobile Categories */}
            <div className="py-2">
              <div className="text-luxury-silver uppercase text-xs tracking-widest mb-2 font-semibold">
                Shop Categories
              </div>
              {categories.map((category) => (
                <div key={category.name} className="ml-2">
                  <Link
                    href={category.href}
                    className="block py-1.5 text-white hover:text-luxury-silver transition text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                  {category.subcategories && (
                    <div className="ml-4">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block py-1 text-neutral-400 hover:text-luxury-silver transition text-xs"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          • {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Link
              href="/new-arrivals"
              className="block py-2 text-white hover:text-neutral-300 transition uppercase text-sm tracking-widest"
              onClick={() => setMobileMenuOpen(false)}
            >
              New Arrivals
            </Link>
            <Link
              href="/sale"
              className="block py-2 text-luxury-silver hover:text-white transition uppercase text-sm tracking-widest"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sale
            </Link>
            <Link
              href="/about"
              className="block py-2 text-white hover:text-neutral-300 transition uppercase text-sm tracking-widest"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-white hover:text-neutral-300 transition uppercase text-sm tracking-widest"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
