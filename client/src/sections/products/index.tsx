import React from "react";
import { useQuery, useMutation } from "../../lib/api";
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
  const { data, loading, error, refetch } = useQuery<ProductsData>(PRODUCTS);
  console.log(`data: ${data?.products[0]}`);

  const [
    deleteProduct,
    { loading: deleteProductLoading, error: deleteProductError },
  ] = useMutation<DeleteProductData, DeleteProductVariables>(DELETE_PRODUCT);

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct({ id });

    refetch();
  };

  const products = data ? data.products : null;

  const productsList = products
    ? products.map((product) => {
        return (
          <li key={product.id}>
            {product.title} <img height="30px" src={product.image} alt="img" />
            <button onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </button>
          </li>
        );
      })
    : null;

  const deleteProductLoadingMessage = deleteProductLoading && (
    <h2>Deleting in progress ...</h2>
  );

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Error</h2>;
  }

  const deleteProductErrorMessage = deleteProductError && (
    <h2>Deleting failed!</h2>
  );

  return (
    <>
      <h1>Products</h1>
      <ul>{productsList}</ul>
      {deleteProductLoadingMessage}
      {deleteProductErrorMessage}
    </>
  );
};

export default Products;
