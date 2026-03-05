'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {!logoError ? (
              <Image
                src="/logo.svg"
                alt="VIP For Women"
                width={200}
                height={50}
                className="h-12 w-auto object-contain"
                onError={() => setLogoError(true)}
                priority
              />
            ) : (
              <span className="text-2xl font-bold text-primary-600">
                VIP For Women
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-primary-600 transition">
              Home
            </Link>
            <Link href="/shop" className="hover:text-primary-600 transition">
              Shop
            </Link>
            <Link href="/about" className="hover:text-primary-600 transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-primary-600 transition">
              Contact
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-full transition"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
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
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-2">
            <Link
              href="/"
              className="block py-2 hover:text-primary-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="block py-2 hover:text-primary-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="block py-2 hover:text-primary-600 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block py-2 hover:text-primary-600 transition"
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
