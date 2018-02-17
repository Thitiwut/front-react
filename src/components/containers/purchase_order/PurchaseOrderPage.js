import React from 'react';
import {connect} from 'react-redux';

export class PurchaseOrderPage extends React.Component {

  
  
  render() {
    return (
      <div>
      <h2 className="alt-header">PurchaseOrder</h2>
      <p>
        This example app is part of the <a href="https://github.com/coryhouse/react-slingshot">React-Slingshot
        starter kit</a>.
      </p>
    </div>
    );
  }
}

export default connect(
)(PurchaseOrderPage);
