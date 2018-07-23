import axios from 'axios';
import {connect} from 'react-redux';

const URL = "http://139.59.249.187:8080/order-management";

export class DownloadService {
	//GET REQUEST
	downloadPOPdf(po_number){
			var win = window.open(URL+'/popdf?po_number='+po_number, '_blank');
			win.focus();
	}
}

export default connect(
)(DownloadService);