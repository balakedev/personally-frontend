import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { read, update } from "./apiUser";
import { Redirect } from "react-router-dom";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      username: null,
      password: null,
      redirectToProfile: false,
      error: "",
      loading: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.userData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  clickedSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    if (this.isValid()) {
      //send request to API
      const userId = this.props.match.params.userId;
      console.log("user id: ", userId);
      const token = isAuthenticated().token;

      update(userId, token, this.userData).then(data => {
        for (var pair of this.userData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }

        console.log("data: ", data);
        //   if the data contains an error, set the state
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({
            redirectToProfile: true
          });
        }
      });
    }
  };

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
        console.log("Error in updating profile.");
      } else {
        this.setState({
          id: data._id,
          firstName: data.name.firstName,
          lastName: data.name.lastName,
          username: data.username,
          email: data.email
        });
      }
    });
  };

  componentDidMount() {
    this.userData = new FormData();
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  isValid = () => {
    const { firstName, lastName, username, email, password } = this.state;

    if (firstName.length === 0) {
      this.setState({ error: "Name is required." });
      return false;
    }
    if (lastName.length === 0) {
      this.setState({ error: "Last name is required." });
      return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({
        error: "A valid Email is required"
      });
      return false;
    }
    if (username.length === 0) {
      this.setState({ error: "username is required." });
      return false;
    }
    if (password != null) {
      if (
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          password
        )
      ) {
        this.setState({
          error:
            "Please enter a password with a minimum of eight characters, at least one letter, one number and one special character."
        });
        return false;
      }
    }

    return true;
  };

  signupForm = (firstName, lastName, username, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Display Picture</label>
        <input
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        />

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

      <button
        onClick={this.clickedSubmit}
        className="btn btn-raised btn-primary"
      >
        update
      </button>
    </form>
  );

  render() {
    const {
      id,
      firstName,
      lastName,
      username,
      email,
      password,
      redirectToProfile,
      error,
      loading
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    return (
      <div className="container mt-5 mb-5">
        <h2>Edit profile</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {this.signupForm(firstName, lastName, username, email, password)}
        {loading ? <div className="loading">Loading...</div> : ""}
      </div>
    );
  }
}
export default EditProfile;
