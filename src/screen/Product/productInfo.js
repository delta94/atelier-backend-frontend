import React, { Component } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Error from "../../utils/Error";

import { Formik } from "formik";
import * as Yup from "yup";
// redux
import { connect } from "react-redux";
// Dispatch
import { saveLoginUserInfo } from "../../Redux/Action/Login";
import { showHideLoding } from "../../Redux/Action/Loading";
import { updateProduct } from "../../ApiActions/Product";
//api
const validationSchema = Yup.object().shape({
  // name: Yup.string()
  //   // .min(3, "Must have 6 character.")
  //   // .max(255, "Must be shorter than 255.")s
  //   .required("Must enter product name."),
  volume: Yup.string()
    // .email("Please valid email address.")
    // .max(255, "Must be shorter than 255.")
    .required("Must enter volume."),
  bottleName: Yup.string().required("Must enter bottle name."),
  closureName: Yup.string().required("Must enter closure name."),
  // productionTime: Yup.string().required("Must enter production time."),
  // bottleSize: Yup.string().required("Must enter bottle size."),
  closureColor: Yup.string().required("Must enter closure color."),
  bottleColor: Yup.string().required("Must enter bottle color."),
  neckSize: Yup.string().required("Must enter neck size."),
  boxType: Yup.string().required("Must enter box type."),
  shippingType: Yup.string().required("Must enter shipping type"),
  // secondProductionTime: Yup.string().required("Must enter Production time"),
  boxMaterial: Yup.string().required("Must enter box material"),
  shippingMaterial: Yup.string().required("Must enter shipping material"),
  boxSize: Yup.string().required("Must enter box size"),
  shippingSize: Yup.string().required("Must enter shipping size"),
  ingredientsList: Yup.string().required("Must enter ingredients list")
})

class productUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.loginUserInfo ? props.loginUserInfo.access_token : "",
      companyDetails: false,
      editable: false,
      productDetail: this.props.productDetail
    };
  }
  componentWillMount() {
    // alert(this.props.productDetail.productId);
    this.props.showHideLoding(false);
  }
  updateDetails = (values) => {
    // let data = ""
    // alert("aa :", this.props.userId)
    let data = {
      productId: this.props.productDetail.productId,
      volume: parseInt(values.volume),
      primaryPackaging: {
        bottleName: values.bottleName,
        bottleColor: values.bottleColor,
        closureName: values.closureName,
        closureColor: values.closureColor,
        closureNeckSize: values.neckSize
      },
      secondaryPackaging: {
        boxType: values.boxType,
        shippingType: values.shippingType,
        boxMaterial: values.boxMaterial,
        shippingMaterial: values.shippingMaterial,
        boxSize: values.boxSize,
        shippingSize: parseInt(values.shippingSize),
      },
      formulationPackaging: {
        ingredientsList: values.ingredientsList
      }
    };
    console.log("data :", JSON.stringify(data))
    this.props.showHideLoding(true);
    updateProduct(data, this.state.token)
      .then(res => {
        // this.setState({ productImage: res.data.url });
        toast.success("Product update successfully.");
        this.props.showHideLoding(false);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch(err => {
        if (err.response.data.statusCode === 400) {
          toast.error(err.response.data.data);
        }
        this.props.showHideLoding(false);
      });
  }
  render() {
    const { editable, productDetail } = this.state;
    // console.log(JSON.stringify(productDetail));
    return (
      <React.Fragment>
        <ToastContainer />
      <Formik initialValues={{volume: productDetail.volume ,bottleColor: productDetail.primaryPackaging ? productDetail.primaryPackaging.bottleColor : "", bottleName: productDetail.primaryPackaging ? productDetail.primaryPackaging.bottleName : "",closureName: productDetail.primaryPackaging ? productDetail.primaryPackaging.closureName : "",closureColor: productDetail.primaryPackaging ? productDetail.primaryPackaging.closureColor : "",neckSize: productDetail.primaryPackaging ? productDetail.primaryPackaging.closureNeckSize : "",boxType: productDetail.secondaryPackaging ? productDetail.secondaryPackaging.boxType : "",shippingType: productDetail.secondaryPackaging ? productDetail.secondaryPackaging.shippingType : "",boxMaterial: productDetail.secondaryPackaging ? productDetail.secondaryPackaging.boxMaterial : "",shippingMaterial: productDetail.secondaryPackaging ? productDetail.secondaryPackaging.shippingMaterial : "",boxSize: productDetail.secondaryPackaging ? productDetail.secondaryPackaging.boxSize : "",shippingSize: productDetail.secondaryPackaging ? productDetail.secondaryPackaging.shippingSize : "",ingredientsList: productDetail.formulationPackaging ? productDetail.formulationPackaging.ingredientsList : ""}} validationSchema={validationSchema} onSubmit={(values, { resetForm }) => { this.updateDetails(values);resetForm();}}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <div className="col-sm-12 col-md-5 col-lg-5 product-detail-admin ml-15">
            <form onSubmit={handleSubmit}>
              <div className="product-details-view d-flex flex-column">
                {/* <!-- packaging item 1 --> */}
                <div className="package-item primary-packaging">
                  <div className="package-name">
                    <p>
                      Primary <br />
                      Packaging
                    </p>
                    <div className={editable?"package-detail-text edit-mode":"package-detail-text"}>
                      {editable ? (
                        <div className="detail-col">
                          <p>Bottle Colour</p>
                          <input
                            type="text"
                            name="bottleColor"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.bottleColor}
                            className={touched.bottleColor && errors.bottleColor ? "has-error" : ""}
                          />
                          <Error touched={touched.bottleColor} message={errors.bottleColor} />
                          <p>Bottle Name </p>
                          <input
                            type="text"
                            name="bottleName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.bottleName}
                            className={touched.bottleName && errors.bottleName ? "has-error" : ""}
                          />
                          <Error touched={touched.bottleName} message={errors.bottleName} />
                          <p>Volume </p>
                          <input
                            type="number"
                            name="volume"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.volume}
                            className={touched.volume && errors.volume ? "has-error" : ""}
                          />
                          <Error touched={touched.volume} message={errors.volume} />
                        </div>
                      ) : (
                        <div className="detail-col">
                          <p>{productDetail.volume}mL</p>
                          <p>
                            {productDetail.primaryPackaging.bottleColor} {productDetail.primaryPackaging.bottleName}{" "}
                          </p>
                          {/* <p>White Square Shoulder Bottle</p> */}
                        </div>
                      )}
                      {editable ? (
                        <div className="detail-col">
                          <p>Neck Size</p>
                          <input
                            type="text"
                            name="neckSize"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.neckSize}
                            className={touched.neckSize && errors.neckSize ? "has-error" : ""}
                          />
                          <Error touched={touched.neckSize} message={errors.neckSize} />
                          <p>Closure Colour</p>
                          <input
                            type="text"
                            name="closureColor"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.closureColor}
                            className={touched.closureColor && errors.closureColor ? "has-error" : ""}
                          />
                          <Error touched={touched.closureColor} message={errors.closureColor} />
                          <p>Closure Name</p>
                          <input
                            type="text"
                            name="closureName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.closureName}
                            className={touched.closureName && errors.closureName ? "has-error" : ""}
                          />
                          <Error touched={touched.closureName} message={errors.closureName} />
                        </div>
                      ) : (
                        <div className="detail-col">
                          <p>
                            {productDetail.primaryPackaging.closureNeckSize}{" "}
                            {productDetail.primaryPackaging.closureColor} {productDetail.primaryPackaging.closureName}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="package-thumb">
                    <div className="thumb">
                      <img src="images/pckage-thumb1.jpg" alt="package-thumb1" />
                    </div>
                    <div className="thumb">
                      <img src="images/pckage-thumb2.jpg" alt="package-thumb1" />
                    </div>
                  </div>
                </div>

                {/* <!-- packaging item 2 --> */}
                <div className="package-item secondary-packaging">
                  <div className="package-name">
                    <p>
                      Secondary <br />
                      Packaging
                    </p>
                    <div className={editable?"package-detail-text edit-mode":"package-detail-text"}>
                      {editable ? (
                        <div className="detail-col">
                          <p>Box Type</p>
                          <input
                            type="text"
                            name="boxType"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.boxType}
                            className={touched.boxType && errors.boxType ? "has-error" : ""}
                          />
                          <Error touched={touched.boxType} message={errors.boxType} />
                          <p>Shipping Type</p>
                          <input
                            type="text"
                            name="shippingType"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.shippingType}
                            className={touched.shippingType && errors.shippingType ? "has-error" : ""}
                          />
                          <Error touched={touched.shippingType} message={errors.shippingType} />
                        </div>
                      ) : (
                        <div className="detail-col">
                          {/* <p>{productDetail.volume}mL </p> */}
                          <p>
                            {productDetail.secondaryPackaging.boxType} {productDetail.secondaryPackaging.shippingType}{" "}
                          </p>
                          {/* <p>White Square Shoulder Bottle</p> */}
                        </div>
                      )}
                      {editable ? (
                        <div className="detail-col">
                          <p>Box Material</p>
                          <input
                            type="text"
                            name="boxMaterial"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.boxMaterial}
                            className={touched.boxMaterial && errors.boxMaterial ? "has-error" : ""}
                          />
                          <Error touched={touched.boxMaterial} message={errors.boxMaterial} />
                          <p>Shipping Material</p>
                          <input
                            type="text"
                            name="shippingMaterial"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.shippingMaterial}
                            className={touched.shippingMaterial && errors.shippingMaterial ? "has-error" : ""}
                          />
                          <Error touched={touched.shippingMaterial} message={errors.shippingMaterial} />
                          <p>Box Size</p>
                          <input
                            type="text"
                            name="boxSize"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.boxSize}
                            className={touched.boxSize && errors.boxSize ? "has-error" : ""}
                          />
                          <Error touched={touched.boxSize} message={errors.boxSize} />
                          <p>Shipping Size</p>
                          <input
                            type="number"
                            name="shippingSize"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.shippingSize}
                            className={touched.shippingSize && errors.shippingSize ? "has-error" : ""}
                          />
                          <Error touched={touched.shippingSize} message={errors.shippingSize} />
                        </div>
                      ) : (
                        <div className="detail-col">
                          <p>
                            {productDetail.secondaryPackaging.boxMaterial}{" "}
                            {productDetail.secondaryPackaging.shippingMaterial} {productDetail.secondaryPackaging.boxSize} {productDetail.secondaryPackaging.shippingSize}
                          </p>
                        </div>
                      )}
                    </div>
                    {/* <div className="package-detail-text">
                      <div className="detail-col">
                        <p>
                          No Secondary <br />
                          Packaging
                        </p>
                      </div>
                      <div className="detail-col">&nbsp;</div>
                    </div> */}
                  </div>
                  <div className="package-thumb">&nbsp;</div>
                </div>

                {/* <!-- packaging item 3 --> */}
                <div className="package-item formulation">
                  <div className="package-name">
                    <p>Formulation</p>
                    <div className="package-detail-text">
                      <div className="detail-col">
                        <p>{productDetail.name} Formulation</p>
                      </div>
                    </div>
                  </div>
                  {editable ? (
                    <div className="formulation-detail">
                      <p>Formulation</p>
                      <textarea
                        rows="4"
                        cols="30"
                        type="text"
                        name="ingredientsList"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.ingredientsList}
                        className={touched.ingredientsList && errors.ingredientsList ? "has-error" : ""}
                      />
                      <Error touched={touched.ingredientsList} message={errors.ingredientsList} />
                    </div>
                  ) : (
                    <div className="formulation-detail">{productDetail.formulationPackaging.ingredientsList}</div>
                  )}
                </div>

                <div className="package-item formulation branding">
                  <div className="package-name">
                    <p>Branding</p>
                    <div className="package-detail-text">
                      <div className="detail-col">
                        <p>Single Colour Silk Screen Printing</p>
                      </div>
                    </div>
                  </div>
                  <div className="formulation-detail">
                    <div className="pdf-files-wrap">
                      <div className="pdf-file file-wrap">
                        <a href="#">
                          <img src="images/pdf-icon-admin.png" alt="pdf-icon" />
                          <label>
                            Final <br />
                            Artwork <br />
                            PDF
                          </label>
                        </a>
                      </div>
                      <div className="ai-file file-wrap">
                        <a href="#">
                          <img src="images/ai-icon-admin.png" alt="ai-icon" />
                          <label>
                            Final <br />
                            Artwork <br />
                            AI
                          </label>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="update-submit">
                  {editable ? (
                    <button type="submit" className="btn-module">
                      Done
                    </button>
                  ) : null}
                </div>
                <div className="edit-btn">
                  <button type="button" onClick={() => this.setState({ editable: !this.state.editable })}>
                    <img src="images/edit-icon-admin.svg" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </Formik>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    loginUserInfo: state.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveLoginUserInfo: data => dispatch(saveLoginUserInfo(data)),
    showHideLoding: data => dispatch(showHideLoding(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(productUpdate);

