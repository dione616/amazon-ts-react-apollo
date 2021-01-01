/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Products
// ====================================================

export interface Products_products {
  __typename: "Product";
  id: string;
  title: string;
  description: string;
  price: number;
  seller: string;
  image: string;
  rating: number;
}

export interface Products {
  products: Products_products[];
}
