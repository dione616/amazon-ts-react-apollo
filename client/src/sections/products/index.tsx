import { gql } from "apollo-boost";
import React from "react";
import { useQuery, useMutation } from "react-apollo";
import { Alert, Avatar, Button, List, Spin } from "antd";
import { Products as ProductsData } from "./__generated__/Products";
import {
  DeleteProduct as DeleteProductData,
  DeleteProductVariables,
} from "./__generated__/DeleteProduct";
import "./styles/index.css";
import ProductsSkeleton from "./components/ProductsSkeleton";

const PRODUCTS = gql`
  query Products {
    products {
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

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
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
    await deleteProduct({ variables: { id } });

    refetch();
  };

  const products = data ? data.products : null;

  const deleteProductLoadingMessage = deleteProductLoading && (
    <h2>Deleting in progress ...</h2>
  );

  const productsList = products && (
    <List
      itemLayout="horizontal"
      dataSource={products}
      renderItem={(product) => {
        return (
          <List.Item
            key={product.id}
            actions={[
              <Button
                key={product.id}
                onClick={() => handleDeleteProduct(product.id)}
                type="primary"
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={product.title}
              description={product.description}
              avatar={<Avatar src={product.image} shape="square" size={48} />}
            />
          </List.Item>
        );
      }}
    />
  );

  if (loading) {
    return (
      <div className="products">
        <ProductsSkeleton title="Products" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="products">
        <ProductsSkeleton title="Products" error />
      </div>
    );
  }

  const deleteProductErrorAlert = deleteProductError && (
    <Alert type="error" message="Something went wrong !!!" />
  );

  return (
    <div className="products">
      {deleteProductErrorAlert}
      <Spin spinning={deleteProductLoading}>
        <h1>Products</h1>
        <ul>{productsList}</ul>
        {deleteProductLoadingMessage}
      </Spin>
    </div>
  );
};

export default Products;
