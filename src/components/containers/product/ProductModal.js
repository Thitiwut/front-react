import React from 'react';
import {connect} from 'react-redux';

import { Header, Modal , Button, Form , Label, Message} from 'semantic-ui-react';

export class ProductModal extends React.Component {
    constructor(props){
    super(props);
    this.state = {
      modalOpen: false,
      product_id: props.product_id,
      product_name: null,
      product_number: null,
      product_type: null,
      product_price: null,
      supplier: null,
    };
  }

    state = { 
    modalOpen: false,
    product_id: null,
    product_name: null,
    product_number: null,
    product_type: null,
    product_price: null,
  }

  handleOpen(product, supplier){
    console.log(supplier);
    this.setState({ 
      modalOpen: true,
      product_id: product.product_id,
      product_name: product.product_name,
      product_number: product.product_number,
      product_type: product.product_type,
      product_price: product.product_price,
      supplier: supplier,
    })
  }

  handleClose = () => this.setState({ modalOpen: false }) 

  render() {
    const { product_id, product_name, product_number, product_type, product_price , supplier} = this.state;

    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        >
      <Modal.Header>ข้อมูลสินค้า - หมายเลข {product_number}
      </Modal.Header>
      <Modal.Content>
      <Modal.Description>
        <Message compact>
        <Message.Header>
      Supplier: {supplier}
        </Message.Header>
  </Message>
      <Form>
        <Form.Group unstackable widths={2}>
          <Form.Input value={product_name} label='ชื่อสินค้า' />
        </Form.Group>
        <Button type='submit'>แก้ไขชื่อสินค้า</Button>
      </Form>
      <h3>ปรับราคาใช้</h3>
      ราคาใช้ปัจจุบัน <Label size="big" tag>{product_price} บาท</Label>
      </Modal.Description>
      </Modal.Content>
  </Modal>
    );
  }
}

export default connect(
)(ProductModal);
