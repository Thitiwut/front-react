/* eslint-disable import/no-named-as-default */
import React from "react";
import PropTypes from "prop-types";
import { Switch, NavLink, Route } from "react-router-dom";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";

import ProductPage from "./containers/product/ProductPage";
import PurchaseOrderPage from "./containers/purchase_order/PurchaseOrderPage";
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
          <NavLink to="/po">
            <Menu.Item
              name="po"
              active={activeItem === "po"}
              onClick={this.handleItemClick}
            >
              Purchase Order
            </Menu.Item>
          </NavLink>
          <NavLink to="/product">
            <Menu.Item
              name="product"
              active={activeItem === "product"}
              onClick={this.handleItemClick}
            >
              Product
            </Menu.Item>
          </NavLink>

        </Menu>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/po" component={PurchaseOrderPage} />
          <Route path="/product" component={ProductPage} />
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
