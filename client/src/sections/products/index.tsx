import React from "react";
import { server } from "../../lib/api";

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
    const products = await server.fetch({ query: PRODUCTS });

    console.log(products);
  };
  return (
    <>
      <h1>Products</h1>
      <button onClick={fetchData}>Query Products</button>
    </>
  );
};

export default Products;
