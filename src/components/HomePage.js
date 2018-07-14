import React from "react";
import { Link } from "react-router-dom";
import { Button, Feed, Icon, Divider } from "semantic-ui-react";
import { Dashboard } from './Dashboard';

const HomePage = () => {
  return (
    <div>
      <Dashboard/>
      <ol>
      </ol>
    </div>
  );
};

export default HomePage;
