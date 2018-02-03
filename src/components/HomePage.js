import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>The Liam</h1>

      <h2>Test React</h2>
      <ol>
        <li>
          Review the <Link to="/fuel-savings">list</Link>
        </li>
        <li>test</li>
      </ol>
    </div>
  );
};

export default HomePage;
