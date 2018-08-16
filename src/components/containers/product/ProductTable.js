import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';

import { Table , Dropdown } from 'semantic-ui-react';

import { ProductModal } from './ProductModal';
import { ProductService } from '../../../services/api/ProductService';
import { SupplierService } from '../../../services/api/SupplierService';

export class ProductTable extends React.Component {

  constructor(props) {
    super(props);
    this._productService = new ProductService();
    this._supplierService = new SupplierService();
    this.state = {
      column: null,
      productData: [],
      supplierData: [],
      direction: null,
      selected_supplier: "เลือก Supplier",
      selected_suplier_id: null
    };
  }

  componentDidMount() {
    this.getSuppliers();
  }

  handleSort = clickedColumn => () => {
    const { column, productData, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        productData: _.sortBy(productData, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      productData: productData.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  handleRowClick = row_productData => () => {
    const { productData, selected_supplier, selected_suplier_id } = this.state
    this.refs.productModal.handleOpen(row_productData, selected_supplier, selected_suplier_id);
  }

  handleSupplierSelect(event, data){
    this.setState({
      selected_supplier: event.target.innerText,
      selected_suplier_id: data.value
    });
    this.getProducts(data.value);
  }

  //Service Calls
  getSuppliers(){
      let supplier_options_json = new Array();
      let promise = this._supplierService.getSupplier();
      promise.then(function (response){
        {_.map(response.data, ({ supplier_id, supplier_name }) => (
          supplier_options_json.push({ key: supplier_id, text: supplier_name, value: supplier_id })
        ))};
        this.setState({
          supplierData: supplier_options_json
        });
      }.bind(this));
  }

  getProducts(supplier_id){
      let promise = this._productService.getProducts(supplier_id);
      promise.then(function (response){
        this.setState({
          productData: response.data
        });
      }.bind(this));
  }

  childUpdatePriceHandler(){
    this.getProducts(this.state.selected_suplier_id);
  }

  render() {
    const { column, productData, supplierData, direction, selected_supplier} = this.state

    return (
    <div> 
    <ProductModal updateProducts={this.childUpdatePriceHandler.bind(this)} ref="productModal"/>
    <Dropdown placeholder={selected_supplier} search selection options={supplierData} onChange={(e, data) => this.handleSupplierSelect(e, data)} />
    <Table sortable celled selectable>
    <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted={column === 'product_number' ? direction : null} onClick={this.handleSort('product_number')}>
              รหัสสินค้า
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'product_name' ? direction : null} onClick={this.handleSort('product_name')}>
              สินค้า
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'product_type' ? direction : null} onClick={this.handleSort('product_type')}>
              ชนิด
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'product_price' ? direction : null} onClick={this.handleSort('product_price')}>
              ราคาใช้ปัจจุบัน
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(productData, ({ product_id, product_number, product_name, product_type, product_price }) => (
            <Table.Row key={product_id} onClick={this.handleRowClick( { product_id, product_number, product_name, product_type, product_price, } )}>
              <Table.Cell>{product_id}</Table.Cell>
              <Table.Cell>{product_name}</Table.Cell>
              <Table.Cell>{product_type}</Table.Cell>
              <Table.Cell>{product_price}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
    </Table>
    </div>
    );
  }
}

export default connect(
)(ProductTable);
