import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Formik } from 'formik';
import * as Yup from 'yup';
import Error from '../../utils/Error'
// redux
import { connect } from 'react-redux';
// Dispatch 
import { saveLoginUserInfo, showHideLoding } from '../../Redux/Action/Login'
//api 
import { resetPassword } from '../../ApiActions/ForgotPassword';
// import './login.scss'
// import '../../style.css'

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(3, "Must have 3 character.")
        .max(255, "Must be shorter than 255.")
        .required("Must enter password."),
    c_password: Yup.string()
        .min(3, "Must have 3 character.")
        .max(255, "Must be shorter than 255.")
        .required("Must enter password.")
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    code: Yup.string()
        .min(3, "Must have 3 character.")
        .max(255, "Must be shorter than 255.")
        .required("Must enter password."),
})
class resetPasswordComp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: false,
        }
    }
    componentWillMount() {
        let path = window.location.pathname
        let email = path.split('/');
        console.log(email)
        this.setState({ email: email[2] })
        // this.props.showHideLoding(false)
    }
    resetUserPassword = (values) => {
        let data = {
            password: values.password,
            code: values.code,
            email: this.state.email
        }
        this.props.showHideLoding(true)
        resetPassword(data).then(res => {
            this.props.showHideLoding(false)
            setTimeout(() => { this.props.history.push('/login') }, 1000);
        }).catch(err => {
            this.props.showHideLoding(false)
        })

    }
    render() {
        return (
            <div>
                <ToastContainer />
                <Formik initialValues={{ password: "", c_password: "", code: "" }} validationSchema={validationSchema} onSubmit={(values, { resetForm }) => { this.resetUserPassword(values); resetForm(); }}>
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (

                        <div className="welcome-screen d-flex align-items-center">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 form-login">
                                        <form onSubmit={handleSubmit}>
                                            <div className="field-groups d-flex align-items-center">
                                                <div className="login-fields">
                                                    <div className="input-group">
                                                        <input type="password" name="password" id="password" placeholder="Password"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.password}
                                                            className={touched.password && errors.password ? "form-control has-error" : "form-control"} />
                                                        <Error touched={touched.password} message={errors.password} />
                                                    </div>
                                                    <div className="input-group pb-4">
                                                        <input type="password" name="c_password" id="c_password" placeholder="Confirm Password"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.c_password}
                                                            className={touched.c_password && errors.c_password ? "form-control has-error" : "form-control"} />
                                                        <Error touched={touched.c_password} message={errors.c_password} />
                                                    </div>
                                                    <div className="input-group">
                                                        <input type="text" name="code" id="code" placeholder="Code"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.code}
                                                            className={touched.code && errors.code ? "form-control has-error" : "form-control"} />
                                                        <Error touched={touched.code} message={errors.code} />
                                                    </div>
                                                </div>
                                                <div className="logo">
                                                    <img className="fluid-image" src="../../images/Ateli-yay-logo.png" alt="Ateli-yay-logo" />
                                                </div>
                                            </div>
                                            <div className="form-submit d-flex align-items-center">
                                                <input className="btn-module" type="submit" name="" value="Save" />
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
export default connect(mapStateToProps, mapDispatchToProps)(resetPasswordComp)