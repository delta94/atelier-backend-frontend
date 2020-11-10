import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { apiCommonParams } from "../../ApiActions/DbConfig/ApiBaseUrl";
import { saveCustomerInfo, saveLoginUserInfo, saveToken } from "../../Redux/Action/Login";
import "./sidebar.scss";
// import { GetCount } from '../../ApiActions/Product';
// import { saveOrderCount, saveProductioCount } from '../../Redux/Action/Product'
// import { saveLoginUserInfo } from '../../Redux/Action/Login'

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
    this.props.saveToken(data);
    let reduxData = JSON.parse(localStorage.getItem(`persist:${apiCommonParams.REDUX_STORE_KEY}`));
    let authReducer = JSON.parse(reduxData.login);
    authReducer.loginUserInfo.access_token = "";
    authReducer.access_token = "";
    reduxData.login = JSON.stringify(authReducer);
    localStorage.setItem(`persist:${apiCommonParams.REDUX_STORE_KEY}`, JSON.stringify(reduxData));
  };

  handleClick = link => {
    window.location.href = "productList";
  };

  render() {
    const active = window.location.pathname;

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
                <NavLink to="/company">Your Customers</NavLink>
              </li>
              {this.props.isCustomerLoaded && <div>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/products">All Products</NavLink>
                </li>
                <li>
                  <NavLink to="/production">In Production</NavLink>
                </li>
                <li>
                  <NavLink to="/orders">Customer Orders</NavLink>
                </li>
              </div>}
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

const mapStateToProps = state => {
  return {
    loginUserInfo: state.login,
    isCustomerLoaded: state.login.isCustomerLoaded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveLoginUserInfo: data => dispatch(saveLoginUserInfo(data)),
    saveCustomerInfo: data => dispatch(saveCustomerInfo(data)),
    saveToken: data => dispatch(saveToken(data))
    // showHideLoding: (data) => dispatch(showHideLoding(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
