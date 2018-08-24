import { connect } from 'react-redux';
import axios from 'axios';

const URL = "http://139.59.249.187:8081";
const config = {
    headers: {
        'Content-Type': 'application/json',
    }
};

export class UserService {

    getUsers() {
        return axios.get(URL + '/user')
            .catch(function (error) {
                console.log(error);
            });
    }

    createUser(user) {
        return axios.post(URL + '/createUser', {
            username: user.username,
            password: user.password,
            branch_number: user.branch_number,
            branch_name: user.branch_name,
            user_name: user.user_name,
            type: user.type
        }, config
        )
            .catch(function (error) {
                console.log(error);
            });
    }

    updateUser(user) {
        return axios.post(URL + '/updateUser', {
            username: user.username,
            branch_number: user.branch_number,
            branch_name: user.branch_name,
            user_name: user.user_name,
            type: user.type
        }, config
        )
            .catch(function (error) {
                console.log(error);
            });
    }

    deleteUser(username) {
        return axios.post(URL + '/deleteUser', {
            username: username,
        }, config
        )
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default connect(
)(UserService);