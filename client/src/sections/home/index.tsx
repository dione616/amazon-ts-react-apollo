import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <Link to="/login">
        <Button type="primary">Sign In</Button>
      </Link>
    </div>
  );
};
