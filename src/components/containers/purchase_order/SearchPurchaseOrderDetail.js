import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { Breadcrumb, Menu, Segment, Dropdown, Button, Icon, Label, Form, Table, Input, Search, Grid, Header, Select } from 'semantic-ui-react';

import { PurchaseOrderService } from '../../../services/api/PurchaseOrderService';
import { DownloadService } from '../../../services/api/DownloadService';
import { FeedService } from '../../../services/api/FeedService';


export class SearchPurchaseOrderDetail extends React.Component {

    constructor(props) {
        super(props);
        this._purchaseOrderService = new PurchaseOrderService();
        this._feedService = new FeedService();
        this._downloadService = new DownloadService();
        this.state = {
            current_po: null,
            POData: {}
        };
    }

    componentDidMount() {
        console.log(this.props.match.params.number);
        this.setState({
            current_po: this.props.match.params.number
        });
        this.getPO();
    }

    handleStatusClick(e, data) {
        let promise = this._purchaseOrderService.updateStatus(this.state.POData.po_id, data.value);
        promise.then(function (response) {
            alert("อัพเดตสถานะของใบสั่งซื้อเป็น " + data.value + " แล้ว !");
            this.getPO();
        }.bind(this))
            .then(() => {
                if (data.value === 'จัดส่งแล้ว') {
                    this._feedService.addFeed("po_delivered", this.state.POData.po_number, "", "");
                } else if (data.value === 'ยกเลิก') {
                    this._feedService.addFeed("po_cancel", this.state.POData.po_number, "", "");
                }
            });
    }

    handleDownloadPOClick(e, data) {
        let promise = this._downloadService.downloadPOPdf(this.props.match.params.number);
    }

    getPO() {
        let promise = this._purchaseOrderService.getPurchaseOrder(this.props.match.params.number);
        promise.then(function (response) {
            this.setState({
                POData: response.data
            });
        }.bind(this));
    }

    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Section >ค้นหา</Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right angle' />
                    <Breadcrumb.Section active>ข้อมูลใบสั่งซื้อ</Breadcrumb.Section>
                </Breadcrumb>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
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
                            <Table.Cell>{this.state.POData.po_number}</Table.Cell>
                            <Table.Cell>{this.state.POData.supplier_name}</Table.Cell>
                            <Table.Cell>{this.state.POData.order_date}</Table.Cell>
                            <Table.Cell>{this.state.POData.expect_delivery_date}</Table.Cell>
                            <Table.Cell>{this.state.POData.customer_branch_name}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                <Table celled>
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
                                ราคา
            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(this.state.POData.po_product, ({ product_id, product_name, product_number, order_amount, product_price }) => (
                            <Table.Row key={product_id} >
                                <Table.Cell>{product_name}</Table.Cell>
                                <Table.Cell>{product_number}</Table.Cell>
                                <Table.Cell>{order_amount}</Table.Cell>
                                <Table.Cell>{product_price}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <Button as='div' labelPosition='right'>
                    <Button basic color='blue'>
                        <Icon name='archive' />
                        สถานะการส่่ง
      </Button>
                    <Label as='a' basic color='blue' pointing='left'>{this.state.POData.status}</Label>
                </Button>
                <Dropdown text='ปรับสถานะ' floating labeled button className='icon' >
                    <Dropdown.Menu>
                        <Dropdown.Header icon='tags' content='เปลี่ยนแปลงสถานะการจัดส่ง' />
                        <Dropdown.Divider />
                        <Dropdown.Item label={{ color: 'red', empty: true, circular: true }} text='ยกเลิก' value='ยกเลิก' onClick={(e, d) => this.handleStatusClick(e, d)} />
                        <Dropdown.Item label={{ color: 'blue', empty: true, circular: true }} text='รอการจัดส่ง' value='รอการจัดส่ง' onClick={(e, d) => this.handleStatusClick(e, d)} />
                        <Dropdown.Item label={{ color: 'black', empty: true, circular: true }} text='จัดส่งแล้ว' value='จัดส่งแล้ว' onClick={(e, d) => this.handleStatusClick(e, d)} />
                    </Dropdown.Menu>
                </Dropdown>

                <Button.Group horizontal labeled icon>
                    <Button icon='file outline' content='ดาวโหลดใบสั่งซื้อ' onClick={(e, d) => this.handleDownloadPOClick(e, d)} />
                </Button.Group>
            </div>
        );
    }
}

export default connect(
)(SearchPurchaseOrderDetail);
