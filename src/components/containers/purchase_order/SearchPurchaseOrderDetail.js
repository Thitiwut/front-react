import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { Breadcrumb, Menu, Segment, Dropdown, Button, Icon, Label, Form, Table, Input, Search, Grid, Header, Select } from 'semantic-ui-react';


export class SearchPurchaseOrderDetail extends React.Component {

    constructor(props) {
        super(props);

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

                    </Table.Body>
                </Table>
                <Button as='div' labelPosition='right'>
                    <Button basic color='blue'>
                        <Icon name='archive' />
                        สถานะการส่่ง
      </Button>
                    <Label as='a' basic color='blue' pointing='left'>รอการจัดส่ง</Label>
                </Button>
                <Dropdown text='ปรับสถานะ' floating labeled button className='icon'>
                    <Dropdown.Menu>
                        <Dropdown.Header icon='tags' content='เปลี่ยนแปลงสถานะการจัดส่ง' />
                        <Dropdown.Divider />
                        <Dropdown.Item label={{ color: 'red', empty: true, circular: true }} text='ยกเลิก' />
                        <Dropdown.Item label={{ color: 'blue', empty: true, circular: true }} text='รอการจัดส่ง' />
                        <Dropdown.Item label={{ color: 'black', empty: true, circular: true }} text='จัดส่งแล้ว' />
                    </Dropdown.Menu>
                </Dropdown>

                <Button.Group horizontal labeled icon>
                    <Button icon='file outline' content='ปริ้นใบสั่งซื้อ' />
                    <Button icon='file outline' content='ปริ้นใบคนชับ' />
                </Button.Group>
            </div>
        );
    }
}

export default connect(
)(SearchPurchaseOrderDetail);
