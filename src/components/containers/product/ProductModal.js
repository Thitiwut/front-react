import React from 'react';
import {connect} from 'react-redux';

import { Header, Modal , Button, Form , Label, Message} from 'semantic-ui-react';
import { ProductService } from '../../../services/api/ProductService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

export class ProductModal extends React.Component {
    constructor(props){
    super(props);
    this._productService = new ProductService();
    this.state = {
      modalOpen: false,
      product_id: props.product_id,
      product_name: null,
      product_number: null,
      product_type: null,
      product_price: null,
      supplier: null,
      supplier_id: null,
      //Pricing State
      date: moment(),
      new_price: 0,
    };
  }

    state = { 
    modalOpen: false,
    product_id: null,
    product_name: null,
    product_number: null,
    product_type: null,
    product_price: null,
  }

  handleDateChange(date){
    this.setState({
      date: date
    });
  }

  handleOpen(product, supplier, supplier_id){
    console.log(supplier);
    this.setState({ 
      modalOpen: true,
      product_id: product.product_id,
      product_name: product.product_name,
      product_number: product.product_number,
      product_type: product.product_type,
      product_price: product.product_price,
      supplier: supplier,
      supplier_id: supplier_id
    })
  }

  handleClose = () => { 
    this.setState({ modalOpen: false });
  }

  handleInputChange(event, data) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [data.name]: data.value
    });
  }

  //Service Calls
  handlePricing(){
    let promise = this._productService.setProductPrice(
      this.state.product_id, this.state.supplier_id, this.state.date.format("YYYYMMDD"), parseFloat(this.state.new_price).toFixed(2)
      );
    promise.then(function (response) {
      console.log(response.data);
      this.setState({
        product_price: this.state.new_price,
      })
      alert("ปรับราคาใช้แล้ว !");
    }.bind(this));
    this.props.updateProducts;
  }

  handleEditProductName(){
    let promise = this._productService.editProduct(
      this.state.product_id, this.state.product_name.trim()
      );
    promise.then(function (response) {
      console.log(response.data);
      alert("ชื่อสินค้าถูกแก้ไขแล้ว !");
    }.bind(this));
  }



  render() {
    const { product_id, product_name, product_number, product_type, product_price , supplier} = this.state;

    //--styling classes
    const pricingCon = {
      'paddingTop': '10px'
    };

    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeOnDimmerClick={false}
        closeIcon
        >
      <Modal.Header>ข้อมูลสินค้า - หมายเลข {product_number}
      </Modal.Header>
      <Modal.Content>
      <Modal.Description>
        <Message compact>
        <Message.Header>
      Supplier: {supplier}
        </Message.Header>
  </Message>
      <Form onSubmit={(e) => this.handleEditProductName(e)}>
        <Form.Group unstackable widths={2}>
          <Form.Input defaultValue={product_name} name='product_name' label='ชื่อสินค้า' onChange={(e,d) => this.handleInputChange(e,d)}/>
        </Form.Group>
        <Button role="button">แก้ไขชื่อสินค้า</Button>
      </Form>
      <div class="ui divider">
      </div>
      <h3>ราคา</h3>
      ราคาใช้ปัจจุบัน <Label size="big" tag>{product_price} บาท</Label>
      <div style={pricingCon} ><h3>ตั้งราคาใช้ใหม่</h3>
        <Form onSubmit={(e) => this.handlePricing(e)}>
        <Form.Group widths='equal'>
          <div class="ui right labeled input">
          <Form.Input required name='new_price' type="text" placeholder="ราคา..." onChange={(e,d) => this.handleInputChange(e,d)} />
          <div class="ui basic label label">บาท</div>
          <DatePicker name='date'
          selected={this.state.date}
          dateFormat="YYYY/MM/DD"
          onChange={(e,d) => this.handleDateChange(e,d)}
          /><div class="ui basic label label">วันที่ใช้ราคา</div>
          </div>
        </Form.Group>
          <Button role="button">ปรับราคา</Button>
        </Form>
      </div>
      </Modal.Description>
      </Modal.Content>
  </Modal>
    );
  }
}

export default connect(
)(ProductModal);
