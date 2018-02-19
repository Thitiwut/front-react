import React from 'react';
import {connect} from 'react-redux';

import { Form } from 'semantic-ui-react';

//SUPPLIER MOCKUP
const suppliers = [
  { key: '27781', text: 'นลินี', value: '27781' },
  { key: '31049', text: 'bbb fresh foods', value: '31049' },
  { key: '31048', text: 'bbb direct', value: '31048' },
  { key: '31781', text: 'ทัศพงษ์', value: '31781' }
];

export class AddProductForm extends React.Component {

  render() {
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Input fluid label='ชื่อสินค้า' placeholder='-' />
          <Form.Input fluid label='ชนิดสินค้า' placeholder='-' />
          <Form.Select fluid label='Supplier' options={suppliers} placeholder='-' />
        </Form.Group>
        <Form.Button>เพิ่มสินค้า</Form.Button>
      </Form>
    );
  }
}

export default connect(
)(AddProductForm);
