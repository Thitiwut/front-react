import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { Table, Dropdown, Breadcrumb} from 'semantic-ui-react';

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
            </div>
        );
    }
}

export default connect(
)(SearchPurchaseOrderDetail);
