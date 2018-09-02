import React from 'react';
import { connect } from 'react-redux';

import { Form } from 'semantic-ui-react';
import { UserService } from '../../../services/api/UserService';
import { BranchService } from '../../../services/api/BranchService';

const userType = [
    { key: '1', text: 'ผู้ดูแล', value: 'manager' },
    { key: '2', text: 'ผู้ตรวจสอบใบสั่งซื้อ', value: 'po_viewer' },
    { key: '3', text: 'ผู้ดูแลสินค้า', value: 'product_manager' },
    { key: '4', text: 'ผู้ดูแลใบสั่งซื้อ', value: 'po_manager' },
];
export class AddUserForm extends React.Component {

    constructor(props) {
        super(props);
        this._userService = new UserService();
        this._branchService = new BranchService();
        this.state = {
            username: null,
            branch_number: null,
            branch_name: null,
            user_name: null,
            password: null,
            type: null,
            branch_selection: []
        };
    }

    componentDidMount() {
        this.getBranch();
    }

    handleInputChange(event, data) {
        this.setState({
            [data.name]: data.value
        });

        if (data.name === "branch_number") {
            let found = data.options.find(function (branch) {
                return branch.value === data.value;
            });
            console.log(found)
            this.setState({
                branch_name: found.text
            });
        }
    }

    handleSubmit() {
        this.addUser();
    }


    //Service Calls
    addUser() {
        let status = "";
        let user = {
            username: this.state.username,
            branch_number: this.state.branch_number,
            branch_name: this.state.branch_name,
            user_name: this.state.user_name,
            password: this.state.password,
            type: this.state.type,
        }
        let promise = this._userService.createUser(user);
        promise.then( (response) => {
            if (response.data == "created") {
                alert("เพิ่มผู้ใช้สำเร็จ !");
                this.props.callWhenCreate();
            } else if (response.data == "duplicate_user") {
                alert("เพิ่มผู้ใช้ไม่สำเร็จ ( Username ซ้ำ )");
            }
        });
    }

    getBranch() {
        let branch_options_json = new Array();
        let promise = this._branchService.getBranch();
        promise.then(function (response) {
            {
                _.map(response.data, ({ branch_id, branch_name, branch_number }) => (
                    branch_options_json.push({ key: branch_id, text: branch_name, value: branch_number })
                ))
            };
            this.setState({
                branch_selection: branch_options_json
            });
        }.bind(this));
    }

    render() {
        return (
            <Form onSubmit={(e) => this.handleSubmit(e)}>
                <Form.Group widths='equal'>
                    <Form.Input required fluid label='Username' placeholder='-' name='username' onChange={(e, d) => this.handleInputChange(e, d)} />
                    <Form.Input required fluid label='Password' placeholder='-' name='password' onChange={(e, d) => this.handleInputChange(e, d)} />
                    <Form.Input required fluid label='ชื่อผู้ใช้' placeholder='-' name='user_name' onChange={(e, d) => this.handleInputChange(e, d)} />
                    <Form.Select required fluid label='ระดับ' options={userType} placeholder='-' name='type' onChange={(e, d) => this.handleInputChange(e, d)} />
                    <Form.Select required search noResultsMessage='ไม่พบสาขา' fluid label='สาขา' options={this.state.branch_selection} placeholder='-' name='branch_number' onChange={(e, d) => this.handleInputChange(e, d)} />
                </Form.Group>
                <Form.Button role="button" >เพิ่มผู้ใช้</Form.Button>
            </Form>
        );
    }
}

export default connect(
)(AddUserForm);
