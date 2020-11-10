import React, { Component } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Error from "../../utils/Error";
// redux
import { connect } from "react-redux";
// Dispatch
import { saveLoginUserInfo } from "../../Redux/Action/Login";
import { showHideLoding } from "../../Redux/Action/Loading";
//api
import { GetCart } from "../../ApiActions/Product";

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
      <React.Fragment>
        <div className="col-sm-12 col-md-5 col-lg-5 your-order ml-15">
          <div className="order-table-wrap">
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
        {/* // <!-- order details popup start here --> */}
        {showPop ? (
          <div className="order-details-popup">
            <div className="col-sm-12 col-md-6 col-lg-6 order-last order-detail-frontend">
              <div className="orderstatus">
                <a className="capitalize" href="#">
                  Order Status: {orderDetails.productStatus}
                </a>
                <span>Not Yet Paid</span>
              </div>
              <div className="Orderstestings">
                <a onClick={() => this.setState({ showPop: !this.state.showPop })} href="#" className="trigger-close-pop">
                  x
                </a>
                <h3>Orders #{orderDetails.orderId}</h3>
                <div className="sectionone">
                  <div className="Product_Details">
                    <p>Product Details</p>
                    <div className="thumb">
                      <a href="#">
                        <img
                          src={orderDetails.heroImage ? orderDetails.heroImage : "images/face-serun-60ml.png"}
                          alt="package-thumb1"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="product-meta-detail">
                    <div className="Product Name">
                      <p>Product Name</p>
                      <p>{orderDetails.name}</p>
                    </div>
                    <div className="Quantity">
                      <p>Quantity</p>
                      <p>{this.addValue(orderDetails.quantity)}</p>
                    </div>
                    <div className="Amount">
                      <p>Amount</p>
                      <p className="price">
                        $
                        {this.addValue(
                          orderDetails.carbonAmount
                            ? orderDetails.carbonAmount + orderDetails.totalAmount - discount
                            : discount
                            ? orderDetails.totalAmount - discount
                            : orderDetails.totalAmount
                        )}{" "}
                        AUD
                      </p>
                    </div>
                  </div>
                </div>
                <div className="sectiononetwo">
                  <div className="Production-wrap">
                    <h4>
                      Production <br /> Timeline
                    </h4>
                    <div className="Production1">
                      <p>Primary Packaging</p>
                      <p>Secoundary Packaging</p>
                      <p>Formulation Packaging</p>
                    </div>
                  </div>
                  <div className="Product days">
                    <h4>{productionTime} days</h4>
                    <div className="Product_days1">
                      <p> {orderDetails.primaryPackaging ? orderDetails.primaryPackaging.productionTime : 0} days</p>
                      <p>{orderDetails.secondaryPackaging ? orderDetails.secondaryPackaging.productionTime : 0} days</p>
                      <p>
                        {" "}
                        {orderDetails.formulationPackaging ? orderDetails.formulationPackaging.productionTime : 0} days
                      </p>
                    </div>
                  </div>
                  <div className="imagestop">
                    <div className="thumb imagestop">
                      <a href="#">
                        <img src="https://ateli-front.herokuapp.com/images/alert-icon.svg" alt="package-thumb1" />
                      </a>
                    </div>
                    <p>
                      If you order
                      <br /> now your {orderDetails.bottleName} will
                      <br /> land in your
                      <br /> warehouse by
                      <br /> november 15th
                    </p>
                  </div>
                  <div className="Shipping">
                    <h4>
                      Shipping <br /> Address
                    </h4>
                    <p>{shippingData.length > 0 ? shippingData[0].warehouseAddress : ""}</p>
                  </div>
                </div>
                <div className="sectiononethree">
                  {/* <div className="ProductionTimeline">
                                <h4>Payment <br/> Terms</h4>
                                  <label>
                                    <input type="radio" className="option-input radio" name="example" value="0"/>
                                      <span>50% deposit, 50% before delivery</span>
                                  </label>
                                  <label>
                                    <input type="radio" className="option-input radio texting" name="example" value="126500"/>
                                      <span className="radio-text">Upfront with a 5% discount<br/> Save {(orderDetails.totalAmount * 5) / 100} AUD </span>
                                  </label>
                                </div> */}
                  <div className="ProductionTimeline">
                    <h4>
                      Payment <br /> Terms
                    </h4>
                    <label>
                      {orderDetails.status === "submitted" ? (
                        <input
                          disabled
                          checked={this.state.discount == 0 || orderDetails.discount == 0 ? true : false}
                          value="0"
                          type="radio"
                          className="option-input radio"
                          name="example"
                        />
                      ) : (
                        <input
                          disabled
                          checked={this.state.discount == 0 || orderDetails.discount == 0 ? true : false}
                          value="0"
                          type="radio"
                          className="option-input radio"
                          name="example"
                          // onChange={e => this.getDiscount(e.target.value)}
                        />
                      )}
                      <span>50% deposit, 50% before delivery</span>
                    </label>
                    <label>
                      {orderDetails.status === "submitted" ? (
                        <input
                          disabled
                          checked={this.state.discount > 0 || orderDetails.discount > 0 ? true : false}
                          value={(orderDetails.totalAmount * 5) / 100}
                          type="radio"
                          className="option-input radio texting"
                          name="example"
                        />
                      ) : (
                        <input
                          disabled
                          checked={this.state.discount > 0 || orderDetails.discount > 0 ? true : false}
                          value={(orderDetails.totalAmount * 5) / 100}
                          type="radio"
                          className="option-input radio texting"
                          name="example"
                          // onChange={e => this.getDiscount(e.target.value)}
                        />
                      )}
                      <span className="radio-text">
                        Upfront with a 5% discount
                        <br /> Save {(orderDetails.totalAmount * 5) / 100} AUD{" "}
                      </span>
                    </label>
                  </div>
                  <div className="Productdayss">
                    <h4>
                      Payment <br /> Method
                    </h4>
                    <p>Standard Chartered</p>
                    <a href="#">
                      <img src="images/round.png" alt="package-thumb1" />
                    </a>
                    <span>ending 4444</span>
                  </div>
                  <div className="ShippingAddress">
                    <h4>
                      Billing <br /> Address
                    </h4>
                    <div className="ShippingWilliam">
                      <p>Rajdhani Enclave, Kharar</p>
                    </div>
                  </div>
                </div>
                {/* <div className="plant_tress">
                                    <div className="plant_tress1">
                                      <h2>Plant Trees</h2>
                                        <p> If you select this 495 Tress will be planted, thanks to you.<label>
                                          <input type="radio" className="option-input radio texting" name="donation1" value="plant1"/>
                                          </label>
                                        </p>
                                  </div>
                              </div> */}
                {orderDetails.status == "submitted" && orderDetails.donationCard == "" ? null : (
                  <div className="plant_tress">
                    {!orderDetails.donationCard || orderDetails.donationCard == "plant" ? (
                      <div className="plant_tress1">
                        <h2>Plant Trees</h2>
                        <p>
                          {" "}
                          If you select this 495 Tress will be planted, thanks to you.
                          <label>
                            <input
                              readOnly
                              checked
                              type="radio"
                              value="plant1"
                              className="option-input radio texting"
                              name="donation1"
                            />
                          </label>
                        </p>
                      </div>
                    ) : null}
                    {!orderDetails.donationCard || orderDetails.donationCard == "plastic" ? (
                      <div className="harvest">
                        <h2>Harvest Ocean Plastic </h2>
                        <p>
                          {" "}
                          If you select this, 1.0 tonne of ocean plastic will be harvested thanks to you.
                          <label>
                            <input
                              disabled
                              value="plastic1"
                              checked
                              type="radio"
                              className="option-input radio texting"
                              name="donation1"
                            />
                          </label>
                        </p>
                      </div>
                    ) : null}
                    {!orderDetails.donationCard || orderDetails.donationCard == "housing" ? (
                      <div className="housing">
                        <h2>Sustainable Housing</h2>
                        <p>
                          {" "}
                          If you select this $450 will be donated to New House.
                          <label>
                            <input
                              disabled
                              for="housing1"
                              checked
                              type="radio"
                              className="option-input radio texting"
                              name="donation1"
                            />
                          </label>
                        </p>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </React.Fragment>
      // {/* <!-- order details popup end here --> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(order);
