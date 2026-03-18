import { getProducts, publicWooClient } from '@/lib/woocommerce';
import { WooCommerceProduct } from '@/types';
import ProductCard from '@/components/ProductCard';

async function getProductsByTagSlug(tagSlug: string, perPage: number): Promise<WooCommerceProduct[]> {
  const key = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const secret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  try {
    const tagsResponse = await publicWooClient.get('/products/tags', {
      params: {
        per_page: 100,
        slug: tagSlug,
        consumer_key: key,
        consumer_secret: secret,
      },
    });

    const tag = tagsResponse.data?.[0];
    if (!tag?.id) {
      return [];
    }

    const { products } = await getProducts({
      tag: String(tag.id),
      per_page: perPage,
      orderby: 'date',
      order: 'desc',
    });

    return products;
  } catch (error) {
    console.error(`Error fetching products for tag ${tagSlug}:`, error);
    return [];
  }
}

function Section({ title, subtitle, products }: { title: string; subtitle: string; products: WooCommerceProduct[] }) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-14 border-t border-neutral-900 first:border-t-0 first:pt-0">
      <div className="flex items-end justify-between mb-8 gap-4">
        <div>
          <p className="text-luxury-silver uppercase tracking-[0.28em] text-xs mb-2">Gift Edit</p>
          <h2 className="text-3xl md:text-4xl font-playfair text-white">{title}</h2>
        </div>
        <p className="text-neutral-400 text-sm hidden md:block">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default async function GiftGuidePage() {
  const [featured, sale, birthday, anniversary, under100Pool] = await Promise.all([
    getProducts({ per_page: 8, featured: true, orderby: 'date', order: 'desc' }),
    getProducts({ per_page: 8, on_sale: true, orderby: 'date', order: 'desc' }),
    getProductsByTagSlug('birthday-gift', 8),
    getProductsByTagSlug('anniversary', 8),
    getProducts({ per_page: 30, orderby: 'date', order: 'desc' }),
  ]);

  const under100 = under100Pool.products.filter((p) => {
    const price = parseFloat(p.price || '0');
    return !Number.isNaN(price) && price > 0 && price <= 100;
  }).slice(0, 8);

  const hasAnySection =
    featured.products.length > 0 ||
    sale.products.length > 0 ||
    birthday.length > 0 ||
    anniversary.length > 0 ||
    under100.length > 0;

  return (
    <div className="min-h-screen bg-black">
      <section className="relative h-80 bg-gradient-to-br from-black via-neutral-900 to-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-pink-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-amber-300 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-4">
          <p className="text-luxury-silver uppercase tracking-[0.3em] text-xs mb-3">Curated</p>
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-4">Gift Guide</h1>
          <p className="text-silver max-w-2xl mx-auto">Find thoughtful luxury gifts for birthdays, anniversaries, and every special moment.</p>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mt-6" />
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {!hasAnySection ? (
          <div className="text-center py-20">
            <p className="text-silver text-2xl mb-3">Gift selections are coming soon</p>
            <p className="text-neutral-500 mb-8">Add featured products, sale products, or gift tags in WooCommerce to populate this page.</p>
            <a
              href="/shop"
              className="inline-block px-8 py-3 border border-silver text-silver hover:bg-silver hover:text-black transition uppercase tracking-wider text-sm"
            >
              Browse Full Shop
            </a>
          </div>
        ) : (
          <>
            <Section
              title="Editor Picks"
              subtitle="Hand-selected luxury pieces"
              products={featured.products}
            />

            <Section
              title="Gifts on Sale"
              subtitle="Elevated style at special prices"
              products={sale.products}
            />

            <Section
              title="Birthday Gifts"
              subtitle="Tagged with birthday-gift"
              products={birthday}
            />

            <Section
              title="Anniversary Gifts"
              subtitle="Tagged with anniversary"
              products={anniversary}
            />

            <Section
              title="Under $100"
              subtitle="Beautiful finds for every budget"
              products={under100}
            />
          </>
        )}
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Gift Guide | forvipwomen',
  description: 'Curated gift ideas from forvipwomen for birthdays, anniversaries, and more.',
};
