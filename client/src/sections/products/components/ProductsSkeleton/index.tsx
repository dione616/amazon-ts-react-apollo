import React from "react";
import { Alert, Divider, Skeleton } from "antd";

interface Props {
  title: string;
  error?: boolean;
}

const ProductsSkeleton: React.FC<Props> = ({ title, error }) => {
  const errorAlert = error && (
    <Alert type="error" message="Something went wrong !!!" />
  );
  return (
    <div>
      {errorAlert}
      <h2>{title}</h2>
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
    </div>
  );
};

export default ProductsSkeleton;
