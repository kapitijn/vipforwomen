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

  return <ProductDetail product={product} />;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | forvipwomen`,
    description: product.short_description || product.description,
  };
}
