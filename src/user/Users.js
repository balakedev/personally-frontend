import React, { Component } from "react";
import { list } from "./apiUser";
import { Link } from "react-router-dom";

import DefaultProfile from "../assets/images/avatar.png";

//styling
const cardStyle = {
  borderBottom: "1px solid lightgrey"
};

const profileImage = {
  width: "40px",
  borderRadius: "100px",
  margin: "0"
};

const pFix = {
  marginTop: "0",
  marginBottom: "0"
};

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount = () => {
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  };

  renderUsers = users => (
    <ul className="list-group">
      {users.map((user, i) => (
        <Link
          to={`/user/${user._id}`}
          className="list-group-item"
          style={cardStyle}
          key={i}
        >
          <div>
            <img
              style={profileImage}
              src={DefaultProfile}
              alt={user.username}
            />
          </div>
          <div className="bmd-list-group-col">
            <p className="list-group-item-heading" style={pFix}>
              {user.username}
            </p>
            <p className="list-group-item-text" style={pFix}>
              {user.name.firstName} {user.name.lastName}
            </p>
          </div>
        </Link>
      ))}
    </ul>
  );

  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Users</h2>
        {this.renderUsers(users)}
      </div>
    );
  }
}

export default Users;
