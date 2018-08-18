import axios from 'axios';
import {connect} from 'react-redux';

const URL = "http://206.189.91.233:8080/order-management";
const config = {
	headers: {
            'Content-Type': 'application/json',
    }
};

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

	//POST REQUEST
	addFeed(feed_action, feed_po_number, feed_product, feed_supplier){
		return axios.post(URL + '/feed', {
			action: 'add_feed',
			feed_action: feed_action,
			feed_po_number: feed_po_number,
			feed_product: feed_product,
			feed_supplier: feed_supplier,
		}, config
		)
		.catch(function (error) {
			console.log(error);
		});
	}
}

export default connect(
)(FeedService);