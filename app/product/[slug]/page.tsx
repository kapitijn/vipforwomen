
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import client from '@/lib/apollo-client';
import { gql } from '@apollo/client';


export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const GET_PRODUCT_BY_SLUG = gql`
    query GetProductBySlug($slug: [String]) {
      products(where: { slugIn: $slug }) {
        nodes {
          __typename
          id
          name
          slug
          description
          shortDescription
          image { sourceUrl altText }
          galleryImages { nodes { sourceUrl altText } }
          ... on SimpleProduct {
            price
            regularPrice
            salePrice
            onSale
            stockStatus
          }
          ... on VariableProduct {
            price
            regularPrice
            salePrice
            onSale
            stockStatus
          }
          ... on ExternalProduct {
            price
            regularPrice
            salePrice
            onSale
          }
          ... on GroupProduct {
            price
            regularPrice
            salePrice
            onSale
          }
          productCategories { nodes { id name slug } }
          sku
          purchasable
        }
      }
    }
  `;
  type ProductsQueryResult = { products: { nodes: any[] } };
  const { data } = await client.query<{ products: { nodes: any[] } }>({
    query: GET_PRODUCT_BY_SLUG,
    variables: { slug: [params.slug] },
    fetchPolicy: 'no-cache',
  });
  const product = (data as ProductsQueryResult)?.products?.nodes?.[0] || null;

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}


export async function generateMetadata({ params }: { params: { slug: string } }) {
  const GET_PRODUCT_BY_SLUG = gql`
    query GetProductBySlug($slug: [String]) {
      products(where: { slugIn: $slug }) {
        nodes {
          name
          shortDescription
          description
        }
      }
    }
  `;
  type ProductsQueryResult = { products: { nodes: any[] } };
  const { data } = await client.query<{ products: { nodes: any[] } }>({
    query: GET_PRODUCT_BY_SLUG,
    variables: { slug: [params.slug] },
    fetchPolicy: 'no-cache',
  });
  const product = (data as ProductsQueryResult)?.products?.nodes?.[0] || null;

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | forvipwomen`,
    description: product.shortDescription || product.description,
  };
}
