import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Table, Dropdown, Menu, Icon, Pagination } from 'semantic-ui-react';

export class SearchPurchaseOrderTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            POData: {}
        };
    }

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

    handleRowClick = po_number => () => {
        let po_trim = po_number.split('.');
        this.props.history.push('/po/detail/' + po_trim[1]);
    }

    render() {
        return (
            <div>
                <Table sortable selectable celled fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>

                            </Table.HeaderCell>
                            <Table.HeaderCell >
                                เลขที่ PO
            </Table.HeaderCell>
                            <Table.HeaderCell >
                                สถานะ
            </Table.HeaderCell>
                            <Table.HeaderCell >
                                Supplier
            </Table.HeaderCell>
                            <Table.HeaderCell >
                                สาขาที่ส่ง
            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(this.props.PODetailList[this.state.activePage - 1], ({ po_number, supplier_name, customer_branch_name, status }, index) => (
                            <Table.Row key={index + 1} onClick={this.handleRowClick(po_number)}>
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>{po_number}</Table.Cell>
                                <Table.Cell>{status}</Table.Cell>
                                <Table.Cell>{supplier_name}</Table.Cell>
                                <Table.Cell>{customer_branch_name}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='5'>
                                <Pagination totalPages={this.props.PODetailList.length} onPageChange={this.handlePaginationChange} />
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        );
    }
}

export default connect(
)(SearchPurchaseOrderTable);
