import Link from 'next/link';
import { Facebook, Instagram, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-neutral-800 mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h3 className="text-xl font-serif font-light mb-6 text-white tracking-wider">VIP For Women</h3>
            <p className="text-neutral-400 text-sm font-light leading-relaxed">
              Curating excellence in women's fashion, accessories, and lifestyle since 2026.
            </p>
            <div className="w-12 h-[1px] bg-luxury-silver mt-6"></div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-light mb-6 text-white uppercase tracking-widest text-sm">Navigation</h4>
            <ul className="space-y-3 text-sm text-neutral-400 font-light">
              <li>
                <Link href="/shop" className="hover:text-luxury-silver transition">
                  Shop Collection
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-luxury-silver transition">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-luxury-silver transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-light mb-6 text-white uppercase tracking-widest text-sm">Service</h4>
            <ul className="space-y-3 text-sm text-neutral-400 font-light">
              <li>
                <Link href="/shipping" className="hover:text-luxury-silver transition">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-luxury-silver transition">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-luxury-silver transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-light mb-6 text-white uppercase tracking-widest text-sm">Connect</h4>
            <div className="space-y-4 text-sm text-neutral-400 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-luxury-silver mt-0.5" />
                <div>
                  <p className="text-white">Mahonylaan 61 Unit 7</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-white uppercase tracking-wider text-xs">WhatsApp</p>
                <a
                  href="https://wa.me/5978795009"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-luxury-silver transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  879-5009 (Ringweg-Zuid)
                </a>
                <a
                  href="https://wa.me/5978902750"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-luxury-silver transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  890-2750 (Mahonylaan 61 Unit 17)
                </a>

              </div>

              <div className="flex space-x-4 pt-2">
              <a
                href="https://www.facebook.com/Adrianaviip525"
                target="_blank"
                rel="noreferrer"
                className="bg-neutral-900 border border-neutral-800 p-3 hover:border-luxury-silver hover:bg-black transition-all"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://www.instagram.com/explore/locations/563330034065776/for-vip-women/"
                target="_blank"
                rel="noreferrer"
                className="bg-neutral-900 border border-neutral-800 p-3 hover:border-luxury-silver hover:bg-black transition-all"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
            </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 text-center">
          <p className="text-sm text-neutral-500 font-light tracking-wider">&copy; 2026 VIP For Women. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
