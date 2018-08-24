import React from 'react';
import { connect } from 'react-redux';
import { Switch, NavLink, Route } from "react-router-dom";

import { NewPurchaseOrder } from './NewPurchaseOrder';
import { SearchPurchaseOrder } from './SearchPurchaseOrder';
import { DeliveryPurchaseOrder } from './DeliveryPurchaseOrder';
import { SearchPurchaseOrderDetail } from './SearchPurchaseOrderDetail';

import { Menu, Segment } from 'semantic-ui-react'

class POMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const role = localStorage.getItem("user_type");
    if (role === "admin" || role === "po_manager" || role === "manager") {
      return (
        <Menu pointing secondary>
          <NavLink exact to="/po/searchpo">
            <Menu.Item name='ค้นหาใบสั่งซื้อ' active={this.props.activeItem === 'ค้นหาใบสั่งซื้อ'} onClick={this.props.handlePanelClick} />
          </NavLink>
          <NavLink exact to="/po/addpo">
            <Menu.Item name='เพิ่มใบสั่งซื้อ' active={this.props.activeItem === 'เพิ่มใบสั่งซื้อ'} onClick={this.props.handlePanelClick} />
          </NavLink>
        </Menu>
      )
    } else {
      return (
        <Menu pointing secondary>
          <NavLink exact to="/po/searchpo">
            <Menu.Item name='ค้นหาใบสั่งซื้อ' active={this.props.activeItem === 'ค้นหาใบสั่งซื้อ'} onClick={this.props.handlePanelClick} />
          </NavLink>
        </Menu>
      )
    }
  }
}

export class PurchaseOrderPage extends React.Component {
  state = { activeItem: null }

  handlePanelClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state
    return (
      <div>
        <h2 className="alt-header">ใบสั่งซื้อสินค้า (PO)</h2>
        <POMenu activeItem={activeItem} handlePanelClick={this.handlePanelClick} />
        <Switch>
          <Route path="/po/searchpo" component={SearchPurchaseOrder} />
          <Route path="/po/addpo" component={NewPurchaseOrder} />
          <Route path="/po/delivery" component={DeliveryPurchaseOrder} />
          <Route path="/po/detail/:number" component={SearchPurchaseOrderDetail} />} />
      </Switch>
      </div>
    );
  }
}

export default connect(
)(PurchaseOrderPage);
