import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';

import { Table , Dropdown } from 'semantic-ui-react';

import { ProductModal } from './ProductModal';

//PRODUCTS MOCKUP
const productList = [
  {"product_id":1,"product_name":"ส้มสายน้ำผึ้ง#84","product_type":"Regular","product_number":"175474","product_price":100.0},
  {"product_id":2,"product_name":"ส้มสายน้ำผึ้ง#72","product_type":"Regular","product_number":"205474","product_price":34.0},
  {"product_id":3,"product_name":"ส้มสายน้ำผึ้ง#105","product_type":"Regular","product_number":"155474","product_price":54.0}
]

//SUPPLIER MOCKUP
const suppliers = [
  { key: '27781', text: 'นลินี', value: '27781' },
  { key: '31049', text: 'bbb fresh foods', value: '31049' },
  { key: '31048', text: 'bbb direct', value: '31048' },
  { key: '31781', text: 'ทัศพงษ์', value: '31781' }
];

export class ProductTable extends React.Component {
  state = {
    column: null,
    data: productList,
    direction: null,
    selected_supplier: "เลือก Supplier",
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  handleRowClick = row_data => () => {
    const { data, selected_supplier } = this.state
    this.refs.productModal.handleOpen(row_data, selected_supplier);
  }

  handleSupplierSelect(event){
    this.setState({
      selected_supplier: event.target.innerText,
    })
  }

  render() {
    const { column, data, direction, selected_supplier } = this.state

    return (
    <div> 
    <ProductModal ref="productModal"/>
    <Dropdown placeholder={selected_supplier} search selection options={suppliers} onChange={(e) => this.handleSupplierSelect(e)} />
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
          {_.map(data, ({ product_id, product_number, product_name, product_type, product_price }) => (
            <Table.Row key={product_id} onClick={this.handleRowClick( { product_id, product_number, product_name, product_type, product_price, } )}>
              <Table.Cell>{product_number}</Table.Cell>
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
