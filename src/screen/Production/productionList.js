import React, { Component } from "react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Error from "../../utils/Error";
// redux
import { connect } from "react-redux";
// Dispatch
import { saveLoginUserInfo } from "../../Redux/Action/Login";
import { showHideLoding } from "../../Redux/Action/Loading";
//api
import Child from "./ProductionDetails";
import { GetProduction, UpdateStatus, UpdateDelayStatus, GetProductionDetails } from "../../ApiActions/Production";
import api from "../../ApiActions/DbConfig/ApiActions";
// const customStyles = {
//   option: (provided, state) => ({
//     ...provided,
//     margin: 6,
//     background: "#000",
//     padding: 15,
//   }),
// };
// const customStyles = {
//   menu: (provided, state) => ({
//     ...provided,
//     width: state.selectProps.width,
//     borderBottom: "1px dotted pink",
//     color: state.selectProps.menuColor,
//   }),

//   control: (_, { selectProps: { width } }) => ({
//     width: width,
//   }),

//   singleValue: (provided, state) => {
//     const opacity = state.isDisabled ? 0.5 : 1;
//     const transition = "opacity 300ms";

//     return { ...provided, opacity, transition };
//   },
// };
class production extends Component {
  constructor(props) {
    super(props);
    // this.child = React.createRef();
    this.state = {
      token: props.loginUserInfo ? props.loginUserInfo.access_token : "",
      showProductionDetails: false,
      productionList: [],
      productionId: "",
      productName: "",
      primaryOptions: [
        { value: "inProduction", label: "Order Status: In Production", id: "inProduction", color: "red" },
        { value: "delayed", label: "Order Status: Delayed", id: "delayed", color: "blue" },
        { value: "onTime", label: "Order Status: On Time", id: "onTime" },
        { value: "delivered", label: "Order Status: Delivered", id: "delivered" },
      ],
      primarySelectedOption: null,
      showMessage: false,
      showTrack: false,
      showSecondTrack: false,
      showFormulationTrack: false,
      showDelay: false,
      active: "",
      delayOptions: [
        { value: "5", label: "+5", id: "5" },
        { value: "10", label: "+10", id: "10" },
        { value: "15", label: "+15", id: "15" },
        { value: "20", label: "+20", id: "20" },
      ],
      delayDays: null,
      formulationDelayDays: null,
      formulationDelay: false,
      reason: "",
      checkStatus: "",
      reasonMessage: "",
    };
  }
  componentWillMount() {
    this.props.showHideLoding(false);
    this.GetCartList();
  }
  GetCartList = () => {
    this.props.showHideLoding(true);
    GetProduction(this.state.token)
      .then((response) => {
        this.props.showHideLoding(false);
        console.log("update get ppppp:" + JSON.stringify(response.data.data));
        this.setState({ productionList: response.data.data.productionList });
      })
      .catch((err) => {
        this.props.showHideLoding(false);
        //  this.props.showHideLoader(false)
      });
  };
  showProductDetail = (productDetail) => {
    // self.getSavingData.find((obj) => obj.year == self.selectedYear);
    let data = this.state.primaryOptions.find((obj) => obj.id == productDetail.productStatus);
    // alert(data)
    this.setState({
      showProductionDetails: true,
      productDetail: productDetail,
      productionId: productDetail.productionId,
      productName: productDetail.name,
      primarySelectedOption: data,
    });
  };
  onChange = (status, type, isStatus) => {
    if (this.state.showMessage) {
      return;
    }
    let checkStatus = true;
    if (isStatus == "true") {
      checkStatus = false;
    }
    // alert(JSON.stringify(productionId))
    let data = {
      productionId: this.state.productionId,
      status: status,
      type: type,
      isStatus: checkStatus,
    };
    this.props.showHideLoding(true);
    UpdateStatus(data, this.state.token)
      .then((res) => {
        this.getProductDetails();
        // console.log("update :" + JSON.stringify(res.data.newProduction))
        // this.setState({ productDetail: res.data.newProduction })
        // this.setState({ productImage: res.data.url });
        this.props.showHideLoding(false);
      })
      .catch((err) => {
        if (err.response.data.statusCode === 400) {
          toast.error(err.response.data.data);
        }
        // toast.success("error")
        this.props.showHideLoding(false);
      });
  };
  handleStatus = (primarySelectedOption) => {
    // add api
    let data = {
      productionId: this.state.productionId,
      productStatus: primarySelectedOption.id,
    };
    this.props.showHideLoding(true);
    UpdateStatus(data, this.state.token)
      .then((res) => {
        console.log("update :" + JSON.stringify(res.data.newProduction));
        this.setState({ productDetail: res.data.newProduction });
        // this.setState({ productImage: res.data.url });
        window.location.reload();
        this.props.showHideLoding(false);
      })
      .catch((err) => {
        // toast.success("error")
        this.props.showHideLoding(false);
      });
    this.setState({
      primarySelectedOption,
    });
  };
  handleDelay = (selectDay, type) => {
    this.setState({ delayDays: selectDay });
  };
  submitReason = (type) => {
    const { delayDays, reason, checkStatus } = this.state;
    if (!delayDays && !reason && !checkStatus) {
      return;
    }
    let data = {
      productionId: this.state.productionId,
      days: parseInt(delayDays.value),
      reason: reason,
      productType: checkStatus,
      packagingType: type,
    };
    this.props.showHideLoding(true);
    UpdateDelayStatus(data, this.state.token)
      .then((res) => {
        console.log("update dealy:" + JSON.stringify(res));
        this.getProductDetails();
        this.props.showHideLoding(false);
      })
      .catch((err) => {
        // toast.success("error")
        this.props.showHideLoding(false);
      });
  };
  showReason = (data) => {
    this.setState({ showMessage: true, reasonMessage: data.reason });
  };
  updateTrack = (type) => {
    const { productionId, url } = this.state;
    if (!productionId && !url) {
      return;
    }
    let data = {
      productionId: productionId,
      shippingUrl: url,
      type: type,
    };
    this.props.showHideLoding(true);
    UpdateStatus(data, this.state.token)
      .then((res) => {
        this.getProductDetails();
        this.props.showHideLoding(false);
      })
      .catch((err) => {
        // toast.success("error")
        this.props.showHideLoding(false);
      });
  };
  getProductDetails = () => {
    this.props.showHideLoding(true);
    GetProductionDetails(this.state.productionId, this.state.token)
      .then((res) => {
        this.setState({
          productDetail: res.data.data.productionList[0],
          showDelay: false,
          formulationDelay: false,
          showTrack: false,
          showSecondTrack: false,
          showFormulationTrack: false,
          delayDays: "",
          reason: "",
          checkStatus: "",
        });
        this.props.showHideLoding(false);
      })
      .catch((err) => {
        // toast.success("error")
        this.props.showHideLoding(false);
      });
  };
  handle = () => {
    alert(444);
  };
  render() {
    const {
      productionList,
      showProductionDetails,
      productDetail,
      productName,
      primarySelectedOption,
      primaryOptions,
      productionId,
      showMessage,
      showTrack,
      showSecondTrack,
      showFormulationTrack,
      showDelay,
      delayDays,
      delayOptions,
      formulationDelay,
      formulationDelayDays,
      reason,
      reasonMessage,
      packagingDelay,
    } = this.state;
    let recordDelayPrimary = productDetail ? productDetail.recordDelayPrimary : "";
    let acceptedDelayObj = {};
    if (recordDelayPrimary) {
      acceptedDelayObj = recordDelayPrimary.find((obj) => obj.productType == "accepted");
    }
    let beginDelayObj = {};
    if (recordDelayPrimary) {
      beginDelayObj = recordDelayPrimary.find((obj) => obj.productType == "begin");
    }
    let completedDelayObj = {};
    if (recordDelayPrimary) {
      completedDelayObj = recordDelayPrimary.find((obj) => obj.productType == "completed");
    }
    let qualityDelayObj = {};
    if (recordDelayPrimary) {
      qualityDelayObj = recordDelayPrimary.find((obj) => obj.productType == "qualityAssurance");
    }
    let shippedDelayObj = {};
    if (recordDelayPrimary) {
      shippedDelayObj = recordDelayPrimary.find((obj) => obj.productType == "shipped");
    }
    /// second delay
    let recordDelayFormulation = productDetail ? productDetail.recordDelayFormulation : "";
    let acceptedSecondObj = {};
    if (recordDelayFormulation) {
      acceptedSecondObj = recordDelayFormulation.find((obj) => obj.productType == "accepted");
    }
    let beginSecondObj = {};
    if (recordDelayFormulation) {
      beginSecondObj = recordDelayFormulation.find((obj) => obj.productType == "begin");
    }
    let completedSecondObj = {};
    if (recordDelayFormulation) {
      completedSecondObj = recordDelayFormulation.find((obj) => obj.productType == "completed");
    }
    let qualitySecondObj = {};
    if (recordDelayFormulation) {
      qualitySecondObj = recordDelayFormulation.find((obj) => obj.productType == "qualityAssurance");
    }
    let shippedSecondObj = {};
    if (recordDelayFormulation) {
      shippedSecondObj = recordDelayFormulation.find((obj) => obj.productType == "shipped");
    }

    return (
      <React.Fragment>
        <ToastContainer />
        <div className="col-sm-12 col-md-8 col-lg-8 right-content account-panel d-flex production-list">
          {/* <!-- products module --> */}
          <div className="oneproduts d-flex">
            <table className="table secoundtable">
              <thead>
                <tr>
                  <th>
                    Order
                    <br />
                    No.
                  </th>
                  <th>
                    Product
                    <br />
                    Name
                  </th>
                  <th>
                    Customer
                    <br />
                    ID
                  </th>
                  <th className="Status">Status</th>
                </tr>
              </thead>
              <tbody>
                {productionList.map((product) => (
                  <tr
                    onClick={() => this.showProductDetail(product)}
                    className={product.productionId == productionId ? "active" : ""}
                  >
                    <td className="perfect">
                      <a href="#">{product.orderId}</a>
                    </td>
                    <td className="production-product-thumb">
                      <a href="#">
                        <img
                          src={product.heroImage ? product.heroImage : "images/backend_Product_Image.svg"}
                          height="60px"
                          width="60px"
                        />
                        <p>{product.name}</p>
                      </a>
                    </td>
                    <td className="perfect">
                      <a href="#" className="status">
                        {product.company}
                      </a>
                    </td>
                    {product.productStatus === "inProduction" ? (
                      <td className="perfect ontimes1">
                        <a href="#">In Production</a>
                      </td>
                    ) : (
                      <td
                        className={
                          product.productStatus == "delayed"
                            ? "perfect ontimes1 delayed capitalize"
                            : product.productStatus == "delivered"
                            ? "perfect ontimes1 delivered capitalize"
                            : "perfect ontimes1"
                        }
                      >
                        <a href="#">{product.productStatus}</a>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <!-- product detail module --> */}

          {/* {showProductionDetails ? <Child ref={instance => { this.child = instance; }} productionId={productDetail.productionId} productDetail={productDetail} /> : null} */}
          {showProductionDetails ? (
            <div className="product-details-view1 d-flex flex-column">
              <div className="ontime">
                <div className="orderstatus">
                  <Select
                    // styles={customStyles}
                    value={primarySelectedOption}
                    onChange={this.handleStatus}
                    options={primaryOptions}
                  />
                </div>
              </div>
              {/* <!-- packaging item 1 --> */}
              <div className="Production">
                <div className="package-item primary-packaging">
                  <div className="package-name">
                    <p>
                      {productName}
                      <br />
                      Production Timeline
                    </p>
                    <div className="meinsection">
                      {/* <div className="detail-col2">
                                            <p className="Primary">Primary<br /> Packaging</p>
                                            <p className="Shoulder">Production Estimate: 40 Days <span className="Record_Delay">Record Delay</span></p>
                                        </div> */}
                      <div className="detail-col">
                        <div className="detail-col-cont">
                          <p className="Primary">
                            Primary
                            <br /> Packaging
                          </p>
                          <p className="Shoulder">
                            Production Estimate:{" "}
                            {productDetail.primaryPackaging ? productDetail.primaryPackaging.productionTime : 0} Days
                          </p>
                        </div>
                        <p className="Record_Delay">
                          <a onClick={() => this.setState({ showDelay: !this.state.showDelay })} href="#">
                            Record Delay
                          </a>
                        </p>
                      </div>
                      <div className="twopart">
                        <div className="firstone">
                          <div className="onetext">
                            <div className="plantestest delay-plan">
                              <div className="delay-recorded">
                                <label className="delay-recorded">
                                  <input
                                    checked={productDetail.primary.isAccepted}
                                    value={productDetail.primary.isAccepted}
                                    onChange={(e) => this.onChange("accepted", "primary", e.target.value)}
                                    type="checkbox"
                                    className="option-input radio texting"
                                    name="accepted"
                                  />
                                  {acceptedDelayObj ? (
                                    <span
                                      className="delay-tooltip"
                                      onClick={(iteam) => this.showReason(acceptedDelayObj)}
                                    >
                                      +{acceptedDelayObj.days} days
                                    </span>
                                  ) : null}
                                </label>
                              </div>
                            </div>
                            <p>
                              Production
                              <br /> Accepted
                            </p>
                          </div>
                          <div className="onetext1">
                            <div className="plantestest delay-plan">
                              <div className="delay-recorded">
                                <label className="delay-recorded">
                                  <input
                                    checked={productDetail.primary.isBegin}
                                    value={productDetail.primary.isBegin}
                                    onChange={(e) => this.onChange("begin", "primary", e.target.value)}
                                    type="checkbox"
                                    className="option-input radio texting"
                                    name="begin"
                                  />
                                  {beginDelayObj ? (
                                    <span className="delay-tooltip" onClick={(iteam) => this.showReason(beginDelayObj)}>
                                      +{beginDelayObj.days} days
                                    </span>
                                  ) : null}
                                </label>
                              </div>
                            </div>
                            <p>
                              Production
                              <br /> Begins
                            </p>
                          </div>
                          <div className="onetext2">
                            <div className="plantestest delay-plan">
                              <div className="delay-recorded">
                                <label className="delay-recorded">
                                  <input
                                    checked={productDetail.primary.isCompleted}
                                    value={productDetail.primary.isCompleted}
                                    // onClick={this.handle}
                                    onClick={(e) => this.onChange("completed", "primary", e.target.value)}
                                    type="checkbox"
                                    className="option-input radio texting"
                                    name="completed"
                                  />
                                  {completedDelayObj ? (
                                    <span
                                      className="delay-tooltip"
                                      onClick={(iteam) => this.showReason(completedDelayObj)}
                                    >
                                      +{completedDelayObj.days} days
                                    </span>
                                  ) : null}
                                </label>
                              </div>
                            </div>
                            <p>
                              Production
                              <br /> Completed
                            </p>
                          </div>
                          {/* <div className="onetext3">
                                                    <p className="plantestest">
                                                        <label>
                                                            <input checked={productDetail.primary.isQuality} value={productDetail.primary.isQuality} onChange={(e) => this.onChange("qualityAssurance", "primary", e.target.value)} type="checkbox" className="option-input radio texting" name="qualityAssurance" />
                                                            
                                                        </label>
                                                    </p>
                                                    <p>Production<br /> Assurance</p>
                                                </div> */}
                          <div className="onetext3">
                            <div className="plantestest delay-plan">
                              <div className="delay-recorded">
                                <label className="delay-recorded">
                                  <input
                                    checked={productDetail.primary.isQuality}
                                    value={productDetail.primary.isQuality}
                                    onChange={(e) => this.onChange("qualityAssurance", "primary", e.target.value)}
                                    type="checkbox"
                                    className="option-input radio texting"
                                    name="qualityAssurance"
                                  />
                                  {qualityDelayObj ? (
                                    <span
                                      className="delay-tooltip"
                                      onClick={(iteam) => this.showReason(qualityDelayObj)}
                                    >
                                      +{qualityDelayObj.days} days
                                    </span>
                                  ) : null}
                                </label>
                              </div>
                            </div>
                            <p>
                              Quality
                              <br /> Assurance
                            </p>
                            <div className={showMessage ? "delay-details show" : "delay-details"}>
                              <div className="delay-msg-wrap">
                                <div className="delay-thumb">
                                  <img src="images/admin-thumb.png" />
                                </div>
                                <div className="delay-msg">
                                  <p>
                                    Nick Benson <br />
                                    Says
                                  </p>
                                  <p>{reasonMessage}</p>
                                  <p>Apologies :)</p>

                                  <div
                                    onClick={() => this.setState({ showMessage: !this.state.showMessage })}
                                    className="update-submit"
                                  >
                                    <button type="button" className="btn-module">
                                      Done
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="onetext4">
                            <div className="plantestest delay-plan">
                              <div className="delay-recorded">
                                <label className="delay-recorded">
                                  <input
                                    checked={productDetail.primary.isShipped}
                                    value={productDetail.primary.isShipped}
                                    onChange={(e) => this.onChange("shipped", "primary", e.target.value)}
                                    type="checkbox"
                                    className="option-input radio texting"
                                    name="shipped"
                                  />
                                  {shippedDelayObj ? (
                                    <span
                                      className="delay-tooltip"
                                      onClick={(iteam) => this.showReason(shippedDelayObj)}
                                    >
                                      +{shippedDelayObj.days} days
                                    </span>
                                  ) : null}
                                </label>
                              </div>
                            </div>
                            <p>Shipped</p>
                          </div>
                        </div>
                        {/* <div className="trackshipping">
                                                <a href="#">Track Shipping</a>
                                            </div> */}
                        <div className="trackshipping">
                          <a
                            href="#"
                            onClick={() => this.setState({ showTrack: !this.state.showTrack })}
                            className={showTrack ? "trigger-add-shipping track-start" : "trigger-add-shipping"}
                          >
                            <span className="text-add-ship ">Add Shipping</span>
                            <span className="text-track-ship">Track Shipping</span>

                            <img src="images/noun_Plane_2137065.svg" height="40px" width="40px" />
                          </a>
                        </div>
                        {/* <!-- add shipping url --> */}
                        <div className={showTrack ? "track-shipping-pop show" : "track-shipping-pop"}>
                          <div className="track-shipping-form">
                            <form>
                              <div className="field-group">
                                <label>Paste shipping tracking URL here.</label>
                                <input
                                  onChange={(e) => this.setState({ url: e.target.value })}
                                  type="text"
                                  name="tracking-url"
                                />
                              </div>
                              <div className="update-submit submit-form">
                                <button
                                  onClick={() => this.updateTrack("primary")}
                                  type="button"
                                  className="btn-module"
                                >
                                  Done
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                        {/* <!-- add shipping url end --> */}
                      </div>
                      {/* <!-- record delay popup start --> */}
                      <div className={showDelay ? "record-delay-popup show" : "record-delay-popup"}>
                        <div className="record-pop-content">
                          <form>
                            <div className="fields-wrap">
                              <label>At which stage has the delay occured?</label>
                              <div className="fields-group d-flex">
                                <div className="reason">
                                  <label for="production_accepted">
                                    <input
                                      onChange={(e) => this.setState({ checkStatus: e.target.value })}
                                      type="radio"
                                      id="production_accepted"
                                      value="accepted"
                                      name="reason-delay"
                                      className="option-input radio"
                                    />{" "}
                                    <br />
                                    Production Accepted
                                  </label>
                                </div>
                                <div className="reason">
                                  <label for="production_begins">
                                    <input
                                      onChange={(e) => this.setState({ checkStatus: e.target.value })}
                                      type="radio"
                                      id="production_begins"
                                      value="begin"
                                      name="reason-delay"
                                      className="option-input radio"
                                    />{" "}
                                    <br />
                                    Production Begins
                                  </label>
                                </div>
                                <div className="reason">
                                  <label for="production_completed">
                                    <input
                                      onChange={(e) => this.setState({ checkStatus: e.target.value })}
                                      type="radio"
                                      id="production_completed"
                                      value="completed"
                                      name="reason-delay"
                                      className="option-input radio"
                                    />{" "}
                                    <br />
                                    Production Completed
                                  </label>
                                </div>
                                <div className="reason">
                                  <label for="quality_assurance">
                                    <input
                                      onChange={(e) => this.setState({ checkStatus: e.target.value })}
                                      type="radio"
                                      id="quality_assurance"
                                      value="qualityAssurance"
                                      name="reason-delay"
                                      className="option-input radio"
                                    />{" "}
                                    <br />
                                    Quality Assurance
                                  </label>
                                </div>
                                <div className="reason">
                                  <label for="shipping">
                                    <input
                                      onChange={(e) => this.setState({ checkStatus: e.target.value })}
                                      type="radio"
                                      id="shipping"
                                      value="shipped"
                                      name="reason-delay"
                                      className="option-input radio"
                                    />{" "}
                                    <br />
                                    Shipping
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="fields-wrap">
                              <label>What is the estimated length of the delay?</label>
                              <div className="select-delay">
                                <Select
                                  value={delayDays}
                                  onChange={(item) => this.handleDelay(item, "primary")}
                                  options={delayOptions}
                                />
                                {/* <select>
                                                                <option>+5</option>
                                                                <option>+10</option>
                                                                <option>+15</option>
                                                                <option>+20</option>
                                                            </select> */}
                                <span>Days</span>
                              </div>
                            </div>

                            <div className="fields-wrap">
                              <label>What is the reason for the delay?</label>
                              <input onBlur={(e) => this.setState({ reason: e.target.value })} type="text" name="" />
                            </div>

                            <div className="update-submit submit-form">
                              <button onClick={() => this.submitReason("primary")} type="button" className="btn-module">
                                Done
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      {/* <!-- record delay popup end --> */}
                      <div className="detail-col1">
                        <div className="detail-col-cont">
                          <p className="Primary">
                            Secondary
                            <br /> Packaging
                          </p>
                          <p className="Shoulder">
                            <span className="firstdescription">Actual Production: 19 Days</span>
                            <span className="firstdescription1">
                              Production Estimate:{" "}
                              {productDetail.secondaryPackaging ? productDetail.secondaryPackaging.productionTime : 0}{" "}
                              Days
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="twopart1">
                        <div className="firstone">
                          <div className="onetext">
                            <p className="plantestest">
                              <label>
                                <input
                                  checked={productDetail.secondary.isAccepted}
                                  value={productDetail.secondary.isAccepted}
                                  onChange={(e) => this.onChange("accepted", "secondary", e.target.value)}
                                  type="checkbox"
                                  className="option-input radio texting"
                                  name="plant"
                                />
                              </label>
                            </p>
                            <p>
                              Production
                              <br /> Accepted
                            </p>
                          </div>
                          <div className="onetext1">
                            <p className="plantestest">
                              <label>
                                <input
                                  checked={productDetail.secondary.isBegin}
                                  value={productDetail.secondary.isBegin}
                                  onChange={(e) => this.onChange("begin", "secondary", e.target.value)}
                                  type="checkbox"
                                  className="option-input radio texting"
                                  name="plant"
                                />
                              </label>
                            </p>
                            <p>
                              Production
                              <br /> Begins
                            </p>
                          </div>
                          <div className="onetext2">
                            <p className="plantestest">
                              <label>
                                <input
                                  checked={productDetail.secondary.isCompleted}
                                  value={productDetail.secondary.isCompleted}
                                  onChange={(e) => this.onChange("completed", "secondary", e.target.value)}
                                  type="checkbox"
                                  className="option-input radio texting"
                                  name="plant"
                                />
                              </label>
                            </p>
                            <p>
                              Production
                              <br /> Completed
                            </p>
                          </div>
                          <div className="onetext3">
                            <p className="plantestest">
                              <label>
                                <input
                                  checked={productDetail.secondary.isQuality}
                                  value={productDetail.secondary.isQuality}
                                  onChange={(e) => this.onChange("qualityAssurance", "secondary", e.target.value)}
                                  type="checkbox"
                                  className="option-input radio texting"
                                  name="plant"
                                />
                              </label>
                            </p>
                            <p>
                              Production
                              <br /> Assurance
                            </p>
                          </div>
                          <div className="onetext4">
                            <p className="plantestest">
                              <label>
                                <input
                                  checked={productDetail.secondary.isShipped}
                                  value={productDetail.secondary.isShipped}
                                  onChange={(e) => this.onChange("shipped", "secondary", e.target.value)}
                                  type="checkbox"
                                  className="option-input radio texting"
                                  name="plant"
                                />
                              </label>
                            </p>
                            <p>Shipped</p>
                          </div>
                        </div>
                        {/* <div className="trackshipping1">
                                                <a href="#">Track Shipping</a>
                                                <img src="images/noun_Plane_2137065.svg" height="40px" width="40px" />
                                            </div> */}
                        <div className="trackshipping">
                          <a
                            href="#"
                            onClick={() => this.setState({ showSecondTrack: !this.state.showSecondTrack })}
                            className={showSecondTrack ? "trigger-add-shipping track-start" : "trigger-add-shipping"}
                          >
                            <span className="text-add-ship ">Add Shipping</span>
                            <span className="text-track-ship">Track Shipping</span>

                            <img src="images/noun_Plane_2137065.svg" height="40px" width="40px" />
                          </a>
                        </div>
                        {/* <!-- add shipping url --> */}
                        <div className={showSecondTrack ? "track-shipping-pop show" : "track-shipping-pop"}>
                          <div className="track-shipping-form">
                            <form>
                              <div className="field-group">
                                <label>Paste shipping tracking URL here.</label>
                                <input
                                  onChange={(e) => this.setState({ url: e.target.value })}
                                  type="text"
                                  name="tracking-url"
                                />
                              </div>
                              <div className="update-submit submit-form">
                                <button
                                  onClick={() => this.updateTrack("secondary")}
                                  type="button"
                                  className="btn-module"
                                >
                                  Done
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                        {/* <!-- add shipping url end --> */}
                      </div>
                      {/* <div className="detail-col2">
                                            <p className="Primary">Formulation<br /> &Packaging</p>
                                            <p className="Shoulder2">Production Estimate: 20 Days <span className="Record_Delay">Record Delay</span></p>

                                        </div> */}
                      <div className="detail-col">
                        <div className="detail-col-cont">
                          <p className="Primary">
                            Formulation
                            <br /> &Packaging
                          </p>
                          <p className="Shoulder">
                            Production Estimate:{" "}
                            {productDetail.formulationPackaging ? productDetail.formulationPackaging.productionTime : 0}{" "}
                            Days
                          </p>
                        </div>
                        <p className="Record_Delay">
                          <a onClick={() => this.setState({ formulationDelay: !this.state.formulationDelay })} href="#">
                            Record Delay
                          </a>
                        </p>
                      </div>
                      <div className="twopart2">
                        <div className="firstone">
                          <div className="onetext">
                            <div className="plantestest delay-plan">
                              <div className="delay-recorded">
                                <label class="delay-recorded">
                                  <input
                                    checked={productDetail.formulation.isAccepted}
                                    value={productDetail.formulation.isAccepted}
                                    onChange={(e) => this.onChange("accepted", "formulation", e.target.value)}
                                    type="checkbox"
                                    className="option-input radio texting"
                                    name="plant"
                                  />
                                  {acceptedSecondObj ? (
                                    <span
                                      className="delay-tooltip"
                                      onClick={(iteam) => this.showReason(acceptedSecondObj)}
                                    >
                                      +{acceptedSecondObj.days} days
                                    </span>
                                  ) : null}
                                </label>
                              </div>
                            </div>{" "}
                            <p>
                              Production
                              <br /> Accepted
                            </p>
                          </div>
                          <div className="onetext1">
                            <div className="plantestest delay-plan">
                              <div className="delay-recorded">
                                <label class="delay-recorded">
                                  <input
                                    checked={productDetail.formulation.isBegin}
                                    value={productDetail.formulation.isBegin}
                                    onChange={(e) => this.onChange("begin", "formulation", e.target.value)}
                                    type="checkbox"
                                    className="option-input radio texting"
                                    name="plant"
                                  />
                                  {beginSecondObj ? (
                                    <span
                                      className="delay-tooltip"
                                      onClick={(iteam) => this.showReason(beginSecondObj)}
                                    >
                                      +{beginSecondObj.days} days
                                    </span>
                                  ) : null}
                                </label>
                              </div>
                            </div>
                            <p>
                              Production
                              <br /> Begins
                            </p>
                          </div>
                          <div className="onetext2">
                            <div className="plantestest delay-plan">
                              <div className="delay-recorded">
                                <label class="delay-recorded">
                                  <input
                                    checked={productDetail.formulation.isCompleted}
                                    value={productDetail.formulation.isCompleted}
                                    onChange={(e) => this.onChange("completed", "formulation", e.target.value)}
                                    type="checkbox"
                                    className="option-input radio texting"
                                    name="plant"
                                  />
                                  {completedSecondObj ? (
                                    <span
                                      className="delay-tooltip"
                                      onClick={(iteam) => this.showReason(completedSecondObj)}
                                    >
                                      +{completedSecondObj.days} days
                                    </span>
                                  ) : null}
                                </label>
                              </div>
                            </div>
                            <p>
                              Production
                              <br /> Completed
                            </p>
                          </div>
                          <div className="onetext3">
                            <div className="plantestest delay-plan">
                              <div className="delay-recorded">
                                <label class="delay-recorded">
                                  <input
                                    checked={productDetail.formulation.isQuality}
                                    value={productDetail.formulation.isQuality}
                                    onChange={(e) => this.onChange("qualityAssurance", "formulation", e.target.value)}
                                    type="checkbox"
                                    className="option-input radio texting"
                                    name="plant"
                                  />
                                  {qualitySecondObj ? (
                                    <span
                                      className="delay-tooltip"
                                      onClick={(iteam) => this.showReason(qualitySecondObj)}
                                    >
                                      +{qualitySecondObj.days} days
                                    </span>
                                  ) : null}
                                </label>
                              </div>
                            </div>
                            <p>
                              Production
                              <br /> Assurance
                            </p>
                          </div>
                          <div className="onetext4">
                            <div className="plantestest delay-plan">
                              <div className="delay-recorded">
                                <label class="delay-recorded">
                                  <input
                                    checked={productDetail.formulation.isShipped}
                                    value={productDetail.formulation.isShipped}
                                    onChange={(e) => this.onChange("shipped", "formulation", e.target.value)}
                                    type="checkbox"
                                    className="option-input radio texting"
                                    name="plant"
                                  />
                                  {shippedSecondObj ? (
                                    <span
                                      className="delay-tooltip"
                                      onClick={(iteam) => this.showReason(shippedSecondObj)}
                                    >
                                      +{shippedSecondObj.days} days
                                    </span>
                                  ) : null}
                                </label>
                              </div>
                            </div>
                            <p>Shipped</p>
                          </div>
                        </div>
                        {/* <div className="trackshipping2">
                                                <a href="#">Track Shipping</a>
                                            </div> */}
                        <div className="trackshipping">
                          <a
                            href="#"
                            onClick={() => this.setState({ showFormulationTrack: !this.state.showFormulationTrack })}
                            className={
                              showFormulationTrack ? "trigger-add-shipping track-start" : "trigger-add-shipping"
                            }
                          >
                            <span className="text-add-ship ">Add Shipping</span>
                            <span className="text-track-ship">Track Shipping</span>

                            <img src="images/noun_Plane_2137065.svg" height="40px" width="40px" />
                          </a>
                        </div>
                        {/* <!-- add shipping url --> */}
                        <div className={showFormulationTrack ? "track-shipping-pop show" : "track-shipping-pop"}>
                          <div className="track-shipping-form">
                            <form>
                              <div className="field-group">
                                <label>Paste shipping tracking URL here.</label>
                                <input
                                  onChange={(e) => this.setState({ url: e.target.value })}
                                  type="text"
                                  name="tracking-url"
                                />
                              </div>
                              <div className="update-submit submit-form">
                                <button
                                  onClick={() => this.updateTrack("formulation")}
                                  type="button"
                                  className="btn-module"
                                >
                                  Done
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                        {/* <!-- add shipping url end --> */}
                      </div>
                      {/* <!-- record delay popup start --> */}
                      <div className={formulationDelay ? "record-delay-popup show" : "record-delay-popup"}>
                        <div className="record-pop-content">
                          <form>
                            <div className="fields-wrap">
                              <label>At which stage has the delay occured?</label>
                              <div className="fields-group d-flex">
                                <div className="reason">
                                  <label for="production_accepted">
                                    <input
                                      onChange={(e) => this.setState({ checkStatus: e.target.value })}
                                      type="radio"
                                      id="production_accepted"
                                      value="accepted"
                                      name="reason-delay"
                                      className="option-input radio"
                                    />{" "}
                                    <br />
                                    Production Accepted
                                  </label>
                                </div>
                                <div className="reason">
                                  <label for="production_begins">
                                    <input
                                      onChange={(e) => this.setState({ checkStatus: e.target.value })}
                                      type="radio"
                                      id="production_begins"
                                      value="begin"
                                      name="reason-delay"
                                      className="option-input radio"
                                    />{" "}
                                    <br />
                                    Production Begins
                                  </label>
                                </div>
                                <div className="reason">
                                  <label for="production_completed">
                                    <input
                                      onChange={(e) => this.setState({ checkStatus: e.target.value })}
                                      type="radio"
                                      id="production_completed"
                                      value="completed"
                                      name="reason-delay"
                                      className="option-input radio"
                                    />{" "}
                                    <br />
                                    Production Completed
                                  </label>
                                </div>
                                <div className="reason">
                                  <label for="quality_assurance">
                                    <input
                                      onChange={(e) => this.setState({ checkStatus: e.target.value })}
                                      type="radio"
                                      id="quality_assurance"
                                      value="qualityAssurance"
                                      name="reason-delay"
                                      className="option-input radio"
                                    />{" "}
                                    <br />
                                    Quality Assurance
                                  </label>
                                </div>
                                <div className="reason">
                                  <label for="shipping">
                                    <input
                                      onChange={(e) => this.setState({ checkStatus: e.target.value })}
                                      type="radio"
                                      id="shipping"
                                      value="shipped"
                                      name="reason-delay"
                                      className="option-input radio"
                                    />{" "}
                                    <br />
                                    Shipping
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="fields-wrap">
                              <label>What is the estimated length of the delay?</label>
                              <div className="select-delay">
                                <Select
                                  value={delayDays}
                                  onChange={(item) => this.handleDelay(item, "formulationDelay")}
                                  options={delayOptions}
                                />
                                {/* <select>
                                                                <option>+5</option>
                                                                <option>+10</option>
                                                                <option>+15</option>
                                                                <option>+20</option>
                                                            </select> */}
                                <span>Days</span>
                              </div>
                            </div>

                            <div className="fields-wrap">
                              <label>What is the reason for the delay?</label>
                              <input onBlur={(e) => this.setState({ reason: e.target.value })} type="text" name="" />
                            </div>

                            <div className="update-submit submit-form">
                              <button
                                onClick={() => this.submitReason("formulation")}
                                type="button"
                                className="btn-module"
                              >
                                Done
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      {/* <!-- record delay popup end --> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
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
export default connect(mapStateToProps, mapDispatchToProps)(production);
