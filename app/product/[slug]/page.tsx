import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/woocommerce';
import ProductDetail from '@/components/ProductDetail';

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />
    </div>
  );
}
