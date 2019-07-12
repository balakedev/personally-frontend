import React, { Component } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      error: ""
    };
  }
  handleChange = data => event => {
    this.setState({ [data]: event.target.value });
    //removes error message if they start editing something
    this.setState({ error: "" });
  };

  clickedSubmit = event => {
    event.preventDefault();

    const { firstName, lastName, username, email, password } = this.state;
    const user = {
      name: {
        firstName,
        lastName
      },
      username,
      email,
      password,
      open: false
    };
    //send data to signup method
    signup(user).then(data => {
      //if the data contains an error, set the state
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          error: "",
          open: true
        });
      }
    });
  };

  render() {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      error,
      open
    } = this.state;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signup</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        <form>
          <div className="form-group">
            <label className="text-muted">First name</label>
            <input
              onChange={this.handleChange("firstName")}
              type="text"
              className="form-control"
              value={firstName}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">last name</label>
            <input
              onChange={this.handleChange("lastName")}
              type="text"
              className="form-control"
              value={lastName}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">username</label>
            <input
              onChange={this.handleChange("username")}
              type="text"
              className="form-control"
              value={username}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">email</label>
            <input
              onChange={this.handleChange("email")}
              type="text"
              className="form-control"
              value={email}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">password</label>
            <input
              onChange={this.handleChange("password")}
              type="password"
              className="form-control"
              value={password}
            />
          </div>
          <div
            className="alert alert-info"
            style={{ display: open ? "" : "none" }}
          >
            Account Created. Please <Link to="/signin">Sign in</Link>
          </div>
          <button
            onClick={this.clickedSubmit}
            className="btn btn-raised btn-primary"
          >
            submit
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;
