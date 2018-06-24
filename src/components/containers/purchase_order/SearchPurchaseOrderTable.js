import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Table, Dropdown } from 'semantic-ui-react';

export class SearchPurchaseOrderTable extends React.Component {

    constructor(props) {
        super(props);

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

    handleRowClick = po_number => () => {
        console.log(po_number);
        this.props.history.push('/po/detail/'+po_number);
    }

    render() {
        return (
            <div>
                <Table sortable selectable celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell >

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
                        {_.map(this.props.PODetailList, ({ po_number, supplier, branch, status }, index) => (
                            <Table.Row key={po_number} onClick={this.handleRowClick(po_number)}>
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>{po_number}</Table.Cell>
                                <Table.Cell>{status}</Table.Cell>
                                <Table.Cell>{supplier}</Table.Cell>
                                <Table.Cell>{branch}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default connect(
)(SearchPurchaseOrderTable);
