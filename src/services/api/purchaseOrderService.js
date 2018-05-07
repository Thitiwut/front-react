import axios from 'axios';
import {connect} from 'react-redux';
const URL = "http://139.59.249.187:8080/order-management";

const config = {
	headers: {
            'Content-Type': 'application/json',
    }
};

export class PurchaseOrderService {
	//GET REQUEST
	getPurchaseOrder(po_number){
		return axios.get(URL + '/po', {
			params: {
				action: 'get_purchase_order',
				po_number: po_number
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	//POST REQUEST
	newPurchaseOrder(po_number, supplier_id, branch_id, order_date, delivery_date, status){
		return axios.post(URL + '/po', {
			action: 'new_purchase_order',
			po_number: po_number,
			supplier_id: supplier_id,
			branch_id: branch_id,
			order_date: order_date,
			delivery_date: delivery_date,
			status: status
		}, config
		)
		.catch(function (error) {
			console.log(error);
		});
	}

	addPurchaseOrderProduct(POProducts, po_id){
		let concurrent_request = [];
		POProducts.forEach(function(product){
				axios.post(URL + '/po', {
					action: 'add_purchase_order_product',
					product_id: +product.product_id,
					po_id: +po_id,
					order_amount: +product.amount,
					order_price: parseFloat(+product.price)
				}, config
				).then(function (response) {
					concurrent_request.push(response);
				}).catch(function (error) {
					console.log(error);
				});
			})
			return concurrent_request;
	}

	cancelPurchaseOrder(po_id){
		axios.post(URL + '/po', {
			action: 'cancel_purchase_order',
			po_id: po_id
		})
		.then(function (response) {
			return response;
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	editPurchaseOrder(po_id, supplier_id, active_date, price){
		axios.post(URL + '/po', {
			action: 'edit_purchase_order',
			po_id: po_id,
			supplier_id: supplier_id,
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

	enterUob(fax_date, payee, paid_date, uob_number, remark, po_number){
		axios.post(URL + '/po', {
			action: 'edit_purchase_order',
			fax_date: fax_date,
			payee: payee,
			paid_date: paid_date,
			uob_number: uob_number,
			remark: remark,
			po_number: po_number
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
)(PurchaseOrderService);