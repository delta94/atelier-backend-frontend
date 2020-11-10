import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import logoawhite from "../../img-new/icon-a-purple.svg";
import demothumb from "../../images/customer-thumb.png";
import "../userdashboard.scss";
import "./customers.scss";
import Error from "../../utils/Error";
import { connect } from "react-redux";
import { saveLoginUserInfo, saveCustomerInfo } from "../../Redux/Action/Login";
import { showHideLoding } from "../../Redux/Action/Loading";
import Product from "../Product/productList";
import AddCustomer from "./addCustomer";
import UserOrderList from "../Product/userOrderList";
import UserProductionList from "../Production/userProductionList";
import { GetUser } from "../../ApiActions/SignUp";
import { Link } from "react-router-dom";

class customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.token ? props.token.token : "",
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
    this.props.saveCustomerInfo(false);
    this.GetUserList();
  }

  GetUserList = () => {
    this.props.showHideLoding(true);
    GetUser(this.state.token)
      .then(response => {
        this.props.showHideLoding(false);
        this.setState({ userList: response.data.data.userList });
        // console.log("userList :" + JSON.stringify(this.state.userList));
      })
      .catch(err => {
        this.props.showHideLoding(false);
      });
  };

  selectCustomer = (value) => {
    this.props.saveCustomerInfo(true);
    this.setState({
      companyDetails: !this.state.companyDetails,
      active: value.userId,
      showProduct: false,
      userOrder: false,
      userProduction: false,
      shippingData: value.shippingData
    });
    this.props.history.push("/dashboard");
  }

  createCustomer = () => {
    this.setState({
      showAddCustomer: !this.state.showAddCustomer,
      showProduct: false,
      userOrder: false,
      userProduction: false
    });
  };

  showAddCustomerToast = (ev) => {
    this.setState({
      showAddCustomer: false
    })
  }

  render() {
    const { userList, active, companyDetails, showProduct, userOrder, userProduction, showAddCustomer, shippingData } = this.state;
console.log("userList :", userList)
    return (
      <React.Fragment>
        <div className="row justify-content-between">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 loggedin-user-dashboard full-width d-flex flex-column">
            <div className="titlearea">
              <h3>
                Hey <span>Rick!</span>
                <br />
                :( Looks like you don’t have any customers yet.
              </h3>
            </div>
            <div className="bodyarea d-flex flex-column">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12 customers-module">
                    <h4>Your Customers</h4>
                    <div className="customers-listing">
                      <ul className="customer-lists d-flex flex-wrap">
                        {userList.map(user => (
                          <li className="customer-wrap" key={user.userId}>
                            {/* <a
                              onClick={() => this.selectCustomer(user)}
                              href="#"
                            > */}
                            <Link to={{ state: { params: { user: user, id: user.userId } } }} onClick={() => this.selectCustomer(user)} >
                              <div className="customer-thumb">
                                <img
                                  src={
                                    user.profilePic
                                      ? user.profilePic
                                      : demothumb
                                  }
                                  alt="{/*{user.company[0].name}*/}"
                                  width="50"
                                />
                              </div>
                              <div className="customername">
                                <span>{user.company.length > 0? user.company[0].name:''}</span>
                                <span className="del">
                                  <i className="icon-del"></i>
                                </span>
                              </div>
                              </Link>
                            {/* </a> */}
                            <div className="total-product-counter">
                              <span>10{/*{user.productData.length}*/}</span>
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
                    <div key={user.userId}>
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

                  {showAddCustomer ? <AddCustomer showAddCustomer={this.showAddCustomerToast}/> : null}
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
    loginUserInfo: state.login,
    token: state.login.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveLoginUserInfo: data => dispatch(saveLoginUserInfo(data)),
    saveCustomerInfo: data => dispatch(saveCustomerInfo(data)),
    showHideLoding: data => dispatch(showHideLoding(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(customer);
