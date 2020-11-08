import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Error from '../../utils/Error';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// redux
import { connect } from 'react-redux';
// Dispatch 
import { saveLoginUserInfo } from '../../Redux/Action/Login'
import { showHideLoding } from '../../Redux/Action/Loading'
//api 
import { updateManufacturer } from '../../ApiActions/Product';

const validationSchema = Yup.object().shape({
    pName: Yup.string()
        .required("Must enter name."),
    pContactName: Yup.string()
        .required("Must enter contact name."),
    pAddress: Yup.string()
        .required("Must enter contact address."),
    pEmail: Yup.string()
        .required("Must enter email"),
    pChatId: Yup.string()
        .required("Must enter ChatId."),
    sName: Yup.string()
        .required("Must enter name."),
    sContactName: Yup.string()
        .required("Must enter contact name."),
    sAddress: Yup.string()
        .required("Must enter contact address."),
    sEmail: Yup.string()
        .required("Must enter email."),
    sWeChatId: Yup.string()
        .required("Must enter weChatId."),
    fName: Yup.string()
        .required("Must enter name."),
    fContactName: Yup.string()
        .required("Must enter contact name"),
    fAddress: Yup.string()
        .required("Must enter contact address"),
    country: Yup.string()
        .required("Must select country"),
    fVersion: Yup.string()
        .required("Must enter version"),
    fEmail: Yup.string()
        .required("Must enter email"),
    fWeChatId: Yup.string()
        .required("Must enter WeChatId."),

})
class manufacturerDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: props.token ? props.token.token : "",
            editable: false,
            productDetail: this.props.productDetail
        }
    }
    componentWillMount() {
        this.props.showHideLoding(false)
    }
    updateProductInfo = (values) => {
        this.props.showHideLoding(true)
        let data = {
            primary: {
                name: values.pName,
                contactName: values.pContactName,
                address: values.pAddress,
                phone: values.pPhone,
                contactEmail: values.pEmail,
                weChatId: values.pChatId,
                manufacturerId: this.props.productDetail.primaryManufacturerData ? this.props.productDetail.primaryManufacturerData.manufacturerId : ""
            },
            secondary: {
                name: values.sName,
                contactName: values.sContactName,
                address: values.sAddress,
                contactEmail: values.sEmail,
                phone: values.sPhone,
                weChatId: values.sWeChatId,
                manufacturerId: this.props.productDetail.secondaryManufacturerData ? this.props.productDetail.secondaryManufacturerData.manufacturerId : ""
            },
            formulation: {
                name: values.fName,
                contactName: values.fContactName,
                address: values.fAddress,
                contactEmail: values.fEmail,
                phone: values.fPhone,
                weChatId: values.fWeChatId,
                country: values.country,
                finalVersion: values.fVersion,
                manufacturerId: this.props.productDetail.formulationManufacturerData ? this.props.productDetail.formulationManufacturerData.manufacturerId : ""
            }
        }
        console.log(JSON.stringify(data))
        updateManufacturer(data, this.state.token).then(res => {
            console.log("productDetail :" + JSON.stringify(res.data))
            let data = {
                primaryManufacturerData: res.data.primary,
                secondaryManufacturerData: res.data.secondary,
                formulationManufacturerData: res.data.formulation
            }
            this.setState({ productDetail: data, editable: false });
            toast.success("Manufacturer update successfully.");
            this.props.showHideLoding(false)
        }).catch(err => {
            // toast.success("error")
            if (err.response.data.statusCode === 400) {
                toast.error(err.response.data.data);
              }
            this.props.showHideLoding(false)
        })
    }
    change = (event) => {
        // alert(event.target.value)
    }
    render() {
        // alert(this.props.productDetail.productId)
        const { editable, productDetail } = this.state;
        // const { productDetail } = this.props;
        return (
            <React.Fragment>
        <ToastContainer />
            <Formik initialValues={{ pName: productDetail.primaryManufacturerData ? productDetail.primaryManufacturerData.name : "", pContactName: productDetail.primaryManufacturerData ? productDetail.primaryManufacturerData.contactName : "", pAddress: productDetail.primaryManufacturerData ? productDetail.primaryManufacturerData.address : "", pEmail: productDetail.primaryManufacturerData ? productDetail.primaryManufacturerData.contactEmail : "", pPhone: productDetail.primaryManufacturerData ? productDetail.primaryManufacturerData.phone : "", pChatId: productDetail.primaryManufacturerData ? productDetail.primaryManufacturerData.weChatId : "", sName: productDetail.secondaryManufacturerData ? productDetail.secondaryManufacturerData.name : "", sContactName: productDetail.secondaryManufacturerData ? productDetail.secondaryManufacturerData.contactName : "", sAddress: productDetail.secondaryManufacturerData ? productDetail.secondaryManufacturerData.address : "", sEmail: productDetail.secondaryManufacturerData ? productDetail.secondaryManufacturerData.contactEmail : "", sPhone: productDetail.secondaryManufacturerData ? productDetail.secondaryManufacturerData.phone : "", sWeChatId: productDetail.secondaryManufacturerData ? productDetail.secondaryManufacturerData.weChatId : "", fName: productDetail.formulationManufacturerData ? productDetail.formulationManufacturerData.name : "", fContactName: productDetail.formulationManufacturerData ? productDetail.formulationManufacturerData.contactName : "", fAddress: productDetail.formulationManufacturerData ? productDetail.formulationManufacturerData.address : "", country: productDetail.formulationManufacturerData ? productDetail.formulationManufacturerData.country : "", fVersion: productDetail.formulationManufacturerData ? productDetail.formulationManufacturerData.finalVersion : "", fEmail: productDetail.formulationManufacturerData ? productDetail.formulationManufacturerData.contactEmail : "", fPhone: productDetail.formulationManufacturerData ? productDetail.formulationManufacturerData.phone : "", fWeChatId: productDetail.formulationManufacturerData ? productDetail.formulationManufacturerData.weChatId : "" }} validationSchema={validationSchema} onSubmit={(values, { resetForm }) => { this.updateProductInfo(values); resetForm(); }}>
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <div className="col-sm-12 col-md-5 col-lg-5 product-detail-admin ml-15">
                        <form onSubmit={handleSubmit}>
                            <div className="product-details-view customer-manf-detail d-flex flex-column">
                                {/* <!-- packaging item 1 --> */}
                                <div className="package-item primary-packaging">
                                    <div className="package-name">
                                        <p>Primary <br />Packaging</p>
                                        <div className={editable?"package-detail-text edit-mode":"package-detail-text"}>
                                            {editable ? <div className="col-md-6">
                                                <p>Manufacturer Name</p>
                                                <input type="text" name="pName"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.pName}
                                                    className={touched.pName && errors.pName ? "has-error" : ""} />
                                                <Error touched={touched.pName} message={errors.pName} />
                                                <p>Manufacturer Address</p>
                                                <textarea rows="4" cols="20" type="text" name="" name="pAddress"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.pAddress}
                                                    className={touched.pAddress && errors.pAddress ? "has-error" : ""} />
                                                <Error touched={touched.pAddress} message={errors.pAddress} />
                                            </div> :
                                                <div className="detail-col">
                                                    <p>{productDetail.primaryManufacturerData.name} </p>
                                                    <p>{productDetail.primaryManufacturerData.address}</p>
                                                </div>}
                                            {editable ? <div className="col-md-6">
                                                <p>Contact Name</p>
                                                <input type="text" name="pContactName"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.pContactName}
                                                    className={touched.pContactName && errors.pContactName ? "has-error" : ""} />
                                                <Error touched={touched.pContactName} message={errors.pContactName} />
                                                <p>Contact Email</p>
                                                <input type="email" name="pEmail"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.pEmail}
                                                    className={touched.pEmail && errors.pEmail ? "has-error" : ""} />
                                                <Error touched={touched.pEmail} message={errors.pEmail} />
                                                <p>WeChat-ID</p>
                                                <input type="text" name="pChatId"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.pChatId}
                                                    className={touched.pChatId && errors.pChatId ? "has-error" : ""} />
                                                <Error touched={touched.pChatId} message={errors.pChatId} />
                                            </div> :
                                                <div className="detail-col">
                                                    <p>Contact</p>
                                                    <p>{productDetail.primaryManufacturerData.contactName}</p>
                                                    <p>{productDetail.primaryManufacturerData.contactEmail}</p>
                                                    <p>We-ID: {productDetail.primaryManufacturerData.weChatId}</p>
                                                </div>}
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- packaging item 2 --> */}
                                <div className="package-item secondary-packaging">
                                    <div className="package-name">
                                        <p>Secondary <br />Packaging</p>
                                        {productDetail.secondaryManufacturerData ? <div className={editable?"package-detail-text edit-mode":"package-detail-text"}>
                                            {editable ? <div className="col-md-6">
                                                <p>Manufacturer Name</p>
                                                <input type="text" name="sName"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.sName}
                                                    className={touched.sName && errors.sName ? "has-error" : ""} />
                                                <Error touched={touched.sName} message={errors.sName} />
                                                <p>Manufacturer Address</p>
                                                <textarea rows="4" cols="20" type="text" name="" name="sAddress"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.sAddress}
                                                    className={touched.sAddress && errors.sAddress ? "has-error" : ""} />
                                                <Error touched={touched.sAddress} message={errors.sAddress} />
                                            </div> :
                                                <div className="detail-col">
                                                    <p>{productDetail.secondaryManufacturerData.name}</p>
                                                    <p>{productDetail.secondaryManufacturerData.address}</p>
                                                </div>}
                                            {editable ? <div className="col-md-6">
                                                <p>Contact Name</p>
                                                <input type="text" name="sContactName"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.sContactName}
                                                    className={touched.sContactName && errors.sContactName ? "has-error" : ""} />
                                                <Error touched={touched.sContactName} message={errors.sContactName} />
                                                <p>Contact Email</p>
                                                <input type="email" name="sEmail"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.sEmail}
                                                    className={touched.sEmail && errors.sEmail ? "has-error" : ""} />
                                                <Error touched={touched.sEmail} message={errors.sEmail} />
                                                <p>WeChat-ID</p>
                                                <input type="text" name="sWeChatId"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.sWeChatId}
                                                    className={touched.sWeChatId && errors.sWeChatId ? "has-error" : ""} />
                                                <Error touched={touched.sWeChatId} message={errors.sWeChatId} />
                                            </div> :
                                                <div className="detail-col">
                                                    <p>Contact</p>
                                                    <p>{productDetail.secondaryManufacturerData.contactName}</p>
                                                    <p>{productDetail.secondaryManufacturerData.contactEmail}</p>
                                                    <p>We-ID: {productDetail.secondaryManufacturerData.weChatId}</p>
                                                </div>}
                                        </div> :
                                            <div className="package-detail-text">
                                                <div className="detail-col">
                                                    <p>No Secondary <br />Packaging</p>
                                                </div>
                                            </div>}
                                    </div>
                                </div>

                                {/* <!-- packaging item 3 --> */}
                                <div className="package-item formulation">
                                    <div className="package-name">
                                        {/* <p>Formulation <span>Final Version</span></p> */}
                                        <p>Formulation</p>
                                        <div className={editable?"package-detail-text edit-mode":"package-detail-text"}>
                                            {editable ? <div className="col-md-6">
                                                <p>Manufacturer Name</p>
                                                <input type="text" name="fName"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.fName}
                                                    className={touched.fName && errors.fName ? "has-error" : ""} />
                                                <Error touched={touched.fName} message={errors.fName} />
                                                <p>Manufacturer Address</p>
                                                <textarea rows="4" cols="20" type="text" name="fAddress"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.fAddress}
                                                    className={touched.fAddress && errors.fAddress ? "has-error" : ""} />
                                                <Error touched={touched.fAddress} message={errors.fAddress} />
                                                <p>Select Country</p>
                                                <select onChange={this.change} name="country"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.country}
                                                    className={touched.country && errors.country ? "has-error" : ""}>
                                                    <option>Seclect</option>
                                                    <option>Australia</option>
                                                    <option>United States</option>
                                                    {/* <option>Australia</option> */}
                                                </select>
                                                <Error touched={touched.country} message={errors.country} />
                                                <p>Final Version</p>
                                                <input type="text" name="fVersion"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.fVersion}
                                                    className={touched.fVersion && errors.fVersion ? "has-error" : ""} />
                                                <Error touched={touched.fVersion} message={errors.fVersion} />
                                            </div> :
                                                <div className="detail-col">
                                                    <p>{productDetail.formulationManufacturerData.name}</p>
                                                    <p>{productDetail.formulationManufacturerData.address}</p>
                                                    <p>{productDetail.formulationManufacturerData.country}</p>
                                                    <p>{productDetail.formulationManufacturerData.finalVersion}</p>
                                                </div>}
                                            {editable ? <div className="col-md-6">
                                                <p>Contact Name</p>
                                                <input type="text" name="fContactName"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.fContactName}
                                                    className={touched.fContactName && errors.fContactName ? "has-error" : ""} />
                                                <Error touched={touched.fContactName} message={errors.fContactName} />
                                                <p>Contact Email</p>
                                                <input type="email" name="fEmail"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.fEmail}
                                                    className={touched.fEmail && errors.fEmail ? "has-error" : ""} />
                                                <Error touched={touched.fEmail} message={errors.fEmail} />
                                                <p>WeChat-ID</p>
                                                <input type="text" name="fWeChatId"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.fWeChatId}
                                                    className={touched.fWeChatId && errors.fWeChatId ? "has-error" : ""} />
                                                <Error touched={touched.fWeChatId} message={errors.fWeChatId} />
                                            </div> :
                                                <div className="detail-col">
                                                    <p>Contact</p>
                                                    <p>{productDetail.formulationManufacturerData.contactName}</p>
                                                    <p>{productDetail.formulationManufacturerData.contactEmail}</p>
                                                    <p>{productDetail.formulationManufacturerData.phone}</p>
                                                </div>}
                                            {/* <div className="detail-col">
                                            <p>TBC 005_03</p>
                                        </div> */}
                                        </div>
                                    </div>
                                </div>

                                <div className="update-submit">
                                    {editable ? <button type="submit" className="btn-module">Done</button> : null}
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
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loginUserInfo: state.login,
        token: state.login.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveLoginUserInfo: (data) => dispatch(saveLoginUserInfo(data)),
        showHideLoding: (data) => dispatch(showHideLoding(data))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(manufacturerDetail)