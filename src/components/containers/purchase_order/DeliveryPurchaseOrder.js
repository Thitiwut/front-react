import React from 'react';
import {connect} from 'react-redux';
import { Switch, NavLink, Route } from "react-router-dom";

import { Menu, Segment, Dropdown, Button, Icon, Label, Form, Table, Input, Search, Grid, Header } from 'semantic-ui-react';

import { PurchaseOrderService } from '../../../services/api/PurchaseOrderService';

const options = [
    { key: 's', text: 'ยกเลิก', value: 's' , label: {color: 'red', empty: true, circular: true }},
    { key: 'm', text: 'รอการจัดส่ง', value: 'm' , label: {color: 'blue', empty: true, circular: true }},
    { key: 'l', text: 'จัดส่งแล้ว', value: 'l' , label: {color: 'black', empty: true, circular: true }},
  ]

export class DeliveryPurchaseOrder extends React.Component {

    constructor(props) {
        super(props);
        this._purchaseOrderService = new PurchaseOrderService();
        this.state = {
          PODetail: {po_number: "-", supplier: "-", order_date: "-", delivery_date: "-", branch: "-", status: "-"},
          POProduct: [],
          searchState: false,
          //
          po_number_input: null,
        };
      }

    handlePOSearch(){
        this.setState({
          searchState: !this.state.searchState,
        });
        let promise = this._purchaseOrderService.getPurchaseOrder(this.state.po_number_input);
        promise.then(function (response){
          this.setState({
            POProduct: response.data.po_product,
            PODetail: {
              po_number: response.data.po_number, 
              supplier: response.data.supplier_name, 
              order_date: moment(response.data.order_date).format('DD/MM/YYYY'), 
              delivery_date: moment(response.data.expect_delivery_date).format('DD/MM/YYYY'), 
              branch: response.data.customer_branch_name, 
              status: response.data.status
            },
            searchState: !this.state.searchState,
          });
        }.bind(this));
      }

  render() {
    return (
      <div>
          <div class="field">
          <Form class="ui form" onSubmit={(e) => this.handlePOSearch(e)}>
            <Input focus loading={this.state.searchState} icon='search' iconPosition='right' placeholder='ค้นหาด้วยเลข PO' name="po_number_input" onChange={(e,d) => this.handleInputChange(e,d)}/>
            <Dropdown search labeled selection options={options} icon='search' iconPosition='right' placeholder='ค้นหาด้วยสถานะ' />
          </Form>
          </div>
      </div>
    );
  }
}

export default connect(
)(DeliveryPurchaseOrder);
