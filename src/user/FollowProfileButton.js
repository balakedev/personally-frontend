import React, { Component } from "react";
import { follow } from "./apiUser";
class FollowProfileButton extends Component {
  followClick = () => {
    this.props.onButtonClick(follow);
  };

  render() {
    return (
      <div className="d-inline-block mt-5">
        {!this.props.following ? (
          <button onClick={this.followClick}>Follow</button>
        ) : (
          <button>unfollow</button>
        )}
      </div>
    );
  }
}
export default FollowProfileButton;
