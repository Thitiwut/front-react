import axios from 'axios';
import {connect} from 'react-redux';

const URL = "http://139.59.249.187:8080/order-management";

export class FeedService {
	//GET REQUEST
	getFeed(){
		return axios.get(URL + '/feed', {
			params: {
				action: 'get_feed',
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}

export default connect(
)(FeedService);