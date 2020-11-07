import React, { Component } from "react";
// redux
import { connect } from "react-redux";

// stylesheet
import "./sidebar.scss";

// Dispatch
import { apiCommonParams } from "../../ApiActions/DbConfig/ApiBaseUrl";
import { Link, useLocation } from "react-router-dom";
// import { GetCount } from '../../ApiActions/Product';
// import { saveOrderCount, saveProductioCount } from '../../Redux/Action/Product'
import { saveLoginUserInfo } from "../../Redux/Action/Login";
// import { saveLoginUserInfo } from '../../Redux/Action/Login'
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkUrl:false,
      // userInfo: props.loginUserInfo,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if(window.location.pathname !== '/company'){
      this.setState({checkUrl:true,active:false});
    }

  }
  logout = () => {
    // alert(JSON.stringify(this.props.loginUserInfo))
    // let data = {}
    // this.props.saveLoginUserInfo(data);
    let data = {};
    this.props.saveLoginUserInfo(data);
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
    console.log(this.state.checkUrl, window.location.pathname)


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
              <li onClick={() =>
                  this.setState({
                    checkUrl: !this.state.checkUrl,
                  })
              } >
              <Link className={active === "/company" ? "active" : ""}  to={{ pathname: "/company", }} >
                Your Customers
              </Link>
              </li>
              {this.state.checkUrl === true && <li>
                <Link to={{ pathname: "/dashboard", }} >
                  Dashboard
                </Link>
              </li> }


              {this.state.checkUrl === true && <li>
                <Link to={{ pathname: "/productList", }} >
                  All Products
                </Link>
              </li>}
              {this.state.checkUrl === true &&<li>
                <Link to={{ pathname: "/production", }} >
                  In Production{" "}
                  {this.props.product && this.props.product.inProductionCount > 0 ? (
                      <span className="number">{this.props.product.inProductionCount}</span>
                  ) : (
                      ""
                  )}
                </Link>
              </li>}
              {this.state.checkUrl === true &&<li>
                <Link to={{ pathname: "/oderDetails", }} >
                  Your Orders{" "}
                  {this.props.product && this.props.product.saveOrderCount > 0 ? (
                      <span className="number">{this.props.product.saveOrderCount}</span>
                  ) : (
                      ""
                  )}
                </Link>
              </li>}
              
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
