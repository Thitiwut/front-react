/* eslint-disable import/no-named-as-default */
import React from "react";
import PropTypes from "prop-types";
import { Switch, NavLink, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import LoginPage from "./Login";

import ProductPage from "./containers/product/ProductPage";
import PurchaseOrderPage from "./containers/purchase_order/PurchaseOrderPage";
import { Menu } from "semantic-ui-react";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.authenticate = this.authenticate.bind(this)
  }

  state = {
    isAuthenticated: false
  };

  authenticate() {
    this.setState({
      isAuthenticated: true
    });
  }

  logout(){
    console.log("LOGGING OUT");
    this.setState({
      isAuthenticated: false
    });
    this.forceUpdate();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem, isAuthenticated } = this.state;
    if (isAuthenticated) {
      return (
        <div>
          <Menu>
            <NavLink exact to="/">
              <Menu.Item
                name="home"
                active={activeItem === "home"}
                onClick={this.handleItemClick}
              >
                หน้าหลัก
            </Menu.Item>{" "}
            </NavLink>
            <NavLink to="/po">
              <Menu.Item
                name="po"
                active={activeItem === "po"}
                onClick={this.handleItemClick}
              >
                ใบสั่งซื้อ
            </Menu.Item>
            </NavLink>
            <NavLink to="/product">
              <Menu.Item
                name="product"
                active={activeItem === "product"}
                onClick={this.handleItemClick}
              >
                สินค้า
            </Menu.Item>
            </NavLink>
            <Menu.Menu position='right'>
            <Menu.Item header>สาขา:  {localStorage.getItem("branch_name")}</Menu.Item>
            <Menu.Item
              name='ออกจากระบบ'
              active={activeItem === 'logout'}
              onClick={this.logout.bind(this)}
            />
            </Menu.Menu>
          </Menu>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/po" component={PurchaseOrderPage} />
            <Route path="/po/detail/:po_number" component={PurchaseOrderPage} />
            <Route path="/product" component={ProductPage} />
            <Route path="/login" component={LoginPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div >
      );
    } else {
      return (
        <div>
          <Redirect to='/login' />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" render={() => <LoginPage authenticate={this.authenticate} />} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      );
    }
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
