import React, { Component } from 'react';


import Dropzone from 'react-dropzone'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// redux
import { connect } from 'react-redux';
// Dispatch 
import { saveLoginUserInfo } from '../../Redux/Action/Login'
import { showHideLoding } from '../../Redux/Action/Loading'
//api 
import { AddComplianceInfo } from '../../ApiActions/Product'
import { uoloadImage } from '../../ApiActions/ImageUpload';
import { updateProduct } from '../../ApiActions/Product';

class complianceInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: props.loginUserInfo ? props.loginUserInfo.access_token : "",
            editable: false,
            australia: "",
            uk: "",
            europe: "",
            usa: "",
            japan: "",
            btnShow: false,
        }
    }
    componentWillMount() {
        this.props.showHideLoding(false)
    }
    AddComplianceInfo = () => {
        let data = {
            productId: this.props.productDetail.productId,
            compliance: [{
                australia: this.state.australia,
                uk: this.state.uk,
                europe: this.state.europe,
                usa: this.state.usa,
                japan: this.state.japan,
            }]
        }
        alert(JSON.stringify(data))
        updateProduct(data, this.state.token).then(res => {
            this.setState({ productImage: res.data.url });
            this.props.showHideLoding(false)
        }).catch(err => {
            toast.success("error")
            this.props.showHideLoding(false)
        })
        // const data = new FormData();
        // data.append('australia', this.state.australia);
        // data.append('uk', this.state.uk);
        // data.append('europe', this.state.europe);
        // data.append('usa', this.state.usa);
        // data.append('japan', this.state.japan);
        // this.props.showHideLoding(true)
        // AddComplianceInfo(data, this.state.token).then(res => {
        //     // this.setState({ productImage: res.data.url });
        //     this.props.showHideLoding(false)
        // }).catch(err => {
        //     toast.success("error")
        //     this.props.showHideLoding(false)
        // })
    }
    onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            this.uploadImage(file, "australia")
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    onDropUk = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            this.uploadImage(file, "uk")
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    onDropEurope = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            this.uploadImage(file, "europe")
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    onDropUsa = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            this.uploadImage(file, "usa")
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    onDropJapan = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            this.uploadImage(file, "japan")
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    uploadImage(file, type) {
        const data = new FormData();
        data.append('image', file);
        this.props.showHideLoding(true)
        uoloadImage(data, this.state.token).then(res => {
            if (type == "australia") {
                this.setState({ australia: res.data.url, btnShow: true });
            } else if (type == "uk") {
                this.setState({ uk: res.data.url, btnShow: true });
            } else if (type == "europe") {
                this.setState({ europe: res.data.url, btnShow: true });
            } else if (type == "usa") {
                this.setState({ usa: res.data.url, btnShow: true });
            } else if (type == "japan") {
                this.setState({ japan: res.data.url, btnShow: true });
            }
            this.props.showHideLoding(false)
        }).catch(err => {
            toast.success("error")
            this.props.showHideLoding(false)
        })
    }
    render() {
        const { btnShow, editable, australia, uk, europe, usa, japan } = this.state;
        return (
            <div className="col-sm-12 col-md-5 col-lg-5 ml-15 last-col compliance-info">
                <div className="inner-border-wrap">
                    <ul>
                        <li>
                            <div className="compliance-country">
                                <label>Australia</label>
                                <div className="pdf-wrap">
                                    <img src="images/pdf-icon-admin.png" alt="pdf-icon" />
                                </div>

                                {editable ? <div className="drag-drop-update" style={{ display: "block" }}>
                                    {/* {editable ? <div className="product-hero-img upload-field" style={{ display: "block" }}> */}
                                    {/* <div className="Dropzone"> */}
                                    <label className="edit-mode input-file-trigger">
                                        <Dropzone onDrop={this.onDrop}>
                                            {({ getRootProps, getInputProps }) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    Drag & Drop<br />
                                                    or Click To Upload
                                                            <br /><span className="file-return">{australia}</span>
                                                </div>
                                            )}
                                        </Dropzone>
                                    </label>
                                    {/* </div> */}
                                    {/* <label className="edit-mode input-file-trigger">
                                        <input className="input-file" type="file" name="" />
                                        Drag &amp; Drop<br />
                                        Or<br />
                                        Click Here to Upload
													<span className="file-return"></span>
                                    </label> */}
                                </div> : null}
                            </div>
                        </li>

                        <li>
                            <div className="compliance-country">
                                <label>UK</label>
                                <div className="pdf-wrap">
                                    <img src="images/pdf-icon-admin.png" alt="pdf-icon" />
                                </div>

                                {editable ? <div className="drag-drop-update" style={{ display: "block" }}>
                                    <label className="edit-mode">
                                        <Dropzone onDrop={this.onDropUk}>
                                            {({ getRootProps, getInputProps }) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    Drag & Drop<br />
                                                    or Click To Upload
                                                            <br /><span className="file-return">{uk}</span>
                                                </div>
                                            )}
                                        </Dropzone>
                                        {/* <input type="file" name="" />
                                        Drag &amp; Drop<br />
                                        Or<br />
                                        Click Here to Upload
													<span className="file-return"></span> */}
                                    </label>
                                </div> : null}
                            </div>
                        </li>

                        <li>
                            <div className="compliance-country">
                                <label>EUROPE</label>
                                <div className="pdf-wrap">
                                    <img src="images/pdf-icon-admin.png" alt="pdf-icon" />
                                </div>

                                {editable ? <div className="drag-drop-update" style={{ display: "block" }}>
                                    <label className="edit-mode">
                                        <Dropzone onDrop={this.onDropEurope}>
                                            {({ getRootProps, getInputProps }) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    Drag & Drop<br />
                                                    or Click To Upload
                                                            <br /><span className="file-return">{europe}</span>
                                                </div>
                                            )}
                                        </Dropzone>
                                        {/* <input type="file" name="" />
                                        Drag &amp; Drop<br />
                                        Or<br />
                                        Click Here to Upload
													<span className="file-return"></span> */}
                                    </label>
                                </div> : null}
                            </div>
                        </li>

                        <li>
                            <div className="compliance-country">
                                <label>USA</label>
                                <div className="pdf-wrap">
                                    <img src="images/pdf-icon-admin.png" alt="pdf-icon" />
                                </div>

                                {editable ? <div className="drag-drop-update" style={{ display: "block" }}>
                                    <label className="edit-mode">
                                        <Dropzone onDrop={this.onDropUsa}>
                                            {({ getRootProps, getInputProps }) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    Drag & Drop<br />
                                                    or Click To Upload
                                                            <br /><span className="file-return">{usa}</span>
                                                </div>
                                            )}
                                        </Dropzone>
                                        {/* <input type="file" name="" />
                                        Drag &amp; Drop<br />
                                        Or<br />
                                        Click Here to Upload
													<span className="file-return"></span> */}
                                    </label>
                                </div> : null}
                            </div>
                        </li>

                        <li>
                            <div className="compliance-country">
                                <label>JAPAN</label>
                                <div className="pdf-wrap">
                                    <img src="images/pdf-icon-admin.png" alt="pdf-icon" />
                                </div>

                                {editable ? <div className="drag-drop-update" style={{ display: "block" }}>
                                    <label className="edit-mode">
                                        <Dropzone onDrop={this.onDropJapan}>
                                            {({ getRootProps, getInputProps }) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    Drag & Drop<br />
                                                    or Click To Upload
                                                            <br /><span className="file-return">{japan}</span>
                                                </div>
                                            )}
                                        </Dropzone>
                                        {/* <input type="file" name="" />
                                        Drag &amp; Drop<br />
                                        Or<br />
                                        Click Here to Upload
													<span className="file-return"></span> */}
                                    </label>
                                </div> : null}
                            </div>
                        </li>
                    </ul>

                    <div className="edit-btn">
                        <button onClick={() => this.setState({ editable: !this.state.editable })} type="button">
                            <img src="images/edit-icon-admin.svg" />
                        </button>
                    </div>

                    <div className="update-submit">
                        {btnShow ? <button type="submit" className="btn-module" onClick={this.AddComplianceInfo}>Done</button> : null}
                    </div>
                </div>
            </div>
        )
    }
}
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
export default connect(mapStateToProps, mapDispatchToProps)(complianceInfo)