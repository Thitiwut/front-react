import axios from 'axios';
import {connect} from 'react-redux';

const URL = "http://206.189.91.233:8080/order-management";

export class SupplierService {
	//GET REQUEST
	getSupplier(){
		return axios.get(URL + '/supplier', {
			params: {
				action: 'get_suppliers',
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}

export default connect(
)(SupplierService);