import React from 'react';
import {connect} from 'react-redux';
import { Switch, NavLink, Route } from "react-router-dom";

import { NewPurchaseOrder } from './NewPurchaseOrder';
import { SearchPurchaseOrder } from './SearchPurchaseOrder';
import { DeliveryPurchaseOrder } from './DeliveryPurchaseOrder';
import { Menu, Segment } from 'semantic-ui-react'

export class PurchaseOrderPage extends React.Component {
  state = { activeItem: 'ค้นหาใบสั่งซื้อ' }

  handlePanelClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state
    return (
      <div>
      <h2 className="alt-header">ใบสั่งซื้อสินค้า (PO)</h2>
      <Menu pointing secondary>
          <NavLink exact to="/po/searchpo">
            <Menu.Item name='ค้นหาใบสั่งซื้อ' active={activeItem === 'ค้นหาใบสั่งซื้อ'} onClick={this.handlePanelClick} />
          </NavLink>
          <NavLink exact to="/po/addpo">
            <Menu.Item name='เพิ่มใบสั่งซื้อ' active={activeItem === 'เพิ่มใบสั่งซื้อ'} onClick={this.handlePanelClick} />
          </NavLink>
          <NavLink exact to="/po/delivery">
            <Menu.Item name='จัดการการส่ง' active={activeItem === 'จัดการการส่ง'} onClick={this.handlePanelClick} />
          </NavLink>
      </Menu>
      <Switch>
          <Route path="/po" component={SearchPurchaseOrder} />
          <Route path="/po/searchpo" component={SearchPurchaseOrder} />
          <Route path="/po/addpo" component={NewPurchaseOrder} />
          <Route path="/po/delivery" component={DeliveryPurchaseOrder} />
      </Switch>
      </div>
    );
  }
}

export default connect(
)(PurchaseOrderPage);
