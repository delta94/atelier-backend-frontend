import React, { Component } from "react";
// redux
import { connect } from "react-redux";

// stylesheet
import "./sidebar.scss";

// Dispatch
import { apiCommonParams } from "../../ApiActions/DbConfig/ApiBaseUrl";

// import { GetCount } from '../../ApiActions/Product';
// import { saveOrderCount, saveProductioCount } from '../../Redux/Action/Product'
import { saveLoginUserInfo, saveToken } from "../../Redux/Action/Login";
// import { saveLoginUserInfo } from '../../Redux/Action/Login'
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userInfo: props.loginUserInfo,
    };
  }
  componentWillReceiveProps(nextProps) {
    // alert(nextProps)
  }
  logout = () => {
    // alert(JSON.stringify(this.props.loginUserInfo))
    // let data = {}
    // this.props.saveLoginUserInfo(data);
    let data = {};
    this.props.saveLoginUserInfo(data);
    this.props.saveToken(data);
    let reduxData = JSON.parse(localStorage.getItem(`persist:${apiCommonParams.REDUX_STORE_KEY}`));
    debugger;
    let authReducer = JSON.parse(reduxData.login);
    authReducer.loginUserInfo.access_token = "";
    authReducer.access_token = "";
    // authReducer = ""
    console.log(JSON.stringify(authReducer));
    reduxData.login = JSON.stringify(authReducer);
    localStorage.setItem(`persist:${apiCommonParams.REDUX_STORE_KEY}`, JSON.stringify(reduxData));
  };
  handleClick = link => {
    window.location.href = "productList";
  };
  render() {
    console.log(window.location.pathname);
    // const { userInfo } = this.state;
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
                <a className={active === "/company" ? "active" : ""} href="company">
                  Your Customers
                </a>
              </li>
              
              <li>
                <a href="#">Dashboard</a>
              </li>

              <li>
                <a href="#">All Products</a>
              </li>
              <li>
                <a href="#">In Production</a>
              </li>
              <li>
                <a href="#">Customer Orders</a>
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

// export default SideBar dasda
const mapStateToProps = state => {
  return {
    loginUserInfo: state.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveLoginUserInfo: data => dispatch(saveLoginUserInfo(data)),
    saveToken: data => dispatch(saveToken(data))
    // showHideLoding: (data) => dispatch(showHideLoding(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
