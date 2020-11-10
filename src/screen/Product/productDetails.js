import React, { Component } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Error from "../../utils/Error";
// redux
import { connect } from "react-redux";
// Dispatch
import { saveLoginUserInfo } from "../../Redux/Action/Login";
import { showHideLoding } from "../../Redux/Action/Loading";

import OrderStatus from "./orderDetails";
import ProductInfo from "./productInfo";
import ComplianceInfo from "./complianceInfo";
import ProductImage from "./productImage";
import ManufacturerDetails from "./ManufacturerDetails";
//api

class productDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOderStatus: false,
      showProductInfo: false,
      showComplianceInfo: false,
      showProductImage: false,
      showManufacturerDetails: false,
    };
  }
  componentWillMount() {
    this.props.showHideLoding(false);
  }
  render() {
    const { productDetail, userId, shippingData } = this.props;
    // alert(JSON.stringify(productDetail))
    const {
      showOderStatus,
      showProductInfo,
      showComplianceInfo,
      showProductImage,
      showManufacturerDetails,
    } = this.state;
    return (
      <React.Fragment>
        <div className="col-sm-12 col-md-2 col-lg-2 customers-module product-admin-detail ml-15">
          <ul>
            <li className="first-parent">
              <a
                className={showOderStatus ? "active" : ""}
                onClick={() =>
                  this.setState({
                    showOderStatus: !this.state.showOderStatus,
                    showProductInfo: false,
                    showComplianceInfo: false,
                    showProductImage: false,
                    showManufacturerDetails: false,
                  })
                }
                href="#"
              >
                Orders
              </a>
            </li>
            <li className="first-parent">
              <a href="#">Production History</a>
            </li>
            <li className="first-parent">
              <a href="#">Production Performance</a>
            </li>
            <li className="first-parent">
              <a
                className={showProductInfo ? "active" : ""}
                onClick={() =>
                  this.setState({
                    showProductInfo: !this.state.showProductInfo,
                    showOderStatus: false,
                    showComplianceInfo: false,
                    showProductImage: false,
                    showManufacturerDetails: false,
                  })
                }
                href="#"
              >
                Product Details
              </a>
            </li>
            <li className="first-parent">
              <a
                className={showProductImage ? "active" : ""}
                onClick={() =>
                  this.setState({
                    showProductImage: !this.state.showProductImage,
                    showComplianceInfo: false,
                    showOderStatus: false,
                    showProductInfo: false,
                    showManufacturerDetails: false,
                  })
                }
                href="#"
              >
                Product Images
              </a>
            </li>
            <li className="first-parent">
              <a
                className={showManufacturerDetails ? "active" : ""}
                onClick={() =>
                  this.setState({
                    showManufacturerDetails: !showManufacturerDetails,
                    showProductImage: false,
                    showComplianceInfo: false,
                    showOderStatus: false,
                    showProductInfo: false,
                  })
                }
                href="#"
              >
                Manufacturers
              </a>
            </li>
            <li className="first-parent">
              <a
                className={showComplianceInfo ? "active" : ""}
                onClick={() =>
                  this.setState({
                    showComplianceInfo: !this.state.showComplianceInfo,
                    showOderStatus: false,
                    showProductInfo: false,
                    showProductImage: false,
                    showManufacturerDetails: false,
                  })
                }
                href="#"
              >
                Compliance Information
              </a>
            </li>
          </ul>
        </div>
        {showOderStatus ? <OrderStatus productId={productDetail.productId} shippingData={shippingData} /> : null}
        {showProductInfo ? <ProductInfo productDetail={productDetail} userId={userId} /> : null}
        {showComplianceInfo ? <ComplianceInfo productDetail={productDetail} userId={userId} /> : null}
        {showProductImage ? <ProductImage productDetail={productDetail} userId={userId} /> : null}
        {showManufacturerDetails ? <ManufacturerDetails productDetail={productDetail} userId={userId} /> : null}
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
export default connect(mapStateToProps, mapDispatchToProps)(productDetails);
