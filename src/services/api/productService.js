import axios from 'axios';
import {connect} from 'react-redux';

const URL = "http://139.59.249.187:8080/order-management";
const config = {
	headers: {
            'Content-Type': 'application/json',
    }
}

export class ProductService {
	//GET REQUEST
	getProducts(supplier_id){
		return axios.get(URL + '/product', {
			params: {
				action: 'get_products',
				supplier_id: supplier_id
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	//POST REQUEST
	addProduct(product_name, product_type, supplier_id){
		return axios.post(URL + '/product', {
			action: 'add_product',
			product_name: product_name,
			product_type: product_type,
			supplier_id: supplier_id
		}, config
		)
		.catch(function (error) {
			console.log(error);
		});
	}

	deleteProduct(product_id){
		axios.post(URL + '/product', {
			action: 'delete_product',
			product_id: product_id
		})
		.then(function (response) {
			return response;
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	editProduct(product_id, product_name){
		axios.post(URL + '/product', {
			action: 'edit_product',
			product_id: product_id,
			product_name: product_name
		})
		.then(function (response) {
			return response;
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	setProductPrice(product_id, product_name, active_date, price){
		axios.post(URL + '/product', {
			action: 'set_product_price',
			product_id: product_id,
			product_name: product_name,
			active_date: active_date,
			price: price
		})
		.then(function (response) {
			return response;
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}

export default connect(
)(ProductService);