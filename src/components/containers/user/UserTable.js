import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { UserService } from '../../../services/api/UserService';

import { Table, Dropdown, Menu, Icon, Pagination, Confirm } from 'semantic-ui-react';

export class UserTable extends React.Component {

    constructor(props) {
        super(props);
        this._userService = new UserService();
        this.state = {
            activePage: 1,
            UserData: {},
            deletingUser: null,
            confirmDeleteOpen: false
        };
    }

    open = (username) => this.setState({ confirmDeleteOpen: true, deletingUser: username })
    close = () => this.setState({ confirmDeleteOpen: false })

    handleSort = clickedColumn => () => {
        // const { column, productData, direction } = this.state

        // if (column !== clickedColumn) {
        //   this.setState({
        //     column: clickedColumn,
        //     productData: _.sortBy(productData, [clickedColumn]),
        //     direction: 'ascending',
        //   })

        //   return
        // }

        // this.setState({
        //   productData: productData.reverse(),
        //   direction: direction === 'ascending' ? 'descending' : 'ascending',
        // })
    }

    handlePaginationChange = (e, { activePage }) => {
        console.log(activePage);
        if (!isNaN(activePage)) {
            this.setState({ activePage });
        }
    }

    defineType(type) {
        if (type === "admin") {
            return "ผู้ดูแลระบบ"
        } else if (type === "po_viewer") {
            return "ผู้ตรวจสอบใบสั่งซื้อ"
        } else if (type === "product_manager") {
            return "ผู้ดูแลสินค้า"
        } else if (type === "po_manager") {
            return "ผู้ดูแลใบสั่งซื้อ"
        } else if (type === "manager") {
            return "ผู้ดูแล"
        }
    }

    deleteUser = () => {
        let promise = this._userService.deleteUser(this.state.deletingUser);
        promise.then((response) => {
            if (response.data.ok == 1) {
                alert("ลบผู้ใช้สำเร็จ !");
                this.setState({ confirmDeleteOpen: false });
                this.props.callWhenDelete();
            } else if (response.data.ok == 0) {
                alert("ลบผู้ใช้ไม่สำเร็จ");
                this.setState({ confirmDeleteOpen: false });
            }
        });
    }

    render() {
        return (
            <div>
                <Confirm cancelButton="ไม่ต้องการ"
                    confirmButton="ลบ"
                    open={this.state.confirmDeleteOpen} content={'ต้องการลบผู้ใช้: ' + this.state.deletingUser} onCancel={this.close} onConfirm={this.deleteUser} />
                <Table sortable selectable celled fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>

                            </Table.HeaderCell>
                            <Table.HeaderCell >
                                Username
            </Table.HeaderCell>
                            <Table.HeaderCell >
                                ชื่อผู้ใช้
            </Table.HeaderCell>
                            <Table.HeaderCell >
                                ระดับ
            </Table.HeaderCell>
                            <Table.HeaderCell >
                                สาขา
            </Table.HeaderCell>
                            <Table.HeaderCell width={1}>

                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(this.props.UserList[this.state.activePage - 1], ({ username, branch_number, branch_name, user_name, type }, index) => (
                            <Table.Row key={username}>
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>{username}</Table.Cell>
                                <Table.Cell>{user_name}</Table.Cell>
                                <Table.Cell>{this.defineType(type)}</Table.Cell>
                                <Table.Cell>{branch_name + "(" + branch_number + ")"}</Table.Cell>
                                <Table.Cell><Icon link name='close' onClick={() => this.open(username)} /></Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='6'>
                                <Pagination totalPages={this.props.UserList.length} onPageChange={this.handlePaginationChange} />
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        );
    }
}

export default connect(
)(UserTable);
