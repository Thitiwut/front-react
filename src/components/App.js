/* eslint-disable import/no-named-as-default */
import React from "react";
import PropTypes from "prop-types";
import { Switch, NavLink, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import LoginPage from "./Login";

import ProductPage from "./containers/product/ProductPage";
import PricePage from "./containers/price/PricePage";
import PurchaseOrderPage from "./containers/purchase_order/PurchaseOrderPage";
import UserPage from "./containers/user/UserPage";
import { Menu } from "semantic-ui-react";


class MainMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const role = localStorage.getItem("user_type");
    if (role === "admin") {
      return (
        <Menu>
          <NavLink exact to="/">
            <Menu.Item
              name="home"
              active={this.props.activeItem === "home"}
              onClick={this.props.handleItemClick}
            >
              หน้าหลัก
            </Menu.Item>{" "}
          </NavLink>
          <NavLink to="/po">
            <Menu.Item
              name="po"
              active={this.props.activeItem === "po"}
              onClick={this.props.handleItemClick}
            >
              ใบสั่งซื้อ
            </Menu.Item>
          </NavLink>
          <NavLink to="/product">
            <Menu.Item
              name="product"
              active={this.props.activeItem === "product"}
              onClick={this.props.handleItemClick}
            >
              สินค้า
            </Menu.Item>
          </NavLink>
          <NavLink to="/price">
            <Menu.Item
              name="price"
              active={this.props.activeItem === "price"}
              onClick={this.props.handleItemClick}
            >
              ราคา
          </Menu.Item>
          </NavLink>
          <NavLink to="/user">
            <Menu.Item
              name="user"
              active={this.props.activeItem === "user"}
              onClick={this.props.handleItemClick}
            >
              จัดการผู้ใช้
          </Menu.Item>
          </NavLink>
          <Menu.Menu position='right'>
            <Menu.Item header>ผู้ใช้:  {localStorage.getItem("user_name")}</Menu.Item>
            <Menu.Item header>สาขา:  {localStorage.getItem("branch_name")}</Menu.Item>
            <Menu.Item
              name='ออกจากระบบ'
              active={this.props.activeItem === 'logout'}
              onClick={this.props.logout.bind(this)}
            />
          </Menu.Menu>
        </Menu>
      );
    } else if (role === "manager") {
      return (
        <Menu>
          <NavLink exact to="/">
            <Menu.Item
              name="home"
              active={this.props.activeItem === "home"}
              onClick={this.props.handleItemClick}
            >
              หน้าหลัก
        </Menu.Item>{" "}
          </NavLink>
          <NavLink to="/po">
            <Menu.Item
              name="po"
              active={this.props.activeItem === "po"}
              onClick={this.props.handleItemClick}
            >
              ใบสั่งซื้อ
        </Menu.Item>
          </NavLink>
          <NavLink to="/product">
            <Menu.Item
              name="product"
              active={this.props.activeItem === "product"}
              onClick={this.props.handleItemClick}
            >
              สินค้า
        </Menu.Item>
          </NavLink>
          <NavLink to="/price">
            <Menu.Item
              name="price"
              active={this.props.activeItem === "price"}
              onClick={this.props.handleItemClick}
            >
              ราคา
          </Menu.Item>
          </NavLink>
          <Menu.Menu position='right'>
            <Menu.Item header>ผู้ใช้:  {localStorage.getItem("user_name")}</Menu.Item>
            <Menu.Item header>สาขา:  {localStorage.getItem("branch_name")}</Menu.Item>
            <Menu.Item
              name='ออกจากระบบ'
              active={this.props.activeItem === 'logout'}
              onClick={this.props.logout.bind(this)}
            />
          </Menu.Menu>
        </Menu>
      )
    } else if (role === "po_manager") {
      return (
        <Menu>
          <NavLink exact to="/">
            <Menu.Item
              name="home"
              active={this.props.activeItem === "home"}
              onClick={this.props.handleItemClick}
            >
              หน้าหลัก
        </Menu.Item>{" "}
          </NavLink>
          <NavLink to="/po">
            <Menu.Item
              name="po"
              active={this.props.activeItem === "po"}
              onClick={this.props.handleItemClick}
            >
              ใบสั่งซื้อ
        </Menu.Item>
          </NavLink>
          <Menu.Menu position='right'>
            <Menu.Item header>ผู้ใช้:  {localStorage.getItem("user_name")}</Menu.Item>
            <Menu.Item header>สาขา:  {localStorage.getItem("branch_name")}</Menu.Item>
            <Menu.Item
              name='ออกจากระบบ'
              active={this.props.activeItem === 'logout'}
              onClick={this.props.logout.bind(this)}
            />
          </Menu.Menu>
        </Menu>
      )
    } else if (role === "product_manager") {
      return (
        <Menu>
          <NavLink exact to="/">
            <Menu.Item
              name="home"
              active={this.props.activeItem === "home"}
              onClick={this.props.handleItemClick}
            >
              หน้าหลัก
        </Menu.Item>{" "}
          </NavLink>
          <NavLink to="/product">
            <Menu.Item
              name="product"
              active={this.props.activeItem === "product"}
              onClick={this.props.handleItemClick}
            >
              สินค้า
        </Menu.Item>
          </NavLink>
          <NavLink to="/price">
            <Menu.Item
              name="price"
              active={this.props.activeItem === "price"}
              onClick={this.props.handleItemClick}
            >
              ราคา
          </Menu.Item>
          </NavLink>
          <Menu.Menu position='right'>
            <Menu.Item header>ผู้ใช้:  {localStorage.getItem("user_name")}</Menu.Item>
            <Menu.Item header>สาขา:  {localStorage.getItem("branch_name")}</Menu.Item>
            <Menu.Item
              name='ออกจากระบบ'
              active={this.props.activeItem === 'logout'}
              onClick={this.props.logout.bind(this)}
            />
          </Menu.Menu>
        </Menu>
      )
    } else if (role === "po_viewer") {
      return (
        <Menu>
          <NavLink exact to="/">
            <Menu.Item
              name="home"
              active={this.props.activeItem === "home"}
              onClick={this.props.handleItemClick}
            >
              หน้าหลัก
        </Menu.Item>{" "}
          </NavLink>
          <NavLink to="/po">
            <Menu.Item
              name="po"
              active={this.props.activeItem === "po"}
              onClick={this.props.handleItemClick}
            >
              ใบสั่งซื้อ
        </Menu.Item>
          </NavLink>
          <Menu.Menu position='right'>
            <Menu.Item header>ผู้ใช้:  {localStorage.getItem("user_name")}</Menu.Item>
            <Menu.Item header>สาขา:  {localStorage.getItem("branch_name")}</Menu.Item>
            <Menu.Item
              name='ออกจากระบบ'
              active={this.props.activeItem === 'logout'}
              onClick={this.props.logout.bind(this)}
            />
          </Menu.Menu>
        </Menu>
      )
    }
    else {
      return (<span></span>);
    }
  }
}

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

  logout = () => {
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
          <MainMenu activeItem={activeItem} handleItemClick={this.handleItemClick} logout={this.logout} />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/po" component={PurchaseOrderPage} />
            <Route path="/po/detail/:po_number" component={PurchaseOrderPage} />
            <Route path="/product" component={ProductPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/user" component={UserPage} />
            <Route path="/price" component={PricePage} />
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
