import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// redux
import { connect } from "react-redux";
// Dispatch
import { saveLoginUserInfo } from "../../Redux/Action/Login";
import { showHideLoding } from "../../Redux/Action/Loading";
//api
import { uoloadImage } from "../../ApiActions/ImageUpload";
import { updateProduct } from "../../ApiActions/Product";

class productImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.token ? props.token.token : "",
      btnShow: false,
      productImage: this.props.productDetail.heroImage
    };
  }
  componentWillMount() {
    this.props.showHideLoding(false);
  }
  onDrop = acceptedFiles => {
    this.setState({ btnShow: true });
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.uploadImage(file, "product");
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  uploadImage(file, type) {
    const data = new FormData();
    data.append("image", file);
    this.props.showHideLoding(true);
    uoloadImage(data, this.state.token)
      .then(res => {
        this.setState({ productImage: res.data.url });
        this.props.showHideLoding(false);
      })
      .catch(err => {
        toast.success("error");
        this.props.showHideLoding(false);
      });
  }
  updateImage = () => {
    // alert(this.props.userId)
    let data = {
      productId: this.props.productDetail.productId,
      heroImage: this.state.productImage
    };
    this.props.showHideLoding(true);
    updateProduct(data, this.state.token)
      .then(res => {
        // this.setState({ productImage: res.data.url });
        toast.success("Image update successfully.");
        this.props.showHideLoding(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch(err => {
        if (err.response.data.statusCode === 400) {
          toast.error(err.response.data.data);
        }
        this.props.showHideLoding(false);
      });
  };
  render() {
    const { btnShow, productImage } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
      <div className="col-sm-12 col-md-5 col-lg-5 ml-15 last-col product-images">
        <div className="inner-border-wrap">
          <div className="product-thumb-preview">
            <img src={this.props.productDetail ? productImage : "images/product-main-thumb-big.jpg"} alt="face-serum" />
          </div>

          <div className="product-thumbs">
            <ul>
              <li>
                <img
                  src={this.props.productDetail ? productImage : "images/product-main-thumb-big.jpg"}
                  alt="product-thumb-1"
                />
              </li>
              {/* <li>
                                <img src="images/product-thumb-sm.jpg" alt="product-thumb-2" />
                            </li> */}
            </ul>
          </div>

          <div className="product-hero-img upload-field">
            {/* <div className="drag-drop-update"> */}
            <div className="Dropzone">
              <labe>
                <Dropzone onDrop={this.onDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      Drag & Drop
                      <br />
                      or Click To Upload
                      <br />
                      <span className="file-return">{productImage}</span>
                    </div>
                  )}
                </Dropzone>
              </labe>
            </div>
            {/* <label className="edit-mode">
                            <input type="file" name="" />
                            Drag &amp; Drop<br />
                            Or<br />
                            Click Here to Upload
									</label> */}
          </div>
          {btnShow ? (
            <button type="button" className="btn-module" onClick={this.updateImage}>
              Done
            </button>
          ) : null}
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
export default connect(mapStateToProps, mapDispatchToProps)(productImage);
