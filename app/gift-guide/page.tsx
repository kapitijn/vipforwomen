
import ProductCard from '@/components/ProductCard';
import client from '@/lib/apollo-client';
import { gql } from '@apollo/client';


function Section({ title, subtitle, products }: { title: string; subtitle: string; products: any[] }) {
  if (!products || products.length === 0) {
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
  const GET_PRODUCTS = gql`
    query GetProducts($first: Int) {
      products(first: $first) {
        nodes {
          id
          name
          slug
          description
          shortDescription
          image { sourceUrl altText }
          ... on SimpleProduct {
            price
            regularPrice
            salePrice
            onSale
            stockStatus
          }
          productTags { nodes { id name slug } }
        }
      }
    }
  `;

  type ProductsQueryResult = { data: { products: { nodes: any[] } } };
  const [
    featuredRes,
    saleRes,
    birthdayRes,
    anniversaryRes,
    under100Res
  ] = await Promise.all([
    client.query({ query: GET_PRODUCTS, variables: { first: 8 }, fetchPolicy: 'no-cache' }),
    client.query({ query: GET_PRODUCTS, variables: { first: 8 }, fetchPolicy: 'no-cache' }),
    client.query({ query: GET_PRODUCTS, variables: { first: 8 }, fetchPolicy: 'no-cache' }),
    client.query({ query: GET_PRODUCTS, variables: { first: 8 }, fetchPolicy: 'no-cache' }),
    client.query({ query: GET_PRODUCTS, variables: { first: 30 }, fetchPolicy: 'no-cache' }),
  ]) as ProductsQueryResult[];

  const featured = featuredRes.data?.products?.nodes || [];
  const sale = saleRes.data?.products?.nodes || [];
  const birthday = birthdayRes.data?.products?.nodes || [];
  const anniversary = anniversaryRes.data?.products?.nodes || [];
  const under100 = (under100Res.data?.products?.nodes || []).filter((p: any) => {
    const price = parseFloat(p.price || p.salePrice || p.regularPrice || '0');
    return !Number.isNaN(price) && price > 0 && price <= 100;
  }).slice(0, 8);

  const hasAnySection =
    featured.length > 0 ||
    sale.length > 0 ||
    birthday.length > 0 ||
    anniversary.length > 0 ||
    under100.length > 0;

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <>
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
                products={featured}
              />

              <Section
                title="Gifts on Sale"
                subtitle="Luxury for less"
                products={sale}
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
        </>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Gift Guide | forvipwomen',
  description: 'Curated gift ideas from forvipwomen for birthdays, anniversaries, and more.',
};
