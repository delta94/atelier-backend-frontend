import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./sidebar.scss";
import { apiCommonParams } from "../../ApiActions/DbConfig/ApiBaseUrl";
<<<<<<< HEAD
import { Link, useLocation } from "react-router-dom";
// import { GetCount } from '../../ApiActions/Product';
// import { saveOrderCount, saveProductioCount } from '../../Redux/Action/Product'
import { saveLoginUserInfo, saveToken } from "../../Redux/Action/Login";
// import { saveLoginUserInfo } from '../../Redux/Action/Login'
=======
import { saveLoginUserInfo } from "../../Redux/Action/Login";

>>>>>>> 432eb99e9778c378443f7003da7c8ae90ddf0224
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkUrl:false,
      // userInfo: props.loginUserInfo,
    };
  }

  componentWillReceiveProps(nextProps) {
<<<<<<< HEAD
    console.log(nextProps);
    if(window.location.pathname !== '/company'){
      this.setState({checkUrl:true,active:false});
    }

=======
>>>>>>> 432eb99e9778c378443f7003da7c8ae90ddf0224
  }

  logout = () => {
    let data = {};
    this.props.saveLoginUserInfo(data);
    this.props.saveToken(data);
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
<<<<<<< HEAD
    console.log(this.state.checkUrl, window.location.pathname)


    // const { userInfo } = this.state;
=======
>>>>>>> 432eb99e9778c378443f7003da7c8ae90ddf0224
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 432eb99e9778c378443f7003da7c8ae90ddf0224
              
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
    saveLoginUserInfo: data => dispatch(saveLoginUserInfo(data)),
    saveToken: data => dispatch(saveToken(data))
    // showHideLoding: (data) => dispatch(showHideLoding(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
