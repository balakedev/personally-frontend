import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";
import DeleteUser from "./DeleteUser";
import DefaultProfile from "../assets/images/avatar.png";
import FollowProfileButton from "./FollowProfileButton";

const profileImage = {
  width: "100px",
  borderRadius: "100px",
  margin: "0"
};

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: { following: [], followers: [], undefined },
      redirectToSignin: false,
      following: false,
      error: ""
    };
  }

  checkFollow = user => {
    const jwt = isAuthenticated();
    const match = user.followers.find(follower => {
      //one id (user) has many other ids ( followers ) and vice versa
      return follower._id === jwt.user._id;
    });
    return match;
  };

  clickFollowButton = callApi => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    callApi(userId, token, this.state.user._id).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ user: data, following: !this.this.state.following });
      }
    });
  };

  checkUser() {
    let user = this.state.user;

    console.log(user);
    // if (this.state.user) {
    //   console.log(this.state.user);
    // } else if (!this.state.user) {
    //   console.log("USER IS NULL.");
    // }
  }

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
        console.log("Error.");
      } else {
        let following = this.checkFollow(data);
        this.setState({ user: data, following });
      }
    });
  };

  //Courtesy of Alex Zenin on july 10 2019
  shitcode = () => {
    return isAuthenticated().user &&
      isAuthenticated().user._id === this.state.user._id ? (
      <div className="d-inline-block mt-5 mb-5">
        <Link
          className="btn btn-raised btn-success mr-5"
          to={`/user/edit/${this.state.user._id}`}
        >
          Edit Profile
        </Link>
        <DeleteUser userId={this.state.user._id} />
      </div>
    ) : (
      <FollowProfileButton
        following={this.state.follow}
        onButtonClick={this.clickFollowButton}
      />
    );
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }
  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }
  renderUsersName() {
    const thisUser = this.state.user.name;
    if (this.state.user) {
      return (
        <p>
          {thisUser ? thisUser.firstName + " " : "loading"}{" "}
          {thisUser ? thisUser.lastName + " " : "loading"}
        </p>
      );
    }
  }

  render() {
    const { redirectToSignin, user } = this.state;

    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-6">
            <img style={profileImage} src={DefaultProfile} />
            <h2>Handle: @{user ? user.username + " " : "loading"}</h2>
            <h6>Email: {user ? user.email + " " : "loading"}</h6>
            {this.renderUsersName()}
          </div>
          <div className="col-md-6" />
          {user ? this.shitcode() : "Loading..."}
        </div>
      </div>
    );
  }
}

export default Profile;
