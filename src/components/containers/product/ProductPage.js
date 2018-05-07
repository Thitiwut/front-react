import React from 'react';
import {connect} from 'react-redux';
import { AddProductForm } from './AddProductForm';
import { ProductTable } from './ProductTable';

export class ProductPage extends React.Component {

  render() {
    return (
      <div>
      <h2 className="alt-header">สินค้า</h2>
      <AddProductForm
      />
      <h3>รายการสินค้า</h3>
      <ProductTable
      />
    </div>
    );
  }
}

export default connect(
)(ProductPage);
