import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';

import { Table , Dropdown, Input, Button } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import { ProductService } from '../../../services/api/ProductService';
import { SupplierService } from '../../../services/api/SupplierService';


export class ProductPriceTable extends React.Component {

  constructor(props) {
    super(props);
    this._productService = new ProductService();
    this._supplierService = new SupplierService();
    this.state = {
      column: null,
      productData: [],
      supplierData: [],
      productPricingData: [],
      direction: null,
      selected_supplier: "เลือก Supplier",
      selected_suplier_id: null,
      defaultDate: moment(),
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

  handleSupplierSelect(event, data){
    this.setState({
      selected_supplier: event.target.innerText,
      selected_suplier_id: data.value
    });
    this.getProducts(data.value);
  }

  handleDateChange(date, e, product_id){
    let productPricingData = this.state.productPricingData
    let targetProduct = productPricingData.find(( product ) => {
      return product.product_id == product_id;
    });
    if(targetProduct){
      targetProduct.active_date = date;
    }
    this.setState({
      productPricingData: productPricingData
    })
  }
  
  handlePriceChange(event, data, product_id){
    let productPricingData = this.state.productPricingData
    let targetProduct = productPricingData.find(( product ) => {
      return product.product_id == product_id;
    });
    if(targetProduct){
      targetProduct.price = data.value;
    }
    this.setState({
      productPricingData: productPricingData
    })
    console.log(this.state.productPricingData)
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
        this.createProductPricingData(response.data, supplier_id)
      }.bind(this));
  }

  childUpdatePriceHandler(){
    this.getProducts(this.state.selected_suplier_id);
  }

  createProductPricingData(product_data, supplier_id){
    let productPricingData = []
    product_data.forEach(product => {
      let productPricing = {
        product_id: null,
        supplier_id: supplier_id,
        active_date: null,
        price: null,
      }
      productPricing.product_id = product.product_id
      productPricing.active_date = moment()
      productPricing.price = product.product_price
      productPricingData.push(productPricing)
    });
    this.setState({
      productPricingData: productPricingData
    });
  }

  getActiveDateByProduct(product_id){
    let targetProduct = this.state.productPricingData.find( (product) => { return product.product_id == product_id })
    if(targetProduct){
      return targetProduct.active_date
    }
  }

  submitAllPrice(){
    let promises = [];
    this.state.productPricingData.forEach(product => {
        const promise = this._productService.setProductPrice(
          product.product_id, product.supplier_id, product.active_date.format("YYYY-MM-DD HH:mm:ss"), parseFloat(product.price).toFixed(2)
          );
        promises.push(promise)
        promise.then((response) => {
          console.log(" Done with -> " + response.data.status);
        })
    });

    Promise.all(promises).then( () => {
      this.getProducts(this.state.selected_suplier_id)
      alert("ปรับราคาเสร็จสิ้น ราคาทั้งหมดจะถูกปรับโดยอัตโนมัติตามวันที่ตั้งไว้")
    })
  }

  render() {
    const { column, productData, supplierData, direction, selected_supplier} = this.state

    const positionSubmitBtn = {
      'float': 'right'
    };

    return (
    <div> 
    <Dropdown placeholder={selected_supplier} search selection options={supplierData} onChange={(e, data) => this.handleSupplierSelect(e, data)} />
    <Button style={positionSubmitBtn} primary onClick={() => this.submitAllPrice()} >ปรับราคาทั้งหมด</Button>
    <Table sortable celled selectable>
    <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} sorted={column === 'product_number' ? direction : null} onClick={this.handleSort('product_number')}>
              รหัสสินค้า
            </Table.HeaderCell>
            <Table.HeaderCell width={4} sorted={column === 'product_name' ? direction : null} onClick={this.handleSort('product_name')}>
              สินค้า
            </Table.HeaderCell>
            <Table.HeaderCell width={3} sorted={column === 'product_type' ? direction : null} onClick={this.handleSort('product_type')}>
              ราคาใช้ปัจจุบัน
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'product_price' ? direction : null} onClick={this.handleSort('product_price')}>
              ตั้งราคาใหม่
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(productData, ({ product_id, product_number, product_name, product_type, product_price }, index) => (
            <Table.Row key={product_id} >
              <Table.Cell>{product_id}</Table.Cell>
              <Table.Cell>{product_name}</Table.Cell>
              <Table.Cell>{product_price}</Table.Cell>
              <Table.Cell>
                <Input placeholder='ราคาใหม่' defaultValue={product_price} onChange={(e, d) => this.handlePriceChange(e, d, product_id)} />
                <div class="ui right labeled input">

                <DatePicker name='date'
                selected={this.state.productPricingData[index].active_date}
                dateFormat="YYYY/MM/DD"
                onChange={(e,d) => this.handleDateChange(e,d, product_id)}
              /><div class="ui basic label label">วันที่ใช้ราคา</div></div></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
    </Table>
    </div>
    );
  }
}

export default connect(
)(ProductPriceTable);
