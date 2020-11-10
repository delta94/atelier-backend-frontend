import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./order-details.scss";
import "../activity-feed.scss";

// dummy images
import logoawhite from "../../img-new/icon-a-white.svg";
import demothumb from '../../images/product-main-thumb.jpg';

import Error from "../../utils/Error";

// redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Dispatch
import { saveLoginUserInfo } from "../../Redux/Action/Login";
import { showHideLoding } from "../../Redux/Action/Loading";

//api
import { GetCartUserList } from "../../ApiActions/Product";

class order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.token ? props.token.token : "",
      companyDetails: false,
      cartList: [],
      /////

      showProductDetails: false,
      showProductInfo: false,
      orerList: [],
      productDetail: "",
      orderDetails: "",
      active: "",
      modelOpen: false,
      donationAmount: 0,
      donationCard: "",
      carbonAmount: 0,
      discount: 0,
      showPop: false,
    };
  }
  componentWillMount() {
    this.props.showHideLoding(false);
    this.GetCartList();
  }
  GetCartList = () => {
    // this.props.showHideLoader(false)
    this.props.showHideLoding(true);
    GetCartUserList(this.props.userId, this.state.token)
      .then((response) => {
        this.props.showHideLoding(false);
        this.setState({ cartList: response.data.data.cartList });
        console.log("productList :" + JSON.stringify(response.data.data.cartList));
      })
      .catch((err) => {
        this.props.showHideLoding(false);
        //  this.props.showHideLoader(false)
      });
  };
  addValue = (event) => {
    let eventValue = event;
    let temp = "";
    let nTemp = parseInt(eventValue);
    let count = 0;
    while (nTemp >= 1000) {
      count++;
      let val = nTemp % 1000;
      if (val == 0) {
        temp = ",000" + temp;
      } else if (val < 10) {
        temp = ",00" + val + temp;
      } else if (val < 100) {
        temp = ",0" + val + temp;
      } else {
        temp = "," + val + temp;
      }
      nTemp = parseInt(nTemp / 1000);
    }
    temp = nTemp + temp;
    return temp;
  };
  orderDetail = (orderDetails) => {
    // alert(JSON.stringify(orderDetails))
    this.setState({
      showPop: true,
      orderDetails: orderDetails,
      active: orderDetails.cartId,
      discount: orderDetails.discount,
    });
    // let quantity = this.addValue(orderDetails.quantity);
    // alert(quantity);
  };
  render() {
    const { shippingData } = this.props;
    const { cartList, showProductInfo, showPop, orderDetails, active, discount } = this.state;
    let productionTime = 0;
    productionTime += parseInt(orderDetails.primaryPackaging ? orderDetails.primaryPackaging.productionTime : 0);
    productionTime += parseInt(orderDetails.secondaryPackaging ? orderDetails.secondaryPackaging.productionTime : 0);
    productionTime += parseInt(
      orderDetails.formulationPackaging ? orderDetails.formulationPackaging.productionTime : 0
    );
    return (
      // <div className="row">
      <React.Fragment>
        <div className="row justify-content-between your-orders">
          <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 loggedin-user-dashboard d-flex flex-column showProductInfo">
            <div className="titlearea">
              <h3>
                Customer's Current Order
              </h3>
            </div>

            <div className="bodyarea d-flex flex-column">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="row justify-content-between">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding">
                    <h4>Your Orders</h4>
                    <div className="products-order-module">
                      <ul className="row flex-column">
                        <li className="d-flex row-header">
                          <div className="col">Order No.</div>
                          <div className="col">Date</div>
                          <div className="col product">Product</div>
                          <div className="col amount">Amount</div>
                          <div className="col status">Status</div>
                        </li>
                        {cartList.map((order, index) => (
                          <li
                            onClick={() => this.orderDetail(order)}
                            className={order.cartId == active ? "d-flex row-content active"
                              : "d-flex row-content"
                            }
                            key={index}
                            >

                              <div className="col">{order.orderId}</div>
                              <div className="col">{order.insertDate}</div>
                              <div className="col product">{order.name}</div>
                              <div className="col amount">
                                $
                                {this.addValue(
                                  order.carbonAmount
                                    ? order.carbonAmount +
                                        order.totalAmount -
                                        order.discount
                                    : order.discount
                                    ? order.totalAmount - order.discount
                                    : order.totalAmount
                                )}{" "}
                                AUD
                              </div>
                              <div className="col status">
                                <span
                                  className={
                                    order.status === "pending"
                                      ? "status-pending"
                                      : order.status === "inProduction"
                                      ? "status-inproduction"
                                      : "status-complete"
                                  }
                                >
                                  {order.status}
                                </span>
                              </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 activity-feed">
            <div className="activity-title">
              <span>Activity Feed</span>
              <img src={logoawhite} alt="alogo" /> 
            </div>

            <div className="feed-wrapper">

              <div className="activityfeed">
                <div className="meta-day">Today</div>
                <div className="meta-product-detail">
                  <label>Wonder</label>
                  <div className="mta-product-thumb">
                    <span><img src={demothumb} alt="demothumb" /></span>
                  </div>
                  <div className="mta-product-feed">
                    <p>Production on all components has been accepted on wonder. Your product is in full production.</p>
                    <div className="feed-track">
                      <Link to='/production'>Track Production Here</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="activityfeed">
                <div className="meta-day">Yesterday</div>
                <div className="meta-product-detail">
                  <label>Harmony</label>
                  <div className="mta-product-thumb">
                    <span><img src={demothumb} alt="demothumb" /></span>
                  </div>
                  <div className="mta-product-feed">
                    <p>Production on all components has been accepted on wonder. Your product is in full production.</p>
                    <div className="feed-track">
                      <Link to='/production'>Track Production Here</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="activityfeed">
                <div className="meta-day">2 Days Ago</div>
                <div className="meta-product-detail">
                  <label>Perform</label>
                  <div className="mta-product-thumb">
                    <span><img src={demothumb} alt="demothumb" /></span>
                  </div>
                  <div className="mta-product-feed">
                    <p>Production on all components has been accepted on wonder. Your product is in full production.</p>
                    <div className="feed-track">
                      <Link to='/production'>Track Production Here</Link>
                    </div>
                  </div>
                </div>
              </div>


              <div className="activityfeed">
                <div className="meta-day">5 Days Ago</div>
                <div className="meta-product-detail">
                  <label>Perform</label>
                  <div className="mta-product-thumb">
                    <span><img src={demothumb} alt="demothumb" /></span>
                  </div>
                  <div className="mta-product-feed">
                    <p>Production on all components has been accepted on wonder. Your product is in full production.</p>
                    <div className="feed-track">
                      <Link to='/production'>Track Production Here</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="activityfeed">
                <div className="meta-day">Last Week</div>
                <div className="meta-product-detail">
                  <label>Perform</label>
                  <div className="mta-product-thumb">
                    <span><img src={demothumb} alt="demothumb" /></span>
                  </div>
                  <div className="mta-product-feed">
                    <p>Production on all components has been accepted on wonder. Your product is in full production.</p>
                    <div className="feed-track">
                      <Link to='/production'>Track Production Here</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="activityfeed">
                <div className="meta-day">3 Weeks Ago</div>
                <div className="meta-product-detail">
                  <label>Perform</label>
                  <div className="mta-product-thumb">
                    <span><img src={demothumb} alt="demothumb" /></span>
                  </div>
                  <div className="mta-product-feed">
                    <p>Production on all components has been accepted on wonder. Your product is in full production.</p>
                    <div className="feed-track">
                      <Link to='/production'>Track Production Here</Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </React.Fragment>
      // {/* </div> */}
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loginUserInfo: state.login,
    token: state.login.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveLoginUserInfo: (data) => dispatch(saveLoginUserInfo(data)),
    showHideLoding: (data) => dispatch(showHideLoding(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(order);
