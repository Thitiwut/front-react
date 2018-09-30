import React from 'react';
import {connect} from 'react-redux';

import { Icon, Form , Table , Dropdown, Button, Segment } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import { ProductService } from '../../../services/api/ProductService';
import { SupplierService } from '../../../services/api/SupplierService';
import { BranchService } from '../../../services/api/BranchService';
import { PurchaseOrderService } from '../../../services/api/PurchaseOrderService';
import { FeedService } from '../../../services/api/FeedService';

export class NewPurchaseOrder extends React.Component {

  constructor(props) {
    super(props);
    this._productService = new ProductService();
    this._supplierService = new SupplierService();
    this._branchService = new BranchService();
    this._purchaseOrderService = new PurchaseOrderService();
    this._feedService = new FeedService();
    this.state = {
      PODetail: {date: "-", po_number: "-", supplier: "-", order_date: "-", delivery_date: "-", branch: "-"},
      POProduct: [],
      //
      branch_selection: null,
      supplier_selection: null,
      product_selection: null,
      productData: null,
      po_number: null,
      supplier: null,
      selected_supplier_name: null,
      order_date: moment(),
      delivery_date: moment(),
      delivery_branch: null,
      delivery_branch_number: 0,
      delivery_branch_name: null,
      product_name: null,
      product_id: null,
      amount: '',
      price: '',
    };
  }

  componentDidMount() {
    this.getSuppliers();
    this.getBranch();
  }

  handleConfirmAddingPO(){
    if(this.state.PODetail.po_number == "-" || this.state.POProduct.length == 0 ){
      alert("ใบสั่งซื้อยังไม่สมบูรณ์");
    }else{
      this.addNewPurchaseOrder();
    }
  }

  handleSubmitPO(event) {
    this.setState({
      PODetail: {
        date: moment().format('DD/MM/YYYY'),
        po_number: this.state.delivery_branch_number+'.'+this.state.po_number,
        supplier: this.state.selected_supplier_name,
        order_date: this.state.order_date.format('DD/MM/YYYY'),
        delivery_date: this.state.delivery_date.format('DD/MM/YYYY'),
        branch: this.state.delivery_branch_name
      }
    });
  }

  handleSubmitProduct(event) {
    let ProductObject = {
      product_id: this.state.product_id, 
      product_name: this.state.product_name, 
      product_number: this.state.product_id, 
      amount: this.state.amount, 
      price: this.state.price
    }
    let POProduct = this.state.POProduct;
    POProduct.push(ProductObject);

    this.setState({
      POProduct: POProduct
    });
  }

  handleInputChange(event, data) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [data.name]: data.value
    });

    if(data.name == "supplier"){
      let targetSupplier = this.state.supplier_selection.filter(function( supplier ) {
        return supplier.value == data.value;
      });

      this.setState({
        selected_supplier_name: targetSupplier[0].text
      });
      this.getProducts(data.value);
    }

    if(data.name == "delivery_branch"){
      let branch_number = data.options[data.value-1].key;
      let branch_name = data.options[data.value-1].text;
      this.setState({
        delivery_branch_number: branch_number,
        delivery_branch_name: branch_name
      });
    }

    if(data.name == "product"){
      let targetProduct = this.state.productData.filter(function( product ) {
        return product.product_id == data.value;
      });
      this.setState({
        price: targetProduct[0].product_price,
        product_name: targetProduct[0].product_name,
        product_id: targetProduct[0].product_id,
      });
    }
  }

  handleDateChange(date, event, target){
    this.setState({
      [target]: date
    });
  }

  handleDeleteProduct(event, data, index){
    let POProductUpdate = this.state.POProduct;
    POProductUpdate.splice(index, 1);
    this.setState({
      POProduct: POProductUpdate
    });
  }

  turnProductDataToSelection(productData){
    let normalizedProductData = [];
    {_.map(productData, ({ product_id, product_name }) => (
      normalizedProductData.push({ key: product_id, text: product_name, value: product_id })
    ))};

    return normalizedProductData;
  }
  
  //Service Call

  addNewPurchaseOrder(){
    let inserted_po_id = null;
    let promise = this._purchaseOrderService.newPurchaseOrder(
      +this.state.po_number, this.state.supplier, this.state.delivery_branch ,
        this.state.order_date.format('YYYY-MM-DD'), this.state.delivery_date.format('YYYY-MM-DD'),
          "รอการจัดส่ง", localStorage.getItem("user_name")
      );

    promise.then(function (response){
    inserted_po_id = response.data.inserted_id;
    let status = response.data.status;
    }).then(function (){
      if(inserted_po_id != null){
        let response = this._purchaseOrderService.addPurchaseOrderProduct(this.state.POProduct, inserted_po_id);
        console.log(response);
        alert("ใบสั่งซื้อถูกเพิ่ม สำเร็จ!");
      }
    }.bind(this))
    .then( () => {
      this._feedService.addFeed("po_added", this.state.delivery_branch_number+'.'+this.state.po_number, "", "");
    });
  }

  getSuppliers(){
    let supplier_options_json = new Array();
    let promise = this._supplierService.getSupplier();
    promise.then(function (response){
      {_.map(response.data, ({ supplier_id, supplier_name }) => (
        supplier_options_json.push({ key: supplier_id, text: supplier_name, value: supplier_id })
      ))};
      this.setState({
        supplier_selection: supplier_options_json
      });
    }.bind(this));
  }
  
  getProducts(supplier_id){
    let promise = this._productService.getProducts(supplier_id);
    promise.then(function (response){
      this.setState({
        productData: response.data,
        product_selection: this.turnProductDataToSelection(response.data)
      });
    }.bind(this));
  } 

  getBranch(){
    let branch_options_json = new Array();
    let promise = this._branchService.getBranch();
    promise.then(function (response){
      {_.map(response.data, ({ branch_id, branch_name, branch_number }) => (
        branch_options_json.push({ key: branch_number, text: (branch_name + ' : ' + branch_number), value: branch_id })
      ))};
      this.setState({
        branch_selection: branch_options_json
      });
    }.bind(this));
  }

  render() {
    const { POProduct } = this.state

    return (
      <div>
      <Form class="ui form" onSubmit={(e) => this.handleSubmitPO(e)}>
        <div class="field">
        <Form.Group>
          <Form.Input required  label='เลขที่ PO' placeholder='-' name='po_number' onChange={(e,d) => this.handleInputChange(e,d)} />
          <Form.Select required label='Supplier' options={this.state.supplier_selection} placeholder='-' name='supplier' onChange={(e,d) => this.handleInputChange(e,d)} />
        </Form.Group>
        </div>
        <div class="field">
          <div class="ui left labeled input">
          <div class="ui basic label label">วันที่สั่ง</div>
          <DatePicker name='order_date'
          selected={this.state.order_date}
          dateFormat="YYYY/MM/DD"
          onChange={(e,d) => this.handleDateChange(e,d,"order_date")}
          />
          <div class="ui basic label label">วันที่ส่ง</div>
          <DatePicker name='delivery_date'
          selected={this.state.delivery_date}
          dateFormat="YYYY/MM/DD"
          onChange={(e,d) => this.handleDateChange(e,d,"delivery_date")}
          />
          </div>
        </div>
        <div class="field">
          <Form.Group>
          <Form.Select required  search noResultsMessage='ไม่พบสาขา' label='สาขาที่ส่ง' options={this.state.branch_selection} placeholder='-' name='delivery_branch' onChange={(e,d) => this.handleInputChange(e,d)} />
          </Form.Group>
        </div>
        <div class="field">
        <Form.Button role="button" >เพิ่มข้อมูลใบสั่งซื้อ</Form.Button>
        </div><br></br>
      </Form>
      <Form class="ui form" onSubmit={(e) => this.handleSubmitProduct(e)}>
        <div class="field">
          <Form.Group>
          <Form.Select required  label='เลือกสินค้า' options={this.state.product_selection} placeholder='-' name='product' onChange={(e,d) => this.handleInputChange(e,d)} />
          <Form.Input required  label='จำนวน' placeholder='-' name='amount' onChange={(e,d) => this.handleInputChange(e,d)} />
          <Form.Input required  label='ราคา' value={this.state.price} placeholder='-' name='price' onChange={(e,d) => this.handleInputChange(e,d)} />
          </Form.Group>
        </div>
        <Form.Button role="button" >เพิ่มสินค้า</Form.Button>
      </Form>
      <h3>ตารางสรุปใบสั่งซื้อ</h3>
      <Table celled>
      <Table.Header>
          <Table.Row>
            <Table.HeaderCell >
              D/M/Y
            </Table.HeaderCell>
            <Table.HeaderCell >
              เลขที่ PO
            </Table.HeaderCell>
            <Table.HeaderCell >
              Supplier
            </Table.HeaderCell>
            <Table.HeaderCell >
              วันที่สั่งซื้อ
            </Table.HeaderCell>
            <Table.HeaderCell >
              วันที่ส่งของ
            </Table.HeaderCell>
            <Table.HeaderCell >
              สาขาที่ส่ง
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row>
              <Table.Cell>{this.state.PODetail.date}</Table.Cell>
              <Table.Cell>{this.state.PODetail.po_number}</Table.Cell>
              <Table.Cell>{this.state.PODetail.supplier}</Table.Cell>
              <Table.Cell>{this.state.PODetail.order_date}</Table.Cell>
              <Table.Cell>{this.state.PODetail.delivery_date}</Table.Cell>
              <Table.Cell>{this.state.PODetail.branch}</Table.Cell>
            </Table.Row>
        </Table.Body>
      </Table>
      <Table celled fixed>
      <Table.Header>
          <Table.Row>
            <Table.HeaderCell >
              สินค้า
            </Table.HeaderCell>
            <Table.HeaderCell >
              รหัสสินค้า
            </Table.HeaderCell>
            <Table.HeaderCell >
              จำนวน
            </Table.HeaderCell>
            <Table.HeaderCell >
              ราคา (บาท)
            </Table.HeaderCell>
            <Table.HeaderCell width={1}>
            
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {_.map(POProduct, ({ product_id, product_name, product_number, amount, price }, index) => (
            <Table.Row key={product_id} >
              <Table.Cell>{product_name}</Table.Cell>
              <Table.Cell>{product_number}</Table.Cell>
              <Table.Cell>{amount}</Table.Cell>
              <Table.Cell>{price*amount} ({price}/หน่วย)</Table.Cell>
              <Table.Cell><Icon link name='close' onClick={(e,d) => this.handleDeleteProduct(e,d,index)}/></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button primary onClick={this.handleConfirmAddingPO.bind(this)}>เพิ่มใบสั่งซื้อ</Button>
      </div>
    );
  }
}

export default connect(
)(NewPurchaseOrder);
