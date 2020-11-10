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
  name: Yup.string().required("Must enter product name."),
  company: Yup.string().required("Must enter company."),
  email: Yup.string()
    .email("Please valid email address.")
    .required("Must enter an email."),
  password: Yup.string().required("Must enter password.")
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
    const data = new FormData();
    data.append("email", values.email);
    data.append("name", values.name);
    data.append("password", values.password);
    data.append("companyName", values.company);
    data.append("image", this.state.uploadImage);
    data.append("userType", "app");
    debugger
    this.props.showHideLoding(true);
    signUp(data, this.state.token)
      .then(res => {
        console.log(res);
        // this.props.saveLoginUserInfo(res.data.data);
        this.props.showHideLoding(false);
        toast.success("Customer add successfully.");
        setTimeout(() => {
        }, 1000);
        if (res.data.statusCode === 200) {
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
                                initialValues={{ name: "", company: "", email: "", password: "" }}
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
                                              name="name"
                                              placeholder="Insert Company Name Here"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.name}
                                              className={touched.name && errors.name ? "form-control has-error" : "form-control"}
                                            />
                                          <Error touched={touched.name} message={errors.name} />
                                        </div>

                                        <div className="field-group">
                                          <input className="form-control" type="text" placeholder="Insert ABN here" name="" />
                                        </div>

                                        <div className="field-group">
                                          <input className="form-control" type="text" placeholder="Company Website" name="" />
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
                                      <input className="form-control" type="text" placeholder="Insert Contact Name" name="" />
                                      
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
                                      <input className="form-control" type="text" name="" placeholder="Address" />
                                    </div>
                                    <div className="form-group d-flex">
                                      <div className="col-sm-6 col-md-6 col-lg-6">
                                        <select className="form-control">
                                          <option>City</option>
                                          <option>City 1</option>
                                          <option>City 2</option>
                                          <option>City 3</option>
                                        </select>
                                      </div>

                                      <div className="col-sm-6 col-md-6 col-lg-6">
                                        <select className="form-control">
                                          <option>Country</option>
                                          <option>Australia</option>
                                          <option>USA</option>
                                          <option>India</option>
                                        </select>
                                      </div>
                                    </div>

                                    <div className="form-group d-flex">
                                      <div className="col-sm-6 col-md-6 col-lg-6">
                                        <select className="form-control">
                                          <option>State</option>
                                          <option>State 1</option>
                                          <option>State 2</option>
                                          <option>State 3</option>
                                        </select>
                                      </div>

                                      <div className="col-sm-6 col-md-6 col-lg-6">
                                        <input className="form-control" type="text" name="" placeholder="Pincode" />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="detail-info warehouse-address">
                                    <div className="field-group">
                                      <label>Warehouse Address</label>
                                      <input className="form-control" type="text" name="" placeholder="Address" />
                                    </div>
                                    <div className="form-group d-flex">
                                      <div className="col-sm-6 col-md-6 col-lg-6">
                                        <select className="form-control">
                                          <option>City</option>
                                          <option>City 1</option>
                                          <option>City 2</option>
                                          <option>City 3</option>
                                        </select>
                                      </div>

                                      <div className="col-sm-6 col-md-6 col-lg-6">
                                        <select className="form-control">
                                          <option>Country</option>
                                          <option>Australia</option>
                                          <option>USA</option>
                                          <option>India</option>
                                        </select>
                                      </div>
                                    </div>

                                    <div className="form-group d-flex">
                                      <div className="col-sm-6 col-md-6 col-lg-6">
                                        <select className="form-control">
                                          <option>State</option>
                                          <option>State 1</option>
                                          <option>State 2</option>
                                          <option>State 3</option>
                                        </select>
                                      </div>

                                      <div className="col-sm-6 col-md-6 col-lg-6">
                                        <input className="form-control" type="text" name="" placeholder="Pincode" />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="add-product-submit">
                                    {/* <input type="submit" className="btn-module" Done /> */}
                                    <input onClick={() => this.addUser(values)} type="submit" className="btn-module" name="" value="Done" />
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
