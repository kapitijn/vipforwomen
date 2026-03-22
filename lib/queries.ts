import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($first: Int = 8) {
    products(first: $first) {
      nodes {
        id
        name
        slug
        description
        shortDescription
        image {
          sourceUrl
          altText
        }
        galleryImages {
          nodes {
            sourceUrl
            altText
          }
        }
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          onSale
          stockStatus
        }
        productCategories {
          nodes {
            id
            name
            slug
          }
        }
      }
    }
  }
`;
