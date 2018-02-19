import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

const HomePage = () => {
  return (
    <div>
      <h1>Order Management</h1>

      <h2>Plan</h2>
      <ol>
        <li>
          Review the <Link to="/fuel-savings">list</Link>
        </li>
        <li>test</li>
        <Button color="green">
          <Link to="/add-products">Add Product</Link>
        </Button>
      </ol>
    </div>
  );
};

export default HomePage;
