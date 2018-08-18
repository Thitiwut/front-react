import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Modal, Button, Header, Feed, Icon, Divider, Container, Segment, Form } from "semantic-ui-react";
import crypto from 'crypto-js';
import aes from 'crypto-js/aes';
import { AuthService } from '../services/api/AuthService';


export class Login extends React.Component {

    constructor(props) {
        super(props);
        this._authService = new AuthService();
    }

    state = {
        username: '',
        password: '',
        modalOpen: true
    }

    handleInputChange(event, data) {
        this.setState({
            [data.name]: data.value
        });
    }

    handleSubmit() {
        this.authenticate();
    }

    authenticate() {
        let promise = this._authService.getAuth(this.state.username, this.state.password);
        promise.then((res) =>
            res.text()
        ).then((data) => {
            return JSON.parse(aes.decrypt(data.toString(), "auth").toString(crypto.enc.Utf8))
        }).then((auth_json) => {
            var result = auth_json.find(obj => {
                return obj.username === this.state.username
            })
            if (result == null) {
                alert("ไม่มี user ในระบบ")
            } else {
                if (result.password != this.state.password) {
                    alert("password ไม่ถูกต้อง")
                } else {
                    localStorage.setItem("branch_name", result.branch_name);
                    localStorage.setItem("branch_number", result.branch_number);
                    localStorage.setItem("user_name", result.user_name);
                    this.props.authenticate();
                    this.props.history.push('/');
                }
            }
        }
        );
    }

    render() {
        return (
            <div>
                <Modal
                    open={this.state.modalOpen}
                    basic
                    size='small'
                >
                    <Header icon='browser' content='เข้าสู่ระบบ' />
                    <Modal.Content>
                        <Segment inverted>
                            <Form inverted onSubmit={(e) => this.handleSubmit(e)}>
                                <Form.Group widths='equal'>
                                    <Form.Input required fluid label='Username' placeholder='ชื่อผู้ใช้' name="username" onChange={(e, d) => this.handleInputChange(e, d)} />
                                    <Form.Input required type='password' fluid label='Password' placeholder='รหัสผ่าน' name="password" onChange={(e, d) => this.handleInputChange(e, d)} />
                                </Form.Group>
                                <Button color='blue' inverted >เข้าระบบ</Button>
                            </Form>
                        </Segment>
                    </Modal.Content>
                    <Modal.Actions>
                    </Modal.Actions>
                </Modal>
            </div >
        );
    }
}

export default connect(
)(Login);