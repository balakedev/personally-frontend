import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false
    };
  }
  handleChange = data => event => {
    this.setState({ [data]: event.target.value });
    //removes error message if they start editing something
    this.setState({ error: "" });
  };

  clickedSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    //send data to signin method
    signin(user).then(data => {
      //if the data contains an error, set the state
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        //authenticate and redirect
        authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });
      }
    });
  };

  render() {
    const { email, password, error, redirectToReferer, loading } = this.state;

    if (redirectToReferer) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signin</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        <form>
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
          <button
            onClick={this.clickedSubmit}
            className="btn btn-raised btn-primary"
          >
            submit
          </button>
          {loading ? <div className="loading">Loading...</div> : ""}
        </form>
      </div>
    );
  }
}

export default Signin;
