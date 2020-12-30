import React, { useEffect, useState } from "react";
import { server, useQuery } from "../../lib/api";
import {
  ProductsData,
  DeleteProductData,
  DeleteProductVariables,
  Product,
} from "./types";

const PRODUCTS = `
  query Products{
    products{
      id
      title
      description
      price
      seller
      image
      rating
    }
  }
`;

const DELETE_PRODUCT = `
  mutation DeleteProduct($id:ID!){
    deleteProduct(id:$id){
      id
      title
    }
  }
`;

const Products: React.FC = () => {
  const { data, refetch } = useQuery<ProductsData>(PRODUCTS);
  console.log(`data: ${data?.products[0]}`);

  const deleteProduct = async (id: string) => {
    server.fetch<DeleteProductData, DeleteProductVariables>({
      query: DELETE_PRODUCT,
      variables: {
        id,
      },
    });
    /* fetchData(); */
    refetch();
  };

  const products = data ? data.products : null;

  const productsList = products
    ? products.map((product) => {
        return (
          <li key={product.id}>
            {product.title} <img height="30px" src={product.image} alt="img" />
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        );
      })
    : null;
  return (
    <>
      <h1>Products</h1>
      <ul>{productsList}</ul>
      {/* <button onClick={fetchData}>Query Products</button> */}
    </>
  );
};

export default Products;
