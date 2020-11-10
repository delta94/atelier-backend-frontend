import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "../userdashboard.scss";
import "../activity-feed.scss";
import { showHideLoding } from "../../Redux/Action/Loading";
import logoawhite from "../../img-new/icon-a-white.svg";

// dummy images
import demothumb from "../../images/product-main-thumb.jpg";
import { GetProduct, GetCartUserList, GetOrder } from "../../ApiActions/Product";
import { GetUserProduction } from "../../ApiActions/Production";
import { saveLoginUserInfo } from "../../Redux/Action/Login";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userInfo: props.loginUserInfo,
      token: props.token ? props.token.token : "",
      productList: [],
      orerList: [],
      productionList: [],
      orerList: []
    };
  }

  UNSAFE_componentWillMount() {
    if (this.props.location.state !== null) {
      const { user, id } = this.props.location.state.params;
      this.GetProductList(id);
      this.GetOrderList(id);
      this.GetProductionList(id);
      // this.productDetail(productDetail, id);
    }
  }
  GetProductList = (id) => {
    this.props.showHideLoding(true);
    GetProduct(id, this.state.token)
      .then(response => {
        this.props.showHideLoding(false);
        this.setState({ productList: response.data.data.productsList });
      })
      .catch(err => {
        this.props.showHideLoding(false);
      });
  };

  GetProductionList = (id) => {
    this.props.showHideLoding(true);
    GetUserProduction(id, this.state.token)
      .then(response => {
        this.props.showHideLoding(false);
        this.setState({ productionList: response.data.data.productionList });
      })
      .catch(err => {
        this.props.showHideLoding(false);
      });
  };

  GetOrderList = (id) => {
    this.props.showHideLoding(true);
    GetCartUserList(id, this.state.token)
      .then(response => {
        this.props.showHideLoding(false);
        this.setState({ orerList: response.data.data.cartList });
      })
      .catch(err => {
        this.props.showHideLoding(false);
      });
  };
  addValue = event => {
    let eventValue = event;
    let temp = "";
    let nTemp = parseInt(eventValue);
    let count = 0;
    while (nTemp >= 1000) {
      count++;
      let val = nTemp % 1000;
      if (val === 0) {
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
  render() {
    const { productList, productionList, orerList } = this.state;
    return (
      <div className="row justify-content-between">
        <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 loggedin-user-dashboard d-flex flex-column">
          <div className="titlearea">
            <label>Customer: <span>Bear</span></label>
            <h3>
              Let's see what's happenning with <span>Bear</span> today.
            </h3>
          </div>

          <div className="bodyarea d-flex flex-column">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="row justify-content-between">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 product-listing-dashboard">
                  <h4><span>Bear</span> Products</h4>
                  <ul className="product-listing d-flex flex-column">
                  {productList.map(product => (<li key={product.productId} className="active">
                        <a href="/products">
                          <div className="product-thumb d-flex align-items-center justify-content-center">
                            <img src={ product.heroImage ? product.heroImage : "images/face-serun-60ml.png" } alt="bottle-img" />
                          </div>
                          <div className="product-title d-flex justify-content-between">
                            <div className="product-name">{product.name}</div>
                            <div className="product-qty">{product.volume}mL</div>
                          </div>
                        </a>
                      </li>))}
                      <li>
                        <div className="btn-new-product">
                          <a className="add-fresh-trigger" href="/products">
                            Click here to add a new product
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

                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 your-products-area">
                  <h4><span>Bear</span> Orders</h4>
                  <div className="products-order-module">
                    <ul className="row flex-column">
                      <li className="d-flex row-header">
                        <div className="col">Order No.</div>
                        <div className="col">Date</div>
                        <div className="col product">Product</div>
                        <div className="col amount">Amount</div>
                        <div className="col status">Status</div>
                      </li>
                      {orerList.map(order => (<li key={order.orderId} className="d-flex row-content">
                          <div className="col">{order.orderId}</div>
                          <div className="col">{order.insertDate}</div>
                          <div className="col product">{order.name}</div>
                          <div className="col amount">$
                            {this.addValue(
                              order.carbonAmount
                                ? order.carbonAmount +
                                    order.totalAmount -
                                    order.discount
                                : order.discount
                                ? order.totalAmount - order.discount
                                : order.totalAmount
                            )}{" "}</div>
                          <div className="col status"><span className={
                                order.status === "pending"
                                  ? "status-pending"
                                  : order.status === "inProduction"
                                  ? "status-inproduction"
                                  : "status-complete"
                              }>{order.status}</span></div>
                        </li>
                        ))}
                        {/* <li className="d-flex row-content">
                          <div className="col">00002</div>
                          <div className="col">22/06/20</div>
                          <div className="col product">Wonder</div>
                          <div className="col amount">$36,700</div>
                          <div className="col status"><span className="status-complete">Complete</span></div>
                        </li>
                        <li className="d-flex row-content">
                          <div className="col">00003</div>
                          <div className="col">22/06/20</div>
                          <div className="col product">Wonder</div>
                          <div className="col amount">$36,700</div>
                          <div className="col status"><span className="status-inproduction">In Production</span></div>
                        </li> */}
                    </ul>
                  </div>
                </div>

                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 product-listing-dashboard">
                  <h4>In Production</h4>
                  <ul className="product-listing">
                  {productionList.map(product => (<li key={product.productionId} className="active">
                        <a href="/production">
                          <div className="product-thumb d-flex align-items-center justify-content-center">
                            <img src="images/face-serun-60ml.png" alt="face-serun-60ml" />
                          </div>
                          <div className="product-title d-flex justify-content-between">
                            <div className="product-name">
                            {product.name}
                            </div>
                            <div className="product-qty">
                            {product.volume}mL
                            </div>
                          </div>
                        </a>
                      </li>))}
                  </ul>
                </div>
              </div>

              {/*<ToastContainer />*/}

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
                  <span>
                    <img src={demothumb} alt="demothumb" />
                  </span>
                </div>
                <div className="mta-product-feed">
                  <p>
                    Production on all components has been accepted on wonder.
                    Your product is in full production.
                  </p>
                  <div className="feed-track">
                    <Link to="#">Track Production Here</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="activityfeed">
              <div className="meta-day">Yesterday</div>
              <div className="meta-product-detail">
                <label>Harmony</label>
                <div className="mta-product-thumb">
                  <span>
                    <img src={demothumb} alt="demothumb" />
                  </span>
                </div>
                <div className="mta-product-feed">
                  <p>
                    Production on all components has been accepted on wonder.
                    Your product is in full production.
                  </p>
                  <div className="feed-track">
                    <Link to="#">Track Production Here</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="activityfeed">
              <div className="meta-day">2 Days Ago</div>
              <div className="meta-product-detail">
                <label>Perform</label>
                <div className="mta-product-thumb">
                  <span>
                    <img src={demothumb} alt="demothumb" />
                  </span>
                </div>
                <div className="mta-product-feed">
                  <p>
                    Production on all components has been accepted on wonder.
                    Your product is in full production.
                  </p>
                  <div className="feed-track">
                    <Link to="#">Track Production Here</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="activityfeed">
              <div className="meta-day">5 Days Ago</div>
              <div className="meta-product-detail">
                <label>Perform</label>
                <div className="mta-product-thumb">
                  <span>
                    <img src={demothumb} alt="demothumb" />
                  </span>
                </div>
                <div className="mta-product-feed">
                  <p>
                    Production on all components has been accepted on wonder.
                    Your product is in full production.
                  </p>
                  <div className="feed-track">
                    <Link to="#">Track Production Here</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="activityfeed">
              <div className="meta-day">Last Week</div>
              <div className="meta-product-detail">
                <label>Perform</label>
                <div className="mta-product-thumb">
                  <span>
                    <img src={demothumb} alt="demothumb" />
                  </span>
                </div>
                <div className="mta-product-feed">
                  <p>
                    Production on all components has been accepted on wonder.
                    Your product is in full production.
                  </p>
                  <div className="feed-track">
                    <Link to="#">Track Production Here</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="activityfeed">
              <div className="meta-day">3 Weeks Ago</div>
              <div className="meta-product-detail">
                <label>Perform</label>
                <div className="mta-product-thumb">
                  <span>
                    <img src={demothumb} alt="demothumb" />
                  </span>
                </div>
                <div className="mta-product-feed">
                  <p>
                    Production on all components has been accepted on wonder.
                    Your product is in full production.
                  </p>
                  <div className="feed-track">
                    <Link to="#">Track Production Here</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    showHideLoding: data => dispatch(showHideLoding(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
