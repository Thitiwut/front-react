import React from 'react';
import {connect} from 'react-redux';

import { Form } from 'semantic-ui-react';
import { ProductService } from '../../../services/api/ProductService';
import { SupplierService } from '../../../services/api/SupplierService';

const productType = [
  { key: '1', text: 'regular', value: 'regular' }
];
export class AddProductForm extends React.Component {

  constructor(props) {
    super(props);
    this._productService = new ProductService();
    this._supplierService = new SupplierService();
    this.state = {
      supplier: 0,
      product_name: "",
      product_type: "",
      supplierData: [],
    };
  }

  componentDidMount() {
    this.getSuppliers();
  }

  handleInputChange(event, data) {
    this.setState({
      [data.name]: data.value
    });
  }

  handleSubmit() {
    this.addProduct();
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

  addProduct(){
    let promise = this._productService.addProduct(
      this.state.product_name, this.state.product_type, this.state.supplier
      );
    promise.then(function (response) {
      console.log(response.data);
      alert("Product Added !");
    }.bind(this));
  }

  render() {
    const { product_name, product_type, supplier, supplierData } = this.state
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)}>
        <Form.Group widths='equal'>
          <Form.Input required fluid label='ชื่อสินค้า' placeholder='-' name='product_name' onChange={(e,d) => this.handleInputChange(e,d)} />
          <Form.Select required fluid label='ชนิดสินค้า' options={productType} placeholder='-' name='product_type' onChange={(e,d) => this.handleInputChange(e,d)} />
          <Form.Select required fluid label='Supplier' options={supplierData} placeholder='-' name='supplier' onChange={(e,d) => this.handleInputChange(e,d)} />
        </Form.Group>
        <Form.Button role="button" >เพิ่มสินค้า</Form.Button>
      </Form>
    );
  }
}

export default connect(
)(AddProductForm);
