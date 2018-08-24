import React from 'react';
import { connect } from 'react-redux';
import { Switch, NavLink, Route } from "react-router-dom";

import { Menu, Segment, Divider } from 'semantic-ui-react'
import { UserService } from '../../../services/api/UserService';
import { UserTable } from './UserTable';
import { AddUserForm } from './AddUserForm';

export class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this._userService = new UserService();
    this.state = {
      UserList: []
    };
  }

  componentDidMount() {
    this.getUserList();
  }

  sliceUsersIntoChunks(Users) {
    let ChucksArray = [];
    let i, j, tempArray, chunk = 10;
    for (i = 0, j = Users.length; i < j; i += chunk) {
      tempArray = Users.slice(i, i + chunk);
      ChucksArray.push(tempArray);
    }
    return ChucksArray;
  }

  getUserList() {
    let promise = this._userService.getUsers();
    promise.then((response) => {
      let UsersChuckArray = this.sliceUsersIntoChunks(response.data);
      this.setState({
        UserList: UsersChuckArray
      });
    });
  }

  render() {
    return (
      <div>
        <h2 className="alt-header">ตั้งค่าผู้ใช้งาน</h2>
        <AddUserForm callWhenCreate={this.getUserList.bind(this)}
        />
        <Divider />
        <UserTable ref="UserTable" UserList={this.state.UserList} callWhenDelete={this.getUserList.bind(this)} />
      </div>
    );
  }
}

export default connect(
)(UserPage);