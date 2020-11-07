import React, { Component } from "react";
// redux
import { connect } from "react-redux";
// Dispatch
// import { saveOrderCount, saveProductioCount } from "../../Redux/Action/Product";
import { showHideLoding } from "../../Redux/Action/Loading";
//api


import logoawhite from '../../img-new/icon-a-white.svg';


import "./order-details.scss";

class order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProductDetails: false,
      showProductInfo: false,
      token: props.loginUserInfo ? props.loginUserInfo.access_token : "",
      orerList: [],
      productDetail: "",
      orderDetails: "",
      active: "",
      modelOpen: false,
      donationAmount: 0,
      donationCard: "",
      carbonAmount: 0,
      discount: 0,
      shippingModel:false,
      submitModel:false,
      confirmModelOk:false,

    };
  }
  componentWillMount() {
    //this.GetOrderList();
    //this.setState({ confirmModelOk:false });
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




  onCarbon = (e, quantity) => {
    let carbon = e * quantity;
    this.setState({ carbonAmount: carbon });
  };
  getDiscount = (e) => {
    let discount = parseFloat(e);
    this.setState({ discount });
  };
  render() {
    const { active, orerList, showProductInfo, orderDetails, discount } = this.state;
    let productionTime = 0;
    productionTime += parseInt(orderDetails.primaryPackaging ? orderDetails.primaryPackaging.productionTime : 0);
    productionTime += parseInt(orderDetails.secondaryPackaging ? orderDetails.secondaryPackaging.productionTime : 0);
    productionTime += parseInt(
      orderDetails.formulationPackaging ? orderDetails.formulationPackaging.productionTime : 0
    );
    // var someDate = new Date();
    // var numberOfDaysToAdd = 6;
    // someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    // var dd = someDate.getDate();
    // var mm = someDate.getMonth() + 1;
    // var y = someDate.getFullYear();
    // var deliverDate = dd + '/' + mm + '/' + y;
    // alert(deliverDate)
    let oderDate = "";
    var someDate = new Date();
    var dd = someDate.getDate() + productionTime;
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();
    oderDate = dd + "/" + mm + "/" + y;
    console.log("orderDetails :", JSON.stringify(orderDetails));
    return (
      // <div>

      <div className="row justify-content-between your-orders">

        {/* Note : details-active class will add only when user will click at any order in the orders list */}
        <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 loggedin-user-dashboard d-flex flex-column details-active">
          <div className="titlearea">
              <h3>Here's a look at your orders so far. <br />
                Process your order on the right when ready.
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
                          <div class="col">Order No.</div>
                          <div class="col">Date</div>
                          <div class="col product">Product</div>
                          <div class="col amount">Amount</div>
                          <div class="col status">Status</div>
                        </li>

                      </ul>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Note : show-order-details class will add only when user will click at any order in the orders list */}
        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 activity-feed show-order-details">
          <div className="order-details-wrap">
            <div className="activity-title">
              <span>Order Details</span>
              <img src={logoawhite} alt="alogo" />
            </div>

            <div className="order-panel">

            </div>

          </div>
        </div>
        


      

      </div>
      // </div>
    );
  }
}
// export default login;
const mapStateToProps = (state) => {
  return {
    loginUserInfo: state.login,
   // shippingDetails: state.shipping.shippingDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    showHideLoding: (data) => dispatch(showHideLoding(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(order);
