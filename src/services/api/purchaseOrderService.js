import axios from 'axios';
const URL = "http://139.59.249.187:8080/order-management";

export default class PurchaseOrderService {
	//GET REQUEST
	getPurchaseOrder(po_number){
		axios.get(URL + '/po', {
			params: {
				action: 'get_purchase_order',
				po_number: po_number
			}
		})
		.then(function (response) {
			return response;
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	//POST REQUEST
	newPurchaseOrder(supplier_id, branch_id, order_date, delivery_date, status){
		axios.post(URL + '/po', {
			action: 'new_purchase_order',
			supplier_id: supplier_id,
			branch_id: branch_id,
			order_date: order_date,
			delivery_date: delivery_date,
			status: status
		})
		.then(function (response) {
			return response;
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	addPurchaseOrderProduct(product_id, po_id, order_amount, order_price){
		axios.post(URL + '/po', {
			action: 'add_purchase_order_product',
			product_id: product_id,
			po_id: po_id,
			order_amount: order_amount,
			order_price: order_price
		})
		.then(function (response) {
			return response;
		})
		.catch(function (error) {
			console.log(error);
		});
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