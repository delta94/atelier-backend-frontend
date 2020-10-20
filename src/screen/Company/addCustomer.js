import React, { Component } from "react";
// import { useDropzone } from 'react-dropzone';

import Dropzone from "react-dropzone";
// import Dropzone from 'react-dropzone';
// import Dropzone from '../Component/imageUpload.js';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import * as Yup from "yup";
import Error from "../../utils/Error";
// redux
import { connect } from "react-redux";
// Dispatch
import { saveLoginUserInfo } from "../../Redux/Action/Login";
import { showHideLoding } from "../../Redux/Action/Loading";
//api
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
      token: props.loginUserInfo ? props.loginUserInfo.access_token : "",
      imageName: "",
      uploadImage: {}
    };
  }
  componentWillMount() {
    this.props.showHideLoding(false);
  }
  addUser = values => {
    // alert(JSON.stringify(values))
    // name: "", company: "", email: "", password: ""
    const data = new FormData();
    data.append("email", values.email);
    data.append("name", values.name);
    data.append("password", values.password);
    data.append("companyName", values.company);
    data.append("image", this.state.uploadImage);
    data.append("userType", "app");
    // console.log(JSON.stringify())
    this.props.showHideLoding(true);
    signUp(data, this.state.token)
      .then(res => {
        console.log(res);
        // this.props.saveLoginUserInfo(res.data.data);
        this.props.showHideLoding(false);
        toast.success("Customer add successfully.");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        if (res.data.statusCode === 200) {
          // let reduxData = JSON.parse(localStorage.getItem(`persist:${apiCommonParams.REDUX_STORE_KEY}`));
          // let authReducer = JSON.parse(reduxData.login);
          // // // headers['Authorization'] = `bearer ${res.data.access_token}`;
          // authReducer.access_token = res.headers.authorization
          // reduxData.login = JSON.stringify(authReducer);
          // localStorage.setItem(`persist:${apiCommonParams.REDUX_STORE_KEY}`, JSON.stringify(reduxData));
          // setTimeout(() => { this.props.history.push('/home') }, 1000);
        }
      })
      .catch(err => {
        if (err.response.data.statusCode === 400) {
          toast.error(err.response.data.data);
        }
        this.props.showHideLoding(false);
      });
  };
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
        <Formik
          initialValues={{ name: "", company: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            this.addUser(values);
            resetForm();
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <div className="col-sm-12 col-md-5 col-lg-5 product-detail-admin ml-15">
              <div className="product-details-view d-flex flex-column">
                <form onSubmit={handleSubmit}>
                  <div className="add-new-product add-customer">
                    <div className="prod-detail detail-block">
                      <p>Customer Details</p>
                      <div className="field-grups">
                        <div className="input-groups">
                          <div className="col-md-12 no-padding">
                            <label>Customer User Name</label>
                            <input
                              type="text"
                              name="name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                              className={touched.name && errors.name ? "has-error" : ""}
                            />
                            <Error touched={touched.name} message={errors.name} />
                          </div>
                        </div>

                        <div className="input-groups">
                          <div className="col-md-12 no-padding">
                            <label>Customer Company Name</label>
                            <input
                              type="text"
                              name="company"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.company}
                              className={touched.company && errors.company ? "has-error" : ""}
                            />
                            <Error touched={touched.company} message={errors.company} />
                          </div>
                        </div>

                        <div className="product-hero-img upload-field">
                          <p>Customer Image/Logo</p>
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
                                    <span className="file-return">{imageName}</span>
                                  </div>
                                )}
                              </Dropzone>
                            </labe>
                          </div>
                          {/* <Dropzone onDrop={this.handleOnDrop}>Drop</Dropzone> */}
                          {/* <label>
                                                    <input type="file" name="" />
                                                    Drag & Drop<br />
                                                    or Click To Upload
												</label> */}
                        </div>

                        <div className="input-groups">
                          <div className="col-md-12 no-padding">
                            <label>Customer Email</label>
                            <input
                              type="email"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              className={touched.email && errors.email ? "has-error" : ""}
                            />
                            <Error touched={touched.email} message={errors.email} />
                          </div>
                        </div>

                        <div className="input-groups">
                          <div className="col-md-12 no-padding">
                            <label>Customer Password</label>
                            <input
                              type="text"
                              name="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                              className={touched.password && errors.password ? "has-error" : ""}
                            />
                            <Error touched={touched.password} message={errors.password} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="add-product-submit">
                      <button type="submit" className="btn-module">
                        Done
                      </button>
                    </div>
                  </div>
                </form>
              </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(addCustomer);
