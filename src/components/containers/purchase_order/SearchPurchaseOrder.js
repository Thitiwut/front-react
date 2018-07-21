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
  { key: 'n/a', text: '', value: '' },
  { key: 's', text: 'ยกเลิก', value: 'ยกเลิก', label: { color: 'red', empty: true, circular: true } },
  { key: 'm', text: 'รอการจัดส่ง', value: 'รอการจัดส่ง', label: { color: 'blue', empty: true, circular: true } },
  { key: 'l', text: 'จัดส่งแล้ว', value: 'จัดส่งแล้ว', label: { color: 'black', empty: true, circular: true } },
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
      PODetailList: [],
      searchState: false,
      searchType: 0,
      //
      search_po: '',
      search_sup: '',
      search_branch: '',
      search_stat: '',
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

    if(data.name == "search_sup"){
      let targetSupplier = this.state.supplierData.filter(function( supplier ) {
        return supplier.value == data.value;
      });
    

      this.setState({
        search_sup: targetSupplier[0].text
      });
    }

    if(data.name == "search_branch"){
      let targetBranch = this.state.branch_selection.filter(function( branch ) {
        return branch.value == data.value;
      });
    

      this.setState({
        search_branch: targetBranch[0].text
      });
    }
  }

  handlePOSearch() {
    this.setState({
      searchState: !this.state.searchState,
      PODetailList: [],
    });
     let promise = this._purchaseOrderService.getPurchaseOrderList(
      this.state.search_po, this.state.search_stat, this.state.search_sup, this.state.search_branch
     );
    promise.then(function (response) {
      this.setState({
        PODetailList: response.data,
        searchState: !this.state.searchState,
      });
    }.bind(this));
  }

  getSuppliers() {
    let supplier_options_json = new Array();
    supplier_options_json.push({ key: "n/a", text: "", value: '' })
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
    branch_options_json.push({ key: "n/a", text: "", value: '' });
    let promise = this._branchService.getBranch();
    promise.then(function (response) {
      {
        _.map(response.data, ({ branch_id, branch_name, branch_number }) => (
          branch_options_json.push({ key: branch_number, text: branch_name, value: branch_id })
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
