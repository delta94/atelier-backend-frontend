import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Component/model.scss";
import popcross from '../../img-new/small-cross-icon.svg';
import { Formik } from "formik";
import * as Yup from "yup";
import Error from "../../utils/Error";
import { connect } from "react-redux";
import { saveLoginUserInfo } from "../../Redux/Action/Login";
import { showHideLoding } from "../../Redux/Action/Loading";
import { signUp } from "../../ApiActions/SignUp";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Must enter Product Name."),
  email: Yup.string()
  .email("Please valid Email Address.")
  .required("Must enter an Email."),
  password: Yup.string().required("Must enter Password."),
  companyName: Yup.string().required("Must enter Company."),
  abnNumber: Yup.string().required("Must enter ABN Number."),
  companyWebsite: Yup.string().required("Must enter Company Website."),
  sampleAddress: Yup.string().required("Must enter Company Address."),
  companyCity: Yup.string().required("Must enter Company City."),
  companyState: Yup.string().required("Must enter Company State."),
  companyCountry: Yup.string().required("Must enter Company Country."),
  companyZip: Yup.string().required("Must enter Company Zip."),
  warehouseAddress: Yup.string().required("Must enter warehouse Address."),
  warehouseCity: Yup.string().required("Must enter warehouse City."),
  warehouseState: Yup.string().required("Must enter warehouse State."),
  warehouseCountry: Yup.string().required("Must enter warehouse Country."),
  warehouseZip: Yup.string().required("Must enter warehouse Zip."),
});

class addCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddProduct: false,
      token: props.token ? props.token.token : "",
      imageName: "",
      uploadImage: {}
    };
  }

  componentWillMount() {
    this.props.showHideLoding(false);
  }
  
  addUser = values => {
    const warehouseDate = {
      "city": values.warehouseCity,
      "zip": parseInt(values.warehouseZip),
      "country": values.warehouseCountry,
      "state": values.warehouseState
    }
    const data = new FormData();
    data.append("name", values.name);
    data.append("email", values.email);
    data.append("password", values.password);
    data.append("companyName", values.companyName);
    data.append("companyCity", values.companyCity);
    data.append("companyState", values.companyState);
    data.append("companyCountry", values.companyCountry);
    data.append("companyZip", parseInt(values.companyZip));
    data.append("sampleAddress", values.sampleAddress);
    data.append("warehouseAddress", values.warehouseAddress);
    data.append("wareHouseData", JSON.stringify(warehouseDate));
    data.append("image", this.state.uploadImage);
    data.append("userType", "app");
    this.props.showHideLoding(true);
    signUp(data, this.state.token)
      .then(res => {
        this.props.showHideLoding(false);
        if (res.statusCode === 200) {
          this.props.isCustomerCreated(true);
          this.props.showAddCustomer(false);
        }
      })
      .catch(err => {
        if (err.response.data.statusCode === 400) {
          toast.error(err.response.data.data);
        }
        this.props.showHideLoding(false);
      });
  };

  onPressCancel = () => {
    this.props.showAddCustomer(false);
  }

  onDrop = acceptedFiles => {
    this.setState({ imageName: acceptedFiles[0].name });
    console.log(acceptedFiles);
    // const data = new FormData()
    // data.append('file', acceptedFiles[0])
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        // alert(reader.result)
        // name: photo.fileName ? photo.fileName : `${timeStamp}.JPG`,
        // type: photo.type,
        // uri: photo.uri,
        let image = reader.result;
        let imageObj = {
          name: acceptedFiles[0].name,
          type: acceptedFiles[0].type,
          uri: image
        };
        this.setState({ uploadImage: acceptedFiles[0] });
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
    console.log(reader);
  };
  render() {
    const { showAddProduct, imageName } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />            
            <div className="popup-module edit-payment-popup">
              <div className="popup-content d-flex flex-column">
                  <div className="change-payment-popup">
                    <a href="#" className="not-ready close-popup" onClick={this.onPressCancel}><img src={popcross} alt="small-cross-icon" /></a>
                    <div className="product-details-view d-flex flex-column">
                      <div className="header-content">
                          <div className="popup-content-area">
                            <h3>Customer Details</h3>
                            <div className="popup-form-area">
                              
                              <Formik
                                initialValues={{
                                  name: "",
                                  email: "",
                                  password: "",
                                  companyName: "",
                                  abnNumber: "",
                                  companyWebsite: "",
                                  companyCity: "",
                                  companyState: "",
                                  companyCountry: "",
                                  companyZip: "",
                                  sampleAddress: "",
                                  warehouseAddress: "",
                                  warehouseCity: "",
                                  warehouseState: "",
                                  warehouseCountry: "",
                                  warehouseZip: "",
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { resetForm }) => {
                                  this.addUser(values);
                                  resetForm();
                                }}
                              >
                              {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                              <form onSubmit={handleSubmit}>
                                <div className="add-customer">
                                  <div className="detail-info business-detail">
                                    <div className="row">
                                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 customer-detail">
                                        <div className="field-group">
                                          <label>Business</label>
                                          <input
                                            type="text"
                                            name="companyName"
                                            placeholder="Insert Company Name Here"
                                            value={values.companyName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={touched.companyName && errors.companyName ? "form-control has-error" : "form-control"}
                                          />
                                          <Error touched={touched.companyName} message={errors.companyName} />
                                        </div>

                                        <div className="field-group">
                                          <input
                                            type="text"
                                            name="abnNumber"
                                            placeholder="Insert ABN here"
                                            value={values.abnNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={touched.abnNumber && errors.abnNumber ? "form-control has-error" : "form-control"}
                                          />
                                          <Error touched={touched.abnNumber} message={errors.abnNumber} />
                                        </div>

                                        <div className="field-group">
                                          <input
                                            type="text"
                                            name="companyWebsite" 
                                            placeholder="Company Website"
                                            value={values.companyWebsite}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={touched.companyWebsite && errors.companyWebsite ? "form-control has-error" : "form-control"}
                                          />
                                          <Error touched={touched.companyWebsite} message={errors.companyWebsite} />
                                        </div>
                                      </div>

                                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 customer-logo">
                                        <label>Client Logo</label>
                                        <div className="upload-field">
                                          <div className="Dropzone">
                                            <label>
                                              <Dropzone onDrop={this.onDrop}>
                                                {({ getRootProps, getInputProps }) => (
                                                  <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    Drag & Drop
                                                    <br />
                                                    or Click To Upload
                                                    <br />
                                                    <span className="file-return">{imageName}</span>
                                                  </div>
                                                )}
                                              </Dropzone>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="detail-info customer-login-info">
                                    <div className="field-group">
                                      <label>Contact</label>
                                      <input
                                        type="text"
                                        name="name"
                                        placeholder="Insert Contact Name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        className={touched.name && errors.name ? "form-control has-error" : "form-control"}
                                      />
                                      <Error touched={touched.name} message={errors.name} />
                                      
                                      <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        className={touched.email && errors.email ? "form-control has-error" : "form-control"}
                                      />
                                      <Error touched={touched.email} message={errors.email} />

                                      <input
                                        type="text"
                                        name="password"
                                        placeholder="customer password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        className={touched.password && errors.password ? "form-control has-error" : "form-control"}
                                      />
                                      <Error touched={touched.password} message={errors.password} />
                                    </div>
                                  </div>

                                  <div className="detail-info company-address">
                                    <div className="field-group">
                                      <label>Company Address</label>
                                      <input
                                        type="text"
                                        name="sampleAddress"
                                        placeholder="Address"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.sampleAddress}
                                        className={touched.sampleAddress && errors.sampleAddress ? "form-control has-error" : "form-control"}
                                      />
                                      <Error touched={touched.sampleAddress} message={errors.sampleAddress} />
                                    </div>

                                    <div className="form-group d-flex">
                                      <div className="col-sm-6 col-md-6 col-lg-6">
                                        <input
                                          type="text"
                                          name="companyCity"
                                          placeholder="City"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.companyCity}
                                          className={touched.companyCity && errors.companyCity ? "form-control has-error" : "form-control"}
                                        />
                                        <Error touched={touched.companyCity} message={errors.companyCity} />
                                      </div>

                                      <div className="col-sm-6 col-md-6 col-lg-6">
                                        <input
                                          type="text"
                                          name="companyCountry"
                                          placeholder="Country"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.companyCountry}
                                          className={touched.companyCountry && errors.companyCountry ? "form-control has-error" : "form-control"}
                                        />
                                        <Error touched={touched.companyCountry} message={errors.companyCountry} />
                                      </div>
                                    </div>

                                    <div className="form-group d-flex">
                                      <div className="col-sm-6 col-md-6 col-lg-6">
                                        <input
                                          type="text"
                                          name="companyState"
                                          placeholder="State"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.companyState}
                                          className={touched.companyState && errors.companyState ? "form-control has-error" : "form-control"}
                                        />
                                        <Error touched={touched.companyState} message={errors.companyState} />
                                      </div>

                                      <div className="col-sm-6 col-md-6 col-lg-6">
                                        <input
                                          className="form-control"
                                          type="text"
                                          name="companyZip"
                                          placeholder="Pincode"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.companyZip}
                                          className={touched.companyZip && errors.companyZip ? "form-control has-error" : "form-control"}
                                        />
                                        <Error touched={touched.companyZip} message={errors.companyZip} />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="detail-info warehouse-address">
                                    <div className="field-group">
                                      <label>Warehouse Address</label>
                                      <input
                                        type="text"
                                        name="warehouseAddress"
                                        placeholder="Address"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.warehouseAddress}
                                        className={touched.warehouseAddress && errors.warehouseAddress ? "form-control has-error" : "form-control"}
                                      />
                                      <Error touched={touched.warehouseAddress} message={errors.warehouseAddress} />
                                    </div>
                                    <div className="form-group d-flex">
                                      <div className="col-sm-6 col-md-6 col-lg-6">
                                        <input
                                          type="text"
                                          name="warehouseCity"
                                          placeholder="City"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.warehouseCity}
                                          className={touched.warehouseCity && errors.warehouseCity ? "form-control has-error" : "form-control"}
                                        />
                                        <Error touched={touched.warehouseCity} message={errors.warehouseCity} />
                                      </div>

                                      <div className="col-sm-6 col-md-6 col-lg-6">
                                        <input
                                          type="text"
                                          name="warehouseCountry"
                                          placeholder="Country"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.warehouseCountry}
                                          className={touched.warehouseCountry && errors.warehouseCountry ? "form-control has-error" : "form-control"}
                                        />
                                        <Error touched={touched.warehouseCountry} message={errors.warehouseCountry} />
                                      </div>
                                    </div>

                                    <div className="form-group d-flex">
                                      <div className="col-sm-6 col-md-6 col-lg-6">
                                        <input
                                          type="text"
                                          name="warehouseState"
                                          placeholder="State"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.warehouseState}
                                          className={touched.warehouseState && errors.warehouseState ? "form-control has-error" : "form-control"}
                                        />
                                        <Error touched={touched.warehouseState} message={errors.warehouseState} />
                                      </div>

                                      <div className="col-sm-6 col-md-6 col-lg-6">
                                        <input
                                          type="text"
                                          name="warehouseZip"
                                          placeholder="Pincode"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.warehouseZip}
                                          className={touched.warehouseZip && errors.warehouseZip ? "form-control has-error" : "form-control"}
                                        />
                                        <Error touched={touched.warehouseZip} message={errors.warehouseZip} />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="add-product-submit">
                                    <input type="submit" className="btn-module" value='Done' />
                                  </div>
                                </div>
                              </form>
                              )}
                            </Formik>
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
export default connect(mapStateToProps, mapDispatchToProps)(addCustomer);
