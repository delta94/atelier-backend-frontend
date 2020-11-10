import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

import logoawhite from "../../img-new/icon-a-admin-white.svg";
import "./product-reorder.scss";
import "./product-accordion.scss";

// dummy images
import demothumb from "../../img-new/product-bottle.png";
import demothumb1 from "../../img-new/product-dropper.png";
import demothumb2 from "../../img-new/label-thumb.jpg";
import demothumb3 from "../../img-new/secondary-packaging.jpg";
import iconai from "../../img-new/icon-ai.svg";
import iconpdf from "../../img-new/icon-pdf.svg";
import { Slider } from "@material-ui/core";


import Error from "../../utils/Error";
import { connect } from "react-redux";
import { saveLoginUserInfo } from "../../Redux/Action/Login";
import { showHideLoding } from "../../Redux/Action/Loading";
import ProductDetails from "./productDetails";
import AddProduct from "./addProduct";
import { GetProduct } from "../../ApiActions/Product";

class product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.loginUserInfo ? props.loginUserInfo.access_token : "",
      showProductDetails: false,
      showAddProduct: false,
      showAddCustomer: false,
      productList: [],
      active: "",
    };
  }

  componentWillMount() {
    // this.props.showHideLoding(false)
    this.GetProductList();
  }

  GetProductList = () => {
    // this.props.showHideLoader(false)
    this.props.showHideLoding(true);
    GetProduct(this.props.userId, this.state.token)
      .then((response) => {
        this.props.showHideLoding(false);
        this.setState({ productList: response.data.data.productsList });
        console.log("productList :" + JSON.stringify(response.data.data.productsList));
      })
      .catch((err) => {
        this.props.showHideLoding(false);
        //  this.props.showHideLoader(false)
      });
  };

  showProductDetail = (productDetail) => {
    this.setState({
      showProductDetails: true,
      showAddProduct: false,
      productDetail: productDetail,
      active: productDetail.productId,
    });
  };

  render() {
    const { userId, shippingData } = this.props;
    const { productList, showAddProduct, showProductDetails, productDetail, active } = this.state;
    return (
      <React.Fragment>
        <div className="row justify-content-between">
          <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 loggedin-user-dashboard d-flex flex-column">
            <div className="titlearea">
              <label>Customer: <span>Bear</span></label>
              <h3>
                Here’s an overview of your Bear’s. Click the drop <br/>down for more details.
              </h3>
            </div>

            <div className="bodyarea d-flex flex-column">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="row justify-content-between">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex no-padding">
                    <div className="product-listing-dashboard">
                      <h4>Bear Products</h4>

                      <ul className="product-listing d-flex flex-column all-products">
                        {productList.map((product) => (
                          <li className={product.productId == active ? "active" : ""}>
                            
                            {/* Delete Product on click del-product */}
                            <div className="del-product"><span className="delicon"></span></div>

                            <a onClick={() => this.showProductDetail(product)} href="#">
                              <div className="product-thumb d-flex align-items-center justify-content-center">
                                <img
                                  src={product.heroImage ? product.heroImage : "images/face-serun-60ml.png"}
                                  alt="face-serun-60ml"
                                />
                                {/* <img src={product.heroImage.length > 0 ? product.heroImage[0].url : "images/face-serun-60ml.png"} alt="bottle-img" /> */}
                              </div>
                              <div className="product-title d-flex justify-content-between">
                                <div className="product-name">{product.name}</div>
                                <div className="product-qty">{product.volume}mL</div>
                              </div>
                            </a>
                          </li>
                        ))}

                        {/* Active class will be add on click to specific li only */}
                        <li className="active">
                            {/* Delete Product on click del-product */}
                            <div className="del-product"><span className="delicon"></span></div>

                            <a href="#">
                              <div className="product-thumb d-flex align-items-center justify-content-center">
                                <img
                                  src="images/face-serun-60ml.png" alt="face-serun-60ml"
                                />
                              </div>
                              <div className="product-title d-flex justify-content-between">
                                <div className="product-name">Wonder</div>
                                <div className="product-qty">60mL</div>
                              </div>
                            </a>
                          </li>
                        <li>
                          <div className="btn-new-product">
                            <a onClick={() => this.setState({ showAddProduct: !this.state.showAddProduct, showProductDetails: false })} className="add-fresh-trigger" href="#">
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

                    {this.state.showAddProduct === false ? <div className="product-details-wrap">
                      <div className="product-detail d-flex flex-column">
                        <h4>Product Overview</h4>

                        <div className="product-detail-accordion">
                          <ul>
                            <li>
                              <button
                                type="button"
                                data-toggle="collapse"
                                data-target="#overview"
                                aria-expanded="true"
                                aria-controls="overview"
                                className="opened"
                              >
                                Overview
                              </button>

                              <div className="collapse show" id="overview">
                                <div className="card card-body">
                                  <div className="product-details-wrapper">
                                    <div className="details-header d-flex">
                                      <div className="col">Total Units Manufactured</div>
                                      <div className="col">Average Cost</div>
                                      <div className="col">Actual Production Time</div>
                                      <div className="col">Production Time</div>
                                      <div className="col">On Time Delivery %</div>
                                    </div>

                                    <div className="details-body d-flex">
                                      <div className="repeater-row d-flex">
                                        <div className="col">30,000</div>
                                        <div className="col">$6.90</div>
                                        <div className="col">45 days</div>
                                        <div className="col">40 days</div>
                                        <div className="col">100%</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>

                            <li>
                              <button
                                type="button"
                                data-toggle="collapse"
                                data-target="#productSpecification"
                                aria-expanded="false"
                                aria-controls="productSpecification"
                              >
                                Product Specifications
                              </button>

                              <div className="collapse" id="productSpecification">
                                <div className="card card-body">
                                  <div className="product-details-wrapper">
                                    <div className="details-header d-flex">
                                      <div className="col">Primary Packaging</div>
                                      <div className="col">Label</div>
                                      <div className="col">Secondary Packaging</div>
                                    </div>

                                    <div className="details-body d-flex">
                                    
                                      <div className="col d-flex flex-wrap primary-package">
                                        <div className="pic thumb1">
                                          <img src={demothumb} alt="bottle" />
                                          <label>
                                            <span>43mL</span> Face Oil
                                          </label>
                                        </div>

                                        <div className="pic thumb2">
                                        <img src={demothumb1} alt="bottle" />
                                          <label>
                                            <span>2cc</span> White Cap
                                          </label>
                                        </div>
                                      </div>
                                      
                                      <div className="col d-flex flex-wrap primary-package">
                                        <div className="pic thumb1">
                                        <img src={demothumb2} alt="bottle" />
                                          <label className="text-left">
                                          Wrap around Hahnemule cotton rag 240 GSM
                                          </label>
                                        </div>
                                      </div>

                                      
                                      <div className="col d-flex flex-wrap primary-package">
                                        <div className="pic thumb1">
                                        <img src={demothumb3} alt="bottle" />
                                          <label className="text-left">
                                            300GSM uncoated card paper
                                          </label>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="details-header d-flex formulation">
                                      <div className="col">Formulation Ingredients</div>
                                    </div>

                                    <div className="details-body d-flex formulation-text">
                                      Water (Aqua), Glycerin, Squalane, Coco-Caprylate, Tribehenin PEG 20 Esters, Simmondsia Chinensis (Jojoba) Seed Oil, Jojoba Esters, Sodium Acrylates Copolymer, Phenoxyethanol, Saccharide Isomerate, Helianthus Annuus (Sunflower) Seed Wax, Ethylhexylglycerin, Lecithin, Silica.
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>

                            <li>
                              <button
                                type="button"
                                data-toggle="collapse"
                                data-target="#componentdetails"
                                aria-expanded="false"
                                aria-controls="componentdetails"
                              >
                                Order History
                              </button>

                              <div className="collapse" id="componentdetails">
                                <div className="card card-body">
                                  <div className="product-details-wrapper">
                                    <div className="details-header d-flex">
                                      <div className="col">Order No.</div>
                                      <div className="col">Date</div>
                                      <div className="col">Product</div>
                                      <div className="col">Amount</div>
                                      <div className="col">Status</div>
                                    </div>

                                    <div className="details-body">
                                        <div className="repeater-row d-flex">
                                          <div className="col">#0001</div>
                                          <div className="col">22/06/2020</div>
                                          <div className="col">Wonder</div>
                                          <div className="col">
                                            $36,700
                                          </div>
                                          <div className="col"><span className="status-pending">Pending</span></div>
                                        </div>
                                      

                                      <div className="repeater-row d-flex">
                                        <div className="col">00002</div>
                                        <div className="col">22/06/2020</div>
                                        <div className="col">Wonder</div>
                                        <div className="col">$36,700</div>
                                        <div className="col"><span className="status-complete">Complete</span></div>
                                      </div>

                                      <div className="repeater-row d-flex">
                                        <div className="col">00003</div>
                                        <div className="col">22/06/2020</div>
                                        <div className="col">Wonder</div>
                                        <div className="col">$36,700</div>
                                        <div className="col"><span className="status-inproduction">In Production</span></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>

                            <li>
                              <button
                                type="button"
                                data-toggle="collapse"
                                data-target="#productdesign"
                                aria-expanded="false"
                                aria-controls="productdesign"
                              >
                                Design
                              </button>

                              <div className="collapse" id="productdesign">
                                <div className="card card-body">
                                  <div className="product-details-wrapper">
                                    <div className="details-header d-flex product-design-artwork">
                                      <div className="col">Primary Packaging</div>
                                      <div className="col">Label</div>
                                      <div className="col">Secondary Packaging</div>
                                    </div>

                                    <div className="details-body d-flex">
                                      <div className="repeater-row d-flex product-design-artwork">
                                        <div className="col">
                                          <Link
                                            to="#"
                                            className="d-flex flex-column align-items-start"
                                          >
                                            <img src={iconai} alt="dropper" />
                                            <label>
                                              Last updated on <span>29th September 2020</span>
                                            </label>
                                          </Link>
                                        </div>
                                        <div className="col d-flex flex-column align-items-start">
                                          <Link
                                            to="#"
                                            className="d-flex flex-column align-items-start"
                                          >
                                            <img src={iconpdf} alt="dropper" />
                                            <label>
                                              Last updated on <span>29th September 2020</span>
                                            </label>
                                          </Link>
                                        </div>
                                        <div className="col d-flex flex-column align-items-start">
                                          <Link
                                            to="#"
                                            className="d-flex flex-column align-items-start"
                                          >
                                            <img src={iconai} alt="dropper" />
                                            <label>
                                              Last updated on <span>29th September 2020</span>
                                            </label>
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>:<AddProduct userId={userId} />}

                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 activity-feed">
            <div className="activity-title">
              <span>
                Re-Order: <br />
                Wonder
              </span>
              <img src={logoawhite} alt="alogo" />
            </div>

            <div className="product-main-thumb d-flex align-items-center justify-content-center">
              <div className="product-thumb-wrap">
                <img
                  src={demothumb}
                  alt="demothumb"
                />
                
              </div>
            </div>

            <div className="product-qty-price">
              <div className="product-qty">
                <p>Quantity</p>
                <div className="qty-range">
                  <div className="qty-range">
                    {/*<input type="range" className="custom-range" id="customRange1" min="5000" max="50000" value="5000" />*/}
                      <Slider 
                      onChange={this.handleSliderChange}
                      aria-labelledby="input-slider"
                      max="100000"
                      min="5000"
                    />
                  </div>
                </div>

                <div className="price-calculation-wrap">
                  <div className="row-price">
                    <div className="price-heading d-flex">
                      <div className="col">COST</div>
                      <div className="col">Units</div>
                    </div>
                    <div className="price-units d-flex">
                      <div className="col">$6.88 AUD</div>
                      <div className="col">5000</div>
                    </div>
                  </div>

                  <div className="row-price">
                    <div className="price-heading d-flex">
                    <div className="col">RRP</div>
                      <div className="col">margin</div>
                    </div>
                    <div className="price-units d-flex">
                      <div className="col">$198.00</div>
                      <div className="col">76.52%</div>
                    </div>
                  </div>
                </div>

                <div className="production-timeline d-flex flex-wrap">
                  <div className="col-wrap">
                    <div className="col-12">Production Time</div>
                    <div className="col-12">40 days</div>
                  </div>

                  <div className="col-wrap">
                    <div className="col-12">
                      If you order now, your product will land in your
                      distribution centre by the:
                    </div>
                    <div className="col-12">
                      16th, August 2020
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showProductDetails ? (
          <ProductDetails productDetail={productDetail} userId={userId} shippingData={shippingData} />
        ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(product);
