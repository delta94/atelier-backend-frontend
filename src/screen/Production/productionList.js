import React, { Component } from "react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import logoawhite from '../../img-new/icon-a-white.svg';
import "../Product/product-reorder.scss";
import "./production.scss";
// dummy images
import demothumb from '../../images/product-main-thumb.jpg';
import Model from "../Component/model";

import { Link } from "react-router-dom";


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

class production extends Component {
  constructor(props) {
    super(props);
    // this.child = React.createRef();
    this.state = {
      token: props.loginUserInfo ? props.loginUserInfo.access_token : "",
      showProductionDetails: false,
      showProductDetails: false,
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
      showPack:false,
      showLabel:'',
      imgModel:false
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
  showProductDetail = (productDetail, id) => {
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
  showPackg = (text) =>{
    this.setState({ showPack: true,showLabel:text });
  }

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


  submitImage = () => {
    this.setState({ modelOpen: true, imgModel:true,  });
  };

  render() {
    console.log('----check--- label',this.state.showPack, this.state.showLabel)
    const {
      productionList,
      showProductDetails,
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
    console.log('----check--- label',this.state.showPack, this.state.showLabel)



    return (


      <React.Fragment>
        <ToastContainer />

        <div className="row justify-content-between">
          <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 loggedin-user-dashboard d-flex flex-column">
            <div className="titlearea">
                <h3>See how <span>Bear</span>’s products are tracking. Click the <br />drop down for more details.
                </h3>
            </div>

            <div className="bodyarea d-flex flex-column">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="row justify-content-between">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex no-padding">

                    <div className="product-listing-dashboard">
                      <h4>Your Products</h4>
                        
                        {/* <!-- products module --> */}
                        <ul className="product-listing d-flex flex-column">
                          {productionList.map((product) => (
                            <li key={product.productionId} className={product.productionId == productionId ? "active" : ""}>
                              <a href="#">
                                <div className="product-thumb d-flex align-items-center justify-content-center">
                                  <img src={product.heroImage ? product.heroImage : "images/backend_Product_Image.svg"} alt="product thumb" />
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
                            </li>
                          ))}
                        </ul>
                      {/* ))} */}
                    </div>

                    <div className="product-details-wrap d-flex justify-content-between">
                      <div className="products-tracking">
                        <h4>Product Tracking: <br />Wonder</h4>

                        <div className="d-flex">
                          <div className="product-components">
                            <ul>
                                  <li className="product-primary">
                                  <Link onClick={() => this.showPackg('primary')}>Primary Packaging</Link>
                                    <div className="status-calculate c100 p75 small blue">
                                        <span>75%</span>
                                        <div className="slice">
                                            <div className="bar"></div>
                                            <div className="fill"></div>
                                        </div>
                                    </div>
                                  </li>
                                  <li className="product-secondary">
                                  <Link onClick={() => this.showPackg('secondary')}>Secondary Packaging</Link>
                                      <div className="status-calculate c100 p75 small blue">
                                        <span>75%</span>
                                        <div className="slice">
                                          <div className="bar"></div>
                                          <div className="fill"></div>
                                        </div>
                                      </div>
                                  </li>
                                  <li className="product-label">
                                  <Link onClick={() => this.showPackg('label')}>Label
                                     <div className="status-calculate c100 p25 small orange">
                                        <span>25%</span>
                                        <div className="slice">
                                          <div className="bar"></div>
                                          <div className="fill"></div>
                                        </div>
                                      </div>
                                    </Link>
                                  </li>
                                  <li className="product-formulation">
                                  <Link onClick={() => this.showPackg('formulation')}>Formulation
                                 <div className="status-calculate c100 p90 small green">
                                        <span>90%</span>
                                        <div className="slice">
                                          <div className="bar"></div>
                                          <div className="fill"></div>
                                        </div>
                                      </div>
                                  </Link>
                                 </li>
                                 </ul>
                                  
                          </div>

                            <div className="product-track-status">

                              {this.state.showPack && this.state.showLabel === 'primary' ?
                                  <ul>
                                    <li className="d-flex status-done">
                                      <div className="status-date">
                                        <label>July 22nd</label>
                                      </div>
                                      <div className="status-message">
                                        <label>Order Accepted</label>
                                        <div className="ordermeta">
                                          Order Date : July 22nd <br />
                                          Order NO. : #00001 <br />
                                          EST. Delivery: August 30
                                        </div>
                                      </div>
                                    </li>

                                    <li className="d-flex status-done">
                                      <div className="status-date">
                                        <label>July 22nd</label>
                                      </div>
                                      <div className="status-message">
                                        <label>Production Begins</label>
                                      </div>
                                    </li>

                                    <li className="d-flex status-done status-done">
                                      <div className="status-date">
                                        <label>July 30th</label>
                                      </div>
                                      <div className="status-message">
                                        <label>Production Complete</label>
                                      </div>
                                    </li>

                                    <li className="d-flex qa-begins status-done">
                                      <div className="status-date">
                                        <label>August 1st</label>
                                      </div>
                                      <div className="status-message">
                                        <label>QA Begins</label>
                                      </div>
                                    </li>

                                    <li className="d-flex qa-begins status-done">
                                      <div className="status-date">
                                        <label>August 2nd</label>
                                      </div>
                                      <div className="status-message">
                                        <label>QA Complete <br />Click to enlarge QA images</label>
                                        <div className="order-thumbs d-flex align-items-center justify-content-between">
                                          <Link onClick={() => this.submitImage()}>
                                            <img src="images/face-serun-60ml.png" alt="face-serun-60ml" />
                                          </Link>

                                          <Link onClick={() => this.submitImage()}>
                                            <img src="images/face-serun-60ml.png" alt="face-serun-60ml" />
                                          </Link>

                                          <Link onClick={() => this.submitImage()}>
                                            <img src="images/face-serun-60ml.png" alt="face-serun-60ml" />
                                          </Link>
                                        </div>
                                      </div>
                                    </li>

                                    <li className="d-flex label-shipped status-done">
                                      <div className="status-date">
                                        <label>August 3rd</label>
                                      </div>
                                      <div className="status-message">
                                        <label>labels shipped</label>
                                        <div className="shipping-thumb">
                                          <Link onClick={() => this.submitImage()}>
                                            <img src="images/map.jpg" alt="Labels Shipped Map image" />
                                          </Link>
                                        </div>
                                      </div>
                                    </li>

                                    <li className="d-flex label-shipped status-done">
                                      <div className="status-date">
                                        <label>August 3rd</label>
                                      </div>
                                      <div className="status-message">
                                        <label>labels shipped</label>
                                      </div>
                                    </li>
                                  </ul>
                                  :''}

                              {this.state.showPack && this.state.showLabel === 'secondary' ?
                                  <ul>
                                    <li className="d-flex status-done">
                                      <div className="status-date">
                                        <label>July 22nd</label>
                                      </div>
                                      <div className="status-message">
                                        <label>Order Accepted</label>
                                        <div className="ordermeta">
                                          Order Date : July 22nd <br />
                                          Order NO. : #00001 <br />
                                          EST. Delivery: August 30
                                        </div>
                                      </div>
                                    </li>

                                    <li className="d-flex status-done">
                                      <div className="status-date">
                                        <label>July 22nd</label>
                                      </div>
                                      <div className="status-message">
                                        <label>Production Begins</label>
                                      </div>
                                    </li>

                                    <li className="d-flex status-done status-done">
                                      <div className="status-date">
                                        <label>July 30th</label>
                                      </div>
                                      <div className="status-message">
                                        <label>Production Complete</label>
                                      </div>
                                    </li>

                                    <li className="d-flex qa-begins status-done">
                                      <div className="status-date">
                                        <label>August 1st</label>
                                      </div>
                                      <div className="status-message">
                                        <label>QA Begins</label>
                                      </div>
                                    </li>
                                  </ul>
                                  :''}

                              {this.state.showPack && this.state.showLabel === 'label' ?
                                  <ul>
                                    <li className="d-flex status-done">
                                      <div className="status-date">
                                        <label>July 22nd</label>
                                      </div>
                                      <div className="status-message">
                                        <label>Order Accepted</label>
                                        <div className="ordermeta">
                                          Order Date : July 22nd <br />
                                          Order NO. : #00001 <br />
                                          EST. Delivery: August 30
                                        </div>
                                      </div>
                                    </li>

                                    <li className="d-flex status-done">
                                      <div className="status-date">
                                        <label>July 22nd</label>
                                      </div>
                                      <div className="status-message">
                                        <label>Production Begins</label>
                                      </div>
                                    </li>
                                  </ul>
                                  :''}

                              {this.state.showPack && this.state.showLabel === 'formulation' ?
                                  <ul>
                                    <li className="d-flex status-done">
                                      <div className="status-date">
                                        <label>July 22nd</label>
                                      </div>
                                      <div className="status-message">
                                        <label>Order Accepted</label>
                                        <div className="ordermeta">
                                          Order Date : July 22nd <br />
                                          Order NO. : #00001 <br />
                                          EST. Delivery: August 30
                                        </div>
                                      </div>
                                    </li>

                                    <li className="d-flex status-done">
                                      <div className="status-date">
                                        <label>July 22nd</label>
                                      </div>
                                      <div className="status-message">
                                        <label>Production Begins</label>
                                      </div>
                                    </li>
                                  </ul>
                                  :''}
                              
                            </div>
                          </div>
                      </div>

                    
                    {this.state.imgModel && ''}
                    {this.state.modelOpen && this.state.imgModel && (
                        <Model
                            imgModel={this.state.imgModel}
                            onPressCancelPass={() => this.setState({ modelOpen: false, imgModel:false, })}
                        />
                    )}

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
                        <Link>Track Production Here</Link>
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
                        <Link>Track Production Here</Link>
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
                        <Link>Track Production Here</Link>
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
                        <Link>Track Production Here</Link>
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
                        <Link>Track Production Here</Link>
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
                        <Link>Track Production Here</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(production);
