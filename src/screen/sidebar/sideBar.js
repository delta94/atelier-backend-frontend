import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./sidebar.scss";
import { apiCommonParams } from "../../ApiActions/DbConfig/ApiBaseUrl";
import { saveLoginUserInfo } from "../../Redux/Action/Login";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userInfo: props.loginUserInfo,
    };
  }
  componentWillReceiveProps(nextProps) {
  }

  logout = () => {
    let data = {};
    this.props.saveLoginUserInfo(data);
    let reduxData = JSON.parse(localStorage.getItem(`persist:${apiCommonParams.REDUX_STORE_KEY}`));
    let authReducer = JSON.parse(reduxData.login);
    authReducer.loginUserInfo.access_token = "";
    authReducer.access_token = "";
    // console.log(JSON.stringify(authReducer));
    reduxData.login = JSON.stringify(authReducer);
    localStorage.setItem(`persist:${apiCommonParams.REDUX_STORE_KEY}`, JSON.stringify(reduxData));
  };

  handleClick = link => {
    window.location.href = "productList";
  };

  render() {
    let active = window.location.pathname;

    return (
      <div className="col-sm-3 col-md-3 col-lg-2 left-content d-flex flex-column justify-content-between">
        <div className="left-content-header">
          <div className="user-data text-center">
            <div className="user-thumb">
              <img src="images/admin-thumb.png" alt="admin-thumb" />
            </div>
            <div className="profile-name d-flex flex-column">
              <span className="user-name">Cat Tsang</span>
              <span className="company-name">
                <strong>Atelier</strong>
              </span>
            </div>
          </div>
          <div className="platform-nav">
            <ul>
              <li>
                <Link to="/company">Your Customers</Link>
              </li>
              <li>
                <Link to="/products">All Products</Link>
              </li>
              <li>
                <Link to="/production">In Production</Link>
              </li>
              <li>
                <Link to="/orders">Customer Orders</Link>
              </li>
              
            </ul>
          </div>
        </div>
        <div className="left-content-footer">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a onClick={this.logout} className="nav-link" href="login">
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

// export default SideBar
const mapStateToProps = state => {
  return {
    loginUserInfo: state.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveLoginUserInfo: data => dispatch(saveLoginUserInfo(data))
    // showHideLoding: (data) => dispatch(showHideLoding(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
