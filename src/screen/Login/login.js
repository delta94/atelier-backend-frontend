import React, { Component } from 'react';

import { apiCommonParams } from '../../ApiActions/DbConfig/ApiBaseUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Formik } from 'formik';
import * as Yup from 'yup';
import Error from '../../utils/Error'
// redux
import { connect } from 'react-redux';
// Dispatch 
import { saveLoginUserInfo, saveToken } from '../../Redux/Action/Login'
import { showHideLoding } from '../../Redux/Action/Loading'
//api 
import { login } from '../../ApiActions/Login'

// atelier logo
import atelierlogo from "../../img-new/atelier-logo.svg"; 

// alogo header only
import Alogo from "../Component/header/header";

// style
import './login.scss'

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(3, "Must have 6 character.")
        .max(255, "Must be shorter than 255.")
        .required("Must enter name."),
    email: Yup.string()
        .email("Please valid email address.")
        .max(255, "Must be shorter than 255.")
        .required("Must enter an email."),
})
class loginUser extends Component {
    componentWillMount() {
        this.props.showHideLoding(false)
    }
    loginUser = (values) => {
        this.props.showHideLoding(true)
        login(values, "login").then(res => {
            console.log(res)
            this.props.saveLoginUserInfo(res.data.data);
            this.props.showHideLoding(false)
            if (res.data.statusCode === 200) {
                let data = {
                    token : res.headers.authorization
                  }
                 this.props.saveToken(data);
                setTimeout(() => {
                    let reduxData = JSON.parse(localStorage.getItem(`persist:${apiCommonParams.REDUX_STORE_KEY}`));
                    let authReducer = JSON.parse(reduxData.login);

                    // // headers['Authorization'] = `bearer ${res.data.access_token}`;

                    authReducer.access_token = res.headers.authorization
                    reduxData.login = JSON.stringify(authReducer);
                    // alert(JSON.stringify(authReducer))
                    localStorage.setItem(`persist:${apiCommonParams.REDUX_STORE_KEY}`, JSON.stringify(reduxData));
                    this.props.history.push('/company')
                }, 100);
            }
        }).catch(err => {
            toast.success("Enter email or password wrong")
            this.props.showHideLoding(false)
        })

    }
    render() {
        return (
            <div className="login-screen">
                <Alogo />

                <ToastContainer />
                <Formik
                    initialValues={{ password: "", email: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        this.loginUser(values);
                        resetForm(); 
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (

                        <div className="login-wrapper">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-8 login-content">
                                        <h5 className="text-uppercase">Welcome to</h5>
                                        <h1 className="atelier-logo">
                                            <img src={atelierlogo} alt="atelier-logo" />
                                        </h1>
                                        <h2>The future of manufacturing</h2>
                                    </div>

                                    <div className="col-xs-12 col-sm-12 col-md-4 form-login">
                                        <div className="formarea d-flex flex-column justify-content-between">
                                            <h3>Sign In</h3>
                                            <form onSubmit={handleSubmit}>
                                                <div className="field-groups">
                                                    <div className="login-fields">
                                                        <div className="input-field">
                                                            <input type="text" name="email" id="email" placeholder="Username"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.email}
                                                                className={touched.email && errors.email ? "form-control has-error" : "form-control"} />
                                                            <Error touched={touched.email} message={errors.email} />
                                                        </div>
                                                        <div className="input-field">
                                                            <input type="password" name="password" id="password" placeholder="Password"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.password}
                                                                className={touched.password && errors.password ? "form-control has-error" : "form-control"} />
                                                            <Error touched={touched.password} message={errors.password} />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="form-submit">
                                                    <input className="btn-module" type="submit" name="" value="Log In" />
                                                    <a className="link-forgotpw" href="forgotPassword">Forgot Password?</a>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </Formik></div>
        )
    }
}

// export default login;
const mapStateToProps = (state) => {
    return {
        loginUserInfo: state.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveLoginUserInfo: (data) => dispatch(saveLoginUserInfo(data)),
        showHideLoding: (data) => dispatch(showHideLoding(data)),
        saveToken: (data) => dispatch(saveToken(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(loginUser)