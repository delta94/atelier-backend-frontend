import React, { Component } from "react";
import { connect } from "react-redux";
import { saveLoginUserInfo } from "../../Redux/Action/Login";
import { showHideLoding } from "../../Redux/Action/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logoawhite from '../../img-new/icon-a-white.svg';

// dummy images
import demothumb from '../../images/product-main-thumb.jpg';

import "./activity-feed.scss";

class homeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProductDetails: false,
      showProductInfo: false,
      showReOrder: false,
      token: props.loginUserInfo ? props.loginUserInfo.access_token : "",
      productList: [],
      productionList: [],
      orerList: [],
      productDetail: "",
      productInfo: "",
      active: "",
      modelOpen: false,
      productOrder: {},
      units: 0,
    };
  }


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
  render() {
    const { active, productList, productionList, orerList } = this.state;
    return (

      <div className="row justify-content-between">
          <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 loggedin-user-dashboard d-flex flex-column">
            <div className="titlearea">
              <h3>
                Hey <span>Rick!</span>
                <br />
                :( Looks like you don’t have any customers yet.
                Dashboard page
              </h3>
            </div>

            <div className="bodyarea d-flex flex-column">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="row justify-content-between">
                  <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 product-listing-dashboard">
                      <h4>Your Products</h4>

                  </div>

                  <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 your-products-area">
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

                      </ul>
                    </div>
                  </div>

                  <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 product-listing-dashboard">
                      <h4>In Production</h4>
                      <ul className="product-listing">

                      </ul>
                  </div>
                </div>

                

                <ToastContainer />
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
                      <a href="#">Track Production Here</a>
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
                      <a href="#">Track Production Here</a>
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
                      <a href="#">Track Production Here</a>
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
                      <a href="#">Track Production Here</a>
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
                      <a href="#">Track Production Here</a>
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
                      <a href="#">Track Production Here</a>
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

// export default login;
const mapStateToProps = (state) => {
  return {
    loginUserInfo: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveLoginUserInfo: (data) => dispatch(saveLoginUserInfo(data)),
    //saveOrderCount: (data) => dispatch(saveOrderCount(data)),
    showHideLoding: data => dispatch(showHideLoding(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(homeScreen);
