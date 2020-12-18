import React from "react";
import { server } from "../../lib/api";
import {
  ProductsData,
  DeleteProductData,
  DeleteProductVariables,
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
  const fetchData = async () => {
    const { data } = await server.fetch<ProductsData>({ query: PRODUCTS });

    console.log(data.products);
  };

  const deleteProduct = async () => {
    const { data } = await server.fetch<
      DeleteProductData,
      DeleteProductVariables
    >({
      query: DELETE_PRODUCT,
      variables: {
        id: "5fda00747de4062470f5d3dc",
      },
    });

    console.log(data);
  };
  return (
    <>
      <h1>Products</h1>
      <button onClick={fetchData}>Query Products</button>
      <button onClick={deleteProduct}>Delete Products</button>
    </>
  );
};

export default Products;
