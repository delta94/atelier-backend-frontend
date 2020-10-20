import React, { Component } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      shippingData: [],
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
      .then((response) => {
        this.props.showHideLoding(false);
        this.setState({ userList: response.data.data.userList });
        console.log("userList :" + JSON.stringify(this.state.userList));
      })
      .catch((err) => {
        this.props.showHideLoding(false);
        //  this.props.showHideLoader(false)
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
      shippingData,
    } = this.state;
    // alert(showProduct);
    return (
      <React.Fragment>
        <div class="col-sm-12 col-md-8 col-lg-8 right-content account-panel">
          <div class="row">
            <div className="col-sm-12 col-md-2 col-lg-2 customers-module">
              <div className="btn-new-product">
                <a
                  onClick={() =>
                    this.setState({
                      showAddCustomer: !this.state.showAddCustomer,
                      showProduct: false,
                      userOrder: false,
                      userProduction: false,
                    })
                  }
                  className="btn-module-black"
                  href="#"
                >
                  New Customer
                </a>
              </div>
              <div className="customers-listing">
                <ul>
                  {userList.map((user) => (
                    <li className="first-parent">
                      <a
                        onClick={() =>
                          this.setState({
                            companyDetails: !this.state.companyDetails,
                            active: user.userId,
                            showProduct: false,
                            userOrder: false,
                            userProduction: false,
                            shippingData: user.shippingData,
                          })
                        }
                        href="#"
                      >
                        {user.company[0].name}
                      </a>
                      {companyDetails && user.userId == active ? (
                        <ul className="child-list">
                          <li>
                            <a
                              className={showProduct ? "active" : ""}
                              onClick={() =>
                                this.setState({
                                  showProduct: !this.state.showProduct,
                                  showAddCustomer: false,
                                  userOrder: false,
                                  userProduction: false,
                                })
                              }
                              href="#"
                            >
                              Products
                            </a>
                          </li>
                          <li>
                            <a
                              className={userProduction ? "active" : ""}
                              onClick={() =>
                                this.setState({
                                  userProduction: !this.state.userProduction,
                                  showAddCustomer: false,
                                  showProduct: false,
                                  userOrder: false,
                                })
                              }
                              href="#"
                            >
                              In Production
                            </a>
                          </li>
                          <li>
                            <a
                              className={userOrder ? "active" : ""}
                              onClick={() =>
                                this.setState({
                                  userOrder: !this.state.userOrder,
                                  showAddCustomer: false,
                                  showProduct: false,
                                  userProduction: false,
                                })
                              }
                              href="#"
                            >
                              Orders
                            </a>
                          </li>
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {showAddCustomer ? <AddCustomer /> : null}
            {showProduct ? <Product userId={active} shippingData={shippingData} /> : null}
            {userOrder ? <UserOrderList userId={active} shippingData={shippingData} /> : null}
            {userProduction ? <UserProductionList userId={active} /> : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loginUserInfo: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveLoginUserInfo: (data) => dispatch(saveLoginUserInfo(data)),
    showHideLoding: (data) => dispatch(showHideLoding(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(customer);
