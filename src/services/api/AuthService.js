import { connect } from 'react-redux';

export class AuthService {

    getAuth(username, password) {
        return fetch('./token/token.tk');
    }
}

export default connect(
)(AuthService);