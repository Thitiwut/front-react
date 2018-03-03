import axios from 'axios';
import {connect} from 'react-redux';

const URL = "http://139.59.249.187:8080/order-management";

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