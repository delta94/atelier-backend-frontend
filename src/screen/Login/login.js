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
import { saveLoginUserInfo } from '../../Redux/Action/Login'
import { showHideLoding } from '../../Redux/Action/Loading'
//api 
import { login } from '../../ApiActions/Login'
import './login.scss'
import '../../style.css'
// import '../css/style-main.css'

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
                setTimeout(() => {
                    let reduxData = JSON.parse(localStorage.getItem(`persist:${apiCommonParams.REDUX_STORE_KEY}`));
                    let authReducer = JSON.parse(reduxData.login);

                    // // headers['Authorization'] = `bearer ${res.data.access_token}`;

                    authReducer.access_token = res.headers.authorization
                    reduxData.login = JSON.stringify(authReducer);
                    // alert(JSON.stringify(authReducer))
                    localStorage.setItem(`persist:${apiCommonParams.REDUX_STORE_KEY}`, JSON.stringify(reduxData));
                    this.props.history.push('/home')
                }, 100);
            }
        }).catch(err => {
            toast.success("Enter email or password wrong")
            this.props.showHideLoding(false)
        })

    }
    render() {
        return (
            <div>
                <ToastContainer />
                <Formik initialValues={{ password: "", email: "" }} validationSchema={validationSchema} onSubmit={(values, { resetForm }) => { this.loginUser(values); resetForm(); }}>
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (

                        <div className="welcome-screen d-flex align-items-center">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 form-login">
                                        <form onSubmit={handleSubmit}>
                                            <div className="field-groups d-flex align-items-center">
                                                <div className="login-fields">
                                                    <div className="input-group">
                                                        <input type="text" name="email" id="email" placeholder="Username"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.email}
                                                            className={touched.email && errors.email ? "form-control has-error" : "form-control"} />
                                                        <Error touched={touched.email} message={errors.email} />
                                                    </div>
                                                    <div className="input-group">
                                                        <input type="password" name="password" id="password" placeholder="Password"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.password}
                                                            className={touched.password && errors.password ? "form-control has-error" : "form-control"} />
                                                        <Error touched={touched.password} message={errors.password} />
                                                    </div>
                                                </div>
                                                <div className="logo">
                                                    <img className="fluid-image" src="images/Ateli-yay-logo.png" alt="Ateli-yay-logo" />
                                                </div>
                                            </div>
                                            {/* <div className="input-row">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
                            </div> */}
                                            <div className="form-submit d-flex align-items-center">
                                                <input className="btn-module" type="submit" name="" value="Log In" />
                                                <a className="link-forgotpw" href="forgotPassword">Forgot Your Password?</a>
                                            </div>
                                        </form>
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
        showHideLoding: (data) => dispatch(showHideLoding(data))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(loginUser)