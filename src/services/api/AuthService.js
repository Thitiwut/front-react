import { connect } from 'react-redux';
import axios from 'axios';

const URL = "http://206.189.91.233:8081";
const config = {
    headers: {
        'Content-Type': 'application/json',
    }
};

export class AuthService {

    getAuth(username, password) {
        return axios.post(URL + '/auth', {
            username: username,
            password: password,
        }, config
        )
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default connect(
)(AuthService);