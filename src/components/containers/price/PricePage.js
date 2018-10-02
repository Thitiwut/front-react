import React from 'react';
import {connect} from 'react-redux';
import { ProductPriceTable } from './ProductPriceTable';

import { Button, Feed, Icon, Divider } from "semantic-ui-react";


export class PricePage extends React.Component {

  render() {
    return (
      <div>
      <h2 className="alt-header">จัดการราคาสินค้า</h2>
      <h3>รายการสินค้า</h3>
      <ProductPriceTable></ProductPriceTable>
    </div>
    );
  }
}

export default connect(
)(PricePage);
