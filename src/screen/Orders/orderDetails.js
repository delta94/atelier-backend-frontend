import React, { Component } from "react";
// redux
import { connect } from "react-redux";
// Dispatch
// import { saveOrderCount, saveProductioCount } from "../../Redux/Action/Product";
import { showHideLoding } from "../../Redux/Action/Loading";
//api


import logoawhite from '../../img-new/icon-a-white.svg';


import "./order-details.scss";
import {GetCart} from "../../ApiActions/Product";

class order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.loginUserInfo ? props.loginUserInfo.access_token : "",
      companyDetails: false,
      cartList: [],
      showPop: false,
      discount: 0,
      orderDetails: "",
    };
  }
  componentWillMount() {
    this.props.showHideLoding(false);
    this.GetCartList();
  }
  GetCartList = () => {
    // this.props.showHideLoader(false)
    this.props.showHideLoding(true);
    GetCart(this.props.productId, this.state.token)
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
    const { cartList, companyDetails, showPop, orderDetails, active, discount } = this.state;
    console.log("cartList :", JSON.stringify(cartList));
    let productionTime = 0;
    productionTime += parseInt(orderDetails.primaryPackaging ? orderDetails.primaryPackaging.productionTime : 0);
    productionTime += parseInt(orderDetails.secondaryPackaging ? orderDetails.secondaryPackaging.productionTime : 0);
    productionTime += parseInt(
        orderDetails.formulationPackaging ? orderDetails.formulationPackaging.productionTime : 0
    );
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
                    <table className="table">
                      <thead>
                      <tr>
                        <th>Order#</th>
                        <th>Date Ordered</th>
                        <th>Status</th>
                        <th>Order Value</th>
                      </tr>
                      </thead>
                      <tbody>
                      {cartList.map((order, index) => (
                          <tr onClick={() => this.orderDetail(order)} className={order.cartId == active ? "active" : ""}>
                            <td>
                              <a href="#">
                                {order.status == "pending" ? <span className="numbertime">1</span> : null}
                                {order.orderId}
                              </a>
                            </td>
                            <td>
                              <a href="#">{order.insertDate}</a>
                            </td>
                            <td>
                              <a href="#" className="status capitalize">
                                {order.status}
                              </a>
                            </td>
                            <td>
                              <a href="#">
                                $
                                {this.addValue(
                                    order.carbonAmount
                                        ? order.carbonAmount + order.totalAmount - order.discount
                                        : order.discount
                                        ? order.totalAmount - order.discount
                                        : order.totalAmount
                                )}{" "}
                                AUD
                              </a>
                            </td>
                            {/* <td><a href="#"><span className="numbertime">1</span>01435</a></td> */}
                            {/* <td><a href="#">14 March 2019</a></td>
                                <td><a href="#" className="status">Pending</a></td>
                                <td><a href="#">39,050 AUD</a></td> */}
                          </tr>
                      ))}
                      </tbody>
                    </table>
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
