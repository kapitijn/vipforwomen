import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'forvipwomen',
  description: 'Women\'s fashion, clothing, accessories and more',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <Header />
        <main className="min-h-screen bg-black">
          {children}
        </main>
        <Footer />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#000',
              color: '#fff',
              border: '1px solid #404040',
            },
          }}
        />
      </body>
    </html>
  );
}
