import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "../userdashboard.scss";
import "../activity-feed.scss";

import logoawhite from "../../img-new/icon-a-white.svg";

// dummy images
import demothumb from "../../images/product-main-thumb.jpg";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userInfo: props.loginUserInfo,
    };
  }

  render() {

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
                      <li className="active">
                        <a href="/products">
                          <div className="product-thumb d-flex align-items-center justify-content-center">
                            <img
                              src="images/face-serun-60ml.png" alt="bottle-img" />
                          </div>
                          <div className="product-title d-flex justify-content-between">
                            <div className="product-name">Wonder</div>
                            <div className="product-qty">60mL</div>
                          </div>
                        </a>
                      </li>
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
                      <li className="d-flex row-content">
                          <div className="col">00001</div>
                          <div className="col">22/06/20</div>
                          <div className="col product">Wonder</div>
                          <div className="col amount">$36,700</div>
                          <div className="col status"><span className="status-pending">Pending</span></div>
                        </li>
                        <li className="d-flex row-content">
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
                        </li>
                    </ul>
                  </div>
                </div>

                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 product-listing-dashboard">
                  <h4>In Production</h4>
                  <ul className="product-listing">
                      <li className="active">
                        <a href="/production">
                          <div className="product-thumb d-flex align-items-center justify-content-center">
                            <img src="images/face-serun-60ml.png" alt="face-serun-60ml" />
                          </div>
                          <div className="product-title d-flex justify-content-between">
                            <div className="product-name">
                              Face Serum
                            </div>
                            <div className="product-qty">
                              60mL
                            </div>
                          </div>
                        </a>
                      </li>
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

export default Dashboard;
