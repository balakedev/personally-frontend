import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { remove } from "./apiUser";
import { signout } from "../auth";
import { Redirect } from "react-router-dom";

class DeleteUser extends Component {
  state = {
    redirect: false
  };

  deleteConfirmed = () => {
    let answer = window.confirm(
      "Are you sure you want to leave us forever... and ever?"
    );
    if (answer) {
      this.deleteAccount();
    }
  };

  deleteAccount = () => {
    const token = isAuthenticated().token;
    const userId = this.props.userId;
    remove(userId, token).then(data => {
      console.log(data + "im data");
      signout(() => console.log("User has been deleted"));
      this.setState({ redirect: true });
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/signup" />;
    }
    return (
      <button
        onClick={this.deleteConfirmed}
        className="btn btn-raised btn-danger"
      >
        Delete
      </button>
    );
  }
}
export default DeleteUser;
