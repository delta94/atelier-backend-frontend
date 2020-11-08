import React, { Component } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logoawhite from "../../img-new/icon-a-white.svg";
// dummy images
import demothumb from "../../images/product-main-thumb.jpg";
import "./product-reorder.scss";

import Error from "../../utils/Error";
// redux
import { connect } from "react-redux";
// Dispatch
import { saveLoginUserInfo } from "../../Redux/Action/Login";
import { showHideLoding } from "../../Redux/Action/Loading";
import ProductDetails from "./productDetails";
import AddProduct from "./addProduct";
//api
import { GetProduct } from "../../ApiActions/Product";
class product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.token ? props.token.token : "",
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
        <div className="col-sm-12 col-md-3 col-lg-3 products-module d-flex flex-column ml-15">
          <div className="btn-new-product">
            <a
              onClick={() => this.setState({ showAddProduct: !this.state.showAddProduct, showProductDetails: false })}
              className="btn-module-black"
              href="#"
            >
              New Product
            </a>
          </div>

          <div className="product-listing-dashboard">
            <h4><span>Bear</span> Products</h4>
            
            <ul className="product-listing d-flex flex-column">
              {productList.map((product) => (
                <li className={product.productId == active ? "active" : ""}>
                  {/* <a onClick={() => this.setState({ showProductDetails: !this.state.showProductDetails, showAddProduct: false })} href="#"> */}
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
            </ul>
          </div>
        </div>
        {showAddProduct ? <AddProduct userId={userId} /> : null}
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
    token: state.login.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveLoginUserInfo: (data) => dispatch(saveLoginUserInfo(data)),
    showHideLoding: (data) => dispatch(showHideLoding(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(product);
