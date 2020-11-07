import React, { Component } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logoawhite from "../../img-new/icon-a-purple.svg";

// dummy image
import demothumb from "../../images/customer-thumb.png";

import "../userdashboard.scss";
import "./customers.scss";

import Error from "../../utils/Error";
// redux
import { connect } from "react-redux";
// Dispatch
import { saveLoginUserInfo } from "../../Redux/Action/Login";
import { showHideLoding } from "../../Redux/Action/Loading";
import Product from "../Product/productList";
import AddCustomer from "./addCustomer";
import UserOrderList from "../Product/userOrderList";
import UserProductionList from "../Production/userProductionList";
//api
import { GetUser } from "../../ApiActions/SignUp";
import { Link } from "react-router-dom";

class customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.loginUserInfo ? props.loginUserInfo.access_token : "",
      companyDetails: false,
      showProduct: false,
      userOrder: false,
      userProduction: false,
      showAddCustomer: false,
      active: "",
      userList: [],
      shippingData: []
    };
  }
  componentWillMount() {
    this.props.showHideLoding(false);
    this.GetUserList();
  }
  GetUserList = () => {
    // this.props.showHideLoader(false)
    this.props.showHideLoding(true);
    GetUser(this.state.token)
      .then(response => {
        this.props.showHideLoding(false);
        this.setState({ userList: response.data.data.userList });
        console.log("userList :" + JSON.stringify(this.state.userList));
      })
      .catch(err => {
        this.props.showHideLoding(false);
        //  this.props.showHideLoader(false)
      });
  };

  createCustomer = () => {
    this.setState({
      showAddCustomer: !this.state.showAddCustomer,
      showProduct: false,
      userOrder: false,
      userProduction: false
    });
  };

  render() {
    const {
      userList,
      active,
      companyDetails,
      showProduct,
      userOrder,
      userProduction,
      showAddCustomer,
      shippingData
    } = this.state;
    // alert(showProduct);
    return (
      <React.Fragment>
        <div className="row justify-content-between">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 loggedin-user-dashboard full-width d-flex flex-column">
            <div className="titlearea">
              <h3>
                Hey <span>Rick!</span>
                <br />
                :( Looks like you don’t have any customers yet.
              </h3>
            </div>

            <div className="bodyarea d-flex flex-column">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="row">
                  <div className="col-sm-12 col-md-12 col-lg-12 customers-module">
                    <h4>Your Customers</h4>

                    <div className="customers-listing">
                      <ul className="customer-lists d-flex flex-wrap">
                        {userList.map(user => (
                          <li className="customer-wrap">
                            <a
                              onClick={() =>
                                this.setState({
                                  companyDetails: !this.state.companyDetails,
                                  active: user.userId,
                                  showProduct: false,
                                  userOrder: false,
                                  userProduction: false,
                                  shippingData: user.shippingData
                                })
                              }
                              href="#"
                            >
                              <div className="customer-thumb">
                                <img
                                  src={
                                    user.profilePic
                                      ? user.profilePic
                                      : demothumb
                                  }
                                  alt={user.company[0].name}
                                  width="50"
                                />
                              </div>
                              <div className="customername">
                                <span>{user.company[0].name}</span>
                                <span className="del">
                                  <i className="icon-del"></i>
                                </span>
                              </div>
                            </a>

                            <div className="total-product-counter">
                              <span>{user.productData.length}</span>
                            </div>
                          </li>
                        ))}

                        <li>
                          <div className="btn-new-product">
                            <a
                              onClick={this.createCustomer}
                              className="add-fresh-trigger"
                              href="#"
                            >
                              Click here to start adding a customer
                            </a>
                          </div>

                          <div className="btn-new-icon">
                            <Link
                              to="#"
                              onClick={this.createCustomer}
                              className="trigger-btn-icon"
                            ></Link>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {userList.map(user => (
                    <div>
                      {companyDetails && user.userId == active ? (
                        <ul className="child-list">
                          <li>
                            <Link
                              to="#"
                              className={showProduct ? "active" : ""}
                              onClick={() =>
                                this.setState({
                                  showProduct: !this.state.showProduct,
                                  showAddCustomer: false,
                                  userOrder: false,
                                  userProduction: false
                                })
                              }
                            >
                              Products
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className={userProduction ? "active" : ""}
                              onClick={() =>
                                this.setState({
                                  userProduction: !this.state.userProduction,
                                  showAddCustomer: false,
                                  showProduct: false,
                                  userOrder: false
                                })
                              }
                            >
                              In Production
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className={userOrder ? "active" : ""}
                              onClick={() =>
                                this.setState({
                                  userOrder: !this.state.userOrder,
                                  showAddCustomer: false,
                                  showProduct: false,
                                  userProduction: false
                                })
                              }
                            >
                              Orders
                            </Link>
                          </li>
                        </ul>
                      ) : null}
                    </div>
                  ))}

                  {showAddCustomer ? <AddCustomer /> : null}
                  {showProduct ? (
                    <Product userId={active} shippingData={shippingData} />
                  ) : null}
                  {userOrder ? (
                    <UserOrderList
                      userId={active}
                      shippingData={shippingData}
                    />
                  ) : null}
                  {userProduction ? (
                    <UserProductionList userId={active} />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    loginUserInfo: state.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveLoginUserInfo: data => dispatch(saveLoginUserInfo(data)),
    showHideLoding: data => dispatch(showHideLoding(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(customer);
