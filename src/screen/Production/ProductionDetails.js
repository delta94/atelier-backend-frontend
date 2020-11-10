import React, { Component } from "react";

import Select from 'react-select';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Error from "../../utils/Error";
// redux
import { connect } from "react-redux";
// Dispatch
import { saveLoginUserInfo } from "../../Redux/Action/Login";
import { showHideLoding } from "../../Redux/Action/Loading";
//api
import { UpdateStatus } from "../../ApiActions/Production";

class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.token ? props.token.token : "",
      companyDetails: false,
      primaryAccepted: this.props.productDetail.primary.isAccepted,
      primaryBegin: this.props.productDetail.primary.isBegin,
      primaryCompleted: this.props.productDetail.primary.isCompleted,
      primaryQualityAssurance: this.props.productDetail.primary.isQuality,
      primaryShipped: this.props.productDetail.primary.isShipped,
      // primaryOptions: [
      //   {value:"delayed",label:"Order Status: Delayed",id:"delayed"},
      //   {value:"onTime",label:"Order Status: On Time",id:"onTime"}  
      // ],
      // primarySelectedOption: null,
    };
  }
  componentWillMount() {
    this.props.showHideLoding(false);
    // alert(this.props.productDetail.primary.isAccepted)
    // let primaryData = {
    //     accepted: this.props.productDetail.primary.isAccepted,
    //     begin: this.props.productDetail.primary.isBegin,
    //     completed: this.props.productDetail.primary.isCompleted,
    //     qualityAssurance: this.props.productDetail.primary.isQuality,
    //     shipped: this.props.productDetail.primary.isShipped,
    // }

    // this.setState({
    //     primary: primaryData
    // })
    // alert(JSON.stringify(this.state.primary))
  }
  onChange = (event, type) => {
    alert(type);
    // alert(JSON.stringify(data))
    let data = {
      productionId: this.props.productionId,
      status: event,
      type: type
    };
    UpdateStatus(data, this.state.token)
      .then(res => {
        // this.setState({ productImage: res.data.url });
        this.props.showHideLoding(false);
      })
      .catch(err => {
        // toast.success("error")
        this.props.showHideLoding(false);
      });
  };
  callChildMethod = () => {
    alert("Hello World");
    // to return some value
    // return this.state.someValue;
  };
  getAlert() {
    alert("getAlert from Child");
  };
  handleStatus(primarySelectedOption) {
    this.setState({ primarySelectedOption });
  }
  render() {
    // alert(JSON.stringify(this.props.productDetail.primary));
    console.log(JSON.stringify(this.props.productDetail.primary));
    const {
      companyDetails,
      primaryAccepted,
      primaryBegin,
      primaryCompleted,
      primaryQualityAssurance,
      primaryShipped,
      primaryOptions,
      primarySelectedOption
    } = this.state;
    const { productDetail } = this.props;
    return (
      <React.Fragment>
        <div className="product-details-view1 d-flex flex-column">
          {/* <div className="ontime">
            <div className="orderstatus">
              <a href="#">Order Status In Production 1</a>
            </div>
            <div className="ontime1">
              <a href="#">
                <img src="images/arrow.svg" />
              </a>
            </div>
          </div> */}
          <div className="ontime">
          <Select
            value={primarySelectedOption}
            onChange={this.handleStatus}
            options={primaryOptions}
          />
						</div>
          {/* <!-- packaging item 1 --> */}
          <div className="Production">
            <div className="package-item primary-packaging">
              <div className="package-name">
                <p>
                  {productDetail.name}
                  <br />
                  Production Timeline111
                </p>
                <div className="meinsection">
                  <div className="detail-col">
                    <p className="Primary">
                      Primary
                      <br /> Packaging
                    </p>
                    <p className="Shoulder">Production Estimate: 40 Days</p>
                    <p className="Record_Delay">Record Delay</p>
                  </div>
                  <div className="twopart">
                    <div className="firstone">
                      <div className="onetext">
                        <p className="plantestest">
                          <label>
                            <input
                              checked={primaryAccepted}
                              value="accepted"
                              onChange={e => this.onChange(e.target.value, "primary")}
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
                              checked={primaryBegin}
                              value="begin"
                              onChange={e => this.onChange(e.target.value, "primary")}
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
                              checked={primaryCompleted}
                              value="completed"
                              onChange={e => this.onChange(e.target.value, "primary")}
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
                      <div className="onetext3">
                        <p className="plantestest">
                          <label>
                            <input
                              checked={primaryQualityAssurance}
                              value="qualityAssurance"
                              onChange={e => this.onChange(e.target.value, "primary")}
                              type="checkbox"
                              className="option-input radio texting"
                              name="qualityAssurance"
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
                              checked={primaryShipped}
                              value="shipped"
                              onChange={e => this.onChange(e.target.value, "primary")}
                              type="checkbox"
                              className="option-input radio texting"
                              name="shipped"
                            />
                          </label>
                        </p>
                        <p>Shipped</p>
                      </div>
                    </div>
                    <div className="trackshipping">
                      <a href="#">Track Shipping</a>
                    </div>
                  </div>
                  <div className="detail-col1">
                    <p className="Primary">
                      Secondary
                      <br /> Packaging
                    </p>
                    <p className="Shoulder1">
                      <span className="firstdescription">Actual Prodyction: 19 Days</span>
                      <span className="firstdescription1">Production Estimate: 30 Days</span>
                    </p>
                  </div>
                  <div className="twopart1">
                    <div className="firstone">
                      <div className="onetext">
                        <p className="plantestest">
                          <label>
                            <input
                              value="accepted"
                              onChange={e => this.onChange(e.target.value, "secondary")}
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
                              value="begin"
                              onChange={e => this.onChange(e.target.value, "secondary")}
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
                              value="completed"
                              onChange={e => this.onChange(e.target.value, "secondary")}
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
                              value="qualityAssurance"
                              onChange={e => this.onChange(e.target.value, "secondary")}
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
                              value="shipped"
                              onChange={e => this.onChange(e.target.value, "secondary")}
                              type="checkbox"
                              className="option-input radio texting"
                              name="plant"
                            />
                          </label>
                        </p>
                        <p>Shipped</p>
                      </div>
                    </div>
                    <div className="trackshipping1">
                      <a href="#">Track Shipping</a>
                      <img src="images/noun_Plane_2137065.svg" height="40px" width="40px" />
                    </div>
                  </div>
                  <div className="detail-col2">
                    <p className="Primary">
                      Formulation
                      <br /> &Packaging
                    </p>
                    <p className="Shoulder2">
                      Production Estimate: 20 Days <span className="Record_Delay">Record Delay</span>
                    </p>
                  </div>
                  <div className="twopart2">
                    <div className="firstone">
                      <div className="onetext">
                        <p className="plantestest">
                          <label>
                            <input
                              value="accepted"
                              onChange={e => this.onChange(e.target.value, "formulation")}
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
                              value="begin"
                              onChange={e => this.onChange(e.target.value, "formulation")}
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
                              value="completed"
                              onChange={e => this.onChange(e.target.value, "formulation")}
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
                              value="qualityAssurance"
                              onChange={e => this.onChange(e.target.value, "formulation")}
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
                              value="shipped"
                              onChange={e => this.onChange(e.target.value, "formulation")}
                              type="checkbox"
                              className="option-input radio texting"
                              name="plant"
                            />
                          </label>
                        </p>
                        <p>Shipped</p>
                      </div>
                    </div>
                    <div className="trackshipping2">
                      <a href="#">Track Shipping</a>
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
export default connect(mapStateToProps, mapDispatchToProps)(Child);
