import React from "react";
import { server } from "../../lib/api";
import { ProductsData } from "./types";

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

const Products: React.FC = () => {
  const fetchData = async () => {
    const { data } = await server.fetch<ProductsData>({ query: PRODUCTS });

    console.log(data.products);
  };
  return (
    <>
      <h1>Products</h1>
      <button onClick={fetchData}>Query Products</button>
    </>
  );
};

export default Products;
