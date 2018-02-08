/* eslint-disable import/no-named-as-default */
import React from "react";
import PropTypes from "prop-types";
import { Switch, NavLink, Route } from "react-router-dom";
import HomePage from "./HomePage";
import FuelSavingsPage from "./containers/FuelSavingsPage";
import AboutPage from "./AboutPage";
import NotFoundPage from "./NotFoundPage";
import AddProduct from "./AddProduct";
import { Menu } from "semantic-ui-react";

class App extends React.Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu>
          <NavLink exact to="/">
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
            >
              Home
            </Menu.Item>{" "}
          </NavLink>
          <NavLink to="/fuel-savings">
            <Menu.Item
              name="test"
              active={activeItem === "test"}
              onClick={this.handleItemClick}
            >
              test
            </Menu.Item>
          </NavLink>
          <NavLink to="/about">
            <Menu.Item
              name="about"
              active={activeItem === "about"}
              onClick={this.handleItemClick}
            >
              About
            </Menu.Item>
          </NavLink>
        </Menu>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/fuel-savings" component={FuelSavingsPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/add-products" component={AddProduct} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
