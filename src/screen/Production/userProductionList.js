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
import { GetUserProduction, UpdateStatus } from "../../ApiActions/Production";

class production extends Component {
  constructor(props) {
    super(props);
    // this.child = React.createRef();
    this.state = {
      token: props.token ? props.token.token : "",
      showProductionDetails: false,
      productionList: [],
      productionId: "",
      productName: "",
      active: "",
      primaryOptions: [
        { value: "inProduction", label: "Order Status: In Production", id: "inProduction" },
        { value: "delayed", label: "Order Status: Delayed", id: "delayed" },
        { value: "onTime", label: "Order Status: On Time", id: "onTime" },
        { value: "delivered", label: "Order Status: Delivered", id: "delivered" },
      ],
      primarySelectedOption: null,
      showMessage: false,
      showTrack: false,
      showSecondTrack: false,
      showFormulationTrack: false,
      showDelay: false,
    };
  }
  componentWillMount() {
    this.props.showHideLoding(false);
    this.GetCartList();
  }
  GetCartList = () => {
    this.props.showHideLoding(true);
    GetUserProduction(this.props.userId, this.state.token)
      .then((response) => {
        this.props.showHideLoding(false);
        this.setState({ productionList: response.data.data.productionList });
      })
      .catch((err) => {
        this.props.showHideLoding(false);
        //  this.props.showHideLoader(false)
      });
  };
  showProductDetail = (productDetail) => {
    this.setState({
      showProductionDetails: true,
      productDetail: productDetail,
      productionId: productDetail.productionId,
      productName: productDetail.name,
      active: productDetail.productionId,
    });
  };
  onChange = (status, type, isStatus) => {
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
        console.log("update :" + JSON.stringify(res.data.newProduction));
        this.setState({ productDetail: res.data.newProduction });
        // this.setState({ productImage: res.data.url });
        this.props.showHideLoding(false);
      })
      .catch((err) => {
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
        // this.setState({ productDetail: res.data.newProduction })
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
  render() {
    const {
      productionList,
      active,
      showProductionDetails,
      productDetail,
      productName,
      showMessage,
      showTrack,
      showSecondTrack,
      showFormulationTrack,
      showDelay,
      primarySelectedOption,
      primaryOptions,
    } = this.state;

    return (
      <React.Fragment>
        <div className="col-sm-12 col-md-8 col-lg-8 right-content account-panel d-flex production-list">
          {/* <!-- products module --> */}
          <div className="products-module d-flex">
            <ul className="product-listing d-flex justify-content-between flex-column">
              {productionList.map((product) => (
                <li className={product.productionId == active ? "active" : ""}>
                  <a onClick={() => this.showProductDetail(product)} href="#">
                    <div className="product-thumb d-flex align-items-center justify-content-center">
                      <img
                        src={product.heroImage ? product.heroImage : "images/face-serun-60ml.png"}
                        alt="face-serun-60ml"
                      />
                    </div>
                    <div className="product-title d-flex justify-content-between">
                      <div className="product-name">
                        {product.name}
                        {/* Face Serum */}
                      </div>
                      <div className="product-qty">
                        {product.volume}mL
                        {/* 60mL */}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {showProductionDetails ? (
            <div className="product-details-view1 d-flex flex-column">
              <div className="ontime">
                <div className="orderstatus">
                  <Select value={primarySelectedOption} onChange={this.handleStatus} options={primaryOptions} />
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
                            <p className="plantestest">
                              <label>
                                <input
                                  checked={productDetail.primary.isAccepted}
                                  value={productDetail.primary.isAccepted}
                                  onChange={(e) => this.onChange("accepted", "primary", e.target.value)}
                                  type="checkbox"
                                  className="option-input radio texting"
                                  name="accepted"
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
                                  checked={productDetail.primary.isBegin}
                                  value={productDetail.primary.isBegin}
                                  onChange={(e) => this.onChange("begin", "primary", e.target.value)}
                                  type="checkbox"
                                  className="option-input radio texting"
                                  name="begin"
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
                                  checked={productDetail.primary.isCompleted}
                                  value={productDetail.primary.isCompleted}
                                  onChange={(e) => this.onChange("completed", "primary", e.target.value)}
                                  type="checkbox"
                                  className="option-input radio texting"
                                  name="completed"
                                />
                              </label>
                            </p>
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
                            <p className="plantestest">
                              <label className="delay-recorded">
                                <input
                                  checked={productDetail.primary.isQuality}
                                  value={productDetail.primary.isQuality}
                                  onChange={(e) => this.onChange("qualityAssurance", "primary", e.target.value)}
                                  type="checkbox"
                                  className="option-input radio texting"
                                  name="qualityAssurance"
                                />
                                <span
                                  className="delay-tooltip"
                                  onClick={() => this.setState({ showMessage: !this.state.showMessage })}
                                >
                                  +5 days
                                </span>
                              </label>
                            </p>
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
                                  <p>
                                    There has been an issue with the closures, around 30% of them aren't ejecting
                                    cleanely from the mold. We need to clean the mold and run them again.
                                  </p>
                                  <p>Apologies :)</p>

                                  <div className="update-submit">
                                    <button
                                      onClick={() => this.setState({ showMessage: !this.state.showMessage })}
                                      className="btn-module"
                                    >
                                      Done
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="onetext4">
                            <p className="plantestest">
                              <label>
                                <input
                                  checked={productDetail.primary.isShipped}
                                  value={productDetail.primary.isShipped}
                                  onChange={(e) => this.onChange("shipped", "primary", e.target.value)}
                                  type="checkbox"
                                  className="option-input radio texting"
                                  name="shipped"
                                />
                              </label>
                            </p>
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
                                <input type="text" name="tracking-url" />
                              </div>
                              <div className="update-submit submit-form">
                                <button
                                  onClick={() => this.setState({ showTrack: !this.state.showTrack })}
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
                                      type="radio"
                                      id="production_accepted"
                                      value="Production Accepted"
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
                                      type="radio"
                                      id="production_begins"
                                      value="Production Begins"
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
                                      type="radio"
                                      id="production_completed"
                                      value="Production Completed"
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
                                      type="radio"
                                      id="quality_assurance"
                                      value="Quality Assurance"
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
                                      type="radio"
                                      id="shipping"
                                      value="Shipping"
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
                                <select>
                                  <option>+5</option>
                                  <option>+10</option>
                                  <option>+15</option>
                                  <option>+20</option>
                                </select>
                                <span>Days</span>
                              </div>
                            </div>

                            <div className="fields-wrap">
                              <label>What is the reason for the delay?</label>
                              <input type="text" name="" />
                            </div>

                            <div className="update-submit submit-form">
                              <button
                                onClick={() => this.setState({ showDelay: !this.state.showDelay })}
                                type="submit"
                                className="btn-module"
                              >
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
                            <span className="firstdescription">
                              Actual Prodyction:{" "}
                              {productDetail.secondaryPackaging ? productDetail.secondaryPackaging.productionTime : 0}{" "}
                              Days
                            </span>
                            <span className="firstdescription1">Production Estimate: 30 Days</span>
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
                                <input type="text" name="tracking-url" />
                              </div>
                              <div className="update-submit submit-form">
                                <button
                                  onClick={() => this.setState({ showSecondTrack: !this.state.showSecondTrack })}
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
                          <a href="#">Record Delay</a>
                        </p>
                      </div>
                      <div className="twopart2">
                        <div className="firstone">
                          <div className="onetext">
                            <p className="plantestest">
                              <label>
                                <input
                                  checked={productDetail.formulation.isAccepted}
                                  value={productDetail.formulation.isAccepted}
                                  onChange={(e) => this.onChange("accepted", "formulation", e.target.value)}
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
                                  checked={productDetail.formulation.isBegin}
                                  value={productDetail.formulation.isBegin}
                                  onChange={(e) => this.onChange("begin", "formulation", e.target.value)}
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
                                  checked={productDetail.formulation.isCompleted}
                                  value={productDetail.formulation.isCompleted}
                                  onChange={(e) => this.onChange("completed", "formulation", e.target.value)}
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
                                  checked={productDetail.formulation.isQuality}
                                  value={productDetail.formulation.isQuality}
                                  onChange={(e) => this.onChange("qualityAssurance", "formulation", e.target.value)}
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
                                  checked={productDetail.formulation.isShipped}
                                  value={productDetail.formulation.isShipped}
                                  onChange={(e) => this.onChange("shipped", "formulation", e.target.value)}
                                  type="checkbox"
                                  className="option-input radio texting"
                                  name="plant"
                                />
                              </label>
                            </p>
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
                            className={showFormulationTrack ? "trigger-add-shipping track-start" : "trigger-add-shipping"}
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
                                <input type="text" name="tracking-url" />
                              </div>
                              <div className="update-submit submit-form">
                                <button
                                  onClick={() =>
                                    this.setState({ showFormulationTrack: !this.state.showFormulationTrack })
                                  }
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {/* <!-- product detail module --> */}
        </div>
      </React.Fragment>
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
export default connect(mapStateToProps, mapDispatchToProps)(production);
