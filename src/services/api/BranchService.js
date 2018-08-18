import axios from 'axios';
import {connect} from 'react-redux';

const URL = "http://206.189.91.233:8080/order-management";

export class BranchService {
	//GET REQUEST
	getBranch(){
		return axios.get(URL + '/branch', {
			params: {
				action: 'get_branches',
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}

export default connect(
)(BranchService);