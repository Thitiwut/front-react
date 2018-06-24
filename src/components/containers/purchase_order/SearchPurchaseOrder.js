import React from 'react';
import { connect } from 'react-redux';
import { Switch, NavLink, Route } from "react-router-dom";
import { Dropdown, Button, Icon, Label, Form, Table, Input, Search, Grid, Header, options, Breadcrumb } from 'semantic-ui-react';
import moment from 'moment';

import { SearchPurchaseOrderTable } from './SearchPurchaseOrderTable';

import { PurchaseOrderService } from '../../../services/api/PurchaseOrderService';
import { SupplierService } from '../../../services/api/SupplierService';
import { BranchService } from '../../../services/api/BranchService';

const delivery_options = [
  { key: 'n/a', text: '-', value: 0 },
  { key: 's', text: 'ยกเลิก', value: 's', label: { color: 'red', empty: true, circular: true } },
  { key: 'm', text: 'รอการจัดส่ง', value: 'm', label: { color: 'blue', empty: true, circular: true } },
  { key: 'l', text: 'จัดส่งแล้ว', value: 'l', label: { color: 'black', empty: true, circular: true } },
]

const MOCK_PODetail = [
  {
    po_number: "11114", supplier: "สมศรี", order_date: "10/10/2018", delivery_date: "11/10/2018", branch: "901", status: "ยกเลิก"
    , POProduct: []
  },
  {
    po_number: "11115", supplier: "สมศรี", order_date: "12/10/2018", delivery_date: "11/10/2018", branch: "902", status: "ยกเลิก"
    , POProduct: []
  }
]

export class SearchPurchaseOrder extends React.Component {

  constructor(props) {
    super(props);
    this._purchaseOrderService = new PurchaseOrderService();
    this._supplierService = new SupplierService();
    this._branchService = new BranchService();
    this.state = {
      supplierData: [],
      branch_selection: [],
      PODetailList: MOCK_PODetail,
      PODetail: { po_number: "-", supplier: "-", order_date: "-", delivery_date: "-", branch: "-", status: "-" },
      POProduct: [],
      searchState: false,
      searchType: 0,
      //
      search_po: null,
      search_sup: null,
      search_branch: null
    };
  }


  componentDidMount() {
    this.getSuppliers();
    this.getBranch();
  }

  handleInputChange(event, data) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [data.name]: data.value
    });
  }

  handlePOSearch() {
    this.setState({
      searchState: !this.state.searchState,
    });
    // let promise = this._purchaseOrderService.getPurchaseOrder(this.state.po_number_input);
    promise.then(function (response) {
      this.setState({
        // POProduct: response.data.po_product,
        // PODetail: {
        //   po_number: response.data.po_number,
        //   supplier: response.data.supplier_name,
        //   order_date: moment(response.data.order_date).format('DD/MM/YYYY'),
        //   delivery_date: moment(response.data.expect_delivery_date).format('DD/MM/YYYY'),
        //   branch: response.data.customer_branch_name,
        //   status: response.data.status
        // },
        searchState: !this.state.searchState,
      });
    }.bind(this));
  }

  getSuppliers() {
    let supplier_options_json = new Array();
    supplier_options_json.push({ key: "n/a", text: "-", value: 0 })
    let promise = this._supplierService.getSupplier();
    promise.then(function (response) {
      {
        _.map(response.data, ({ supplier_id, supplier_name }) => (
          supplier_options_json.push({ key: supplier_id, text: supplier_name, value: supplier_id })
        ))
      };
      this.setState({
        supplierData: supplier_options_json
      });
    }.bind(this));
  }

  getBranch() {
    let branch_options_json = new Array();
    branch_options_json.push({ key: "n/a", text: "-", value: 0 });
    let promise = this._branchService.getBranch();
    promise.then(function (response) {
      {
        _.map(response.data, ({ branch_id, branch_name, branch_number }) => (
          branch_options_json.push({ key: branch_number, text: (branch_name + ' : ' + branch_number), value: branch_id })
        ))
      };
      this.setState({
        branch_selection: branch_options_json
      });
    }.bind(this));
  }

  render() {
    return (
      <div>
        <div>
          <Breadcrumb>
            <Breadcrumb.Section active>ค้นหา</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
            <Breadcrumb.Section >ข้อมูลใบสั่งซื้อ</Breadcrumb.Section>
          </Breadcrumb>
          <Form style={{ margin: '2em 0' }} loading={this.state.searchState} onSubmit={(e) => this.handlePOSearch(e)}>
            <Form.Group>
              <Form.Input label='เลข PO' placeholder='-' name='search_po' onChange={(e, d) => this.handleInputChange(e, d)} />
              <Form.Select label='สถานะ' options={delivery_options} placeholder='-' name='search_stat' onChange={(e, d) => this.handleInputChange(e, d)} />
              <Form.Select label='Supplier' options={this.state.supplierData} placeholder='-' name='search_sup' onChange={(e, d) => this.handleInputChange(e, d)} />
              <Form.Select label='สาขา' options={this.state.branch_selection} placeholder='-' name='search_branch' onChange={(e, d) => this.handleInputChange(e, d)} />
              <Button animated>
                <Button.Content visible>ค้นหา</Button.Content>
                <Button.Content hidden>
                  <Icon name='search' />
                </Button.Content>
              </Button>
            </Form.Group>
          </Form>
        </div>
        <div style={{ margin: '1em 0' }}>
          <Switch>
            <Route path="/po/searchpo" render={(props) => <SearchPurchaseOrderTable {...props} PODetailList={this.state.PODetailList} />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(
)(SearchPurchaseOrder);
