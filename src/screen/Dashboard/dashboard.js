import React, { Component } from "react";
import "./dashboard.scss";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userInfo: props.loginUserInfo,
    };
  }

  render() {

    return (
      <div>
        This is the dashboard
      </div>
    );
  }
}

export default Dashboard;
