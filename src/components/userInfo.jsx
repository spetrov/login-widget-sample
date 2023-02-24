import React, { Component } from "react";

class UserInfo extends Component {
  state = {
    user: {
      username: "Please, login",
    },
  };
  render() {
    return (
      <React.Fragment>
        <span>{this.state.user}</span>
        <button>"Logout"</button>
      </React.Fragment>
    );
  }
}

export default UserInfo;
