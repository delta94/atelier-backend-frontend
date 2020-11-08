import React, { Component } from 'react';

import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./addproduct.scss";

import Dropzone from 'react-dropzone'
import Error from '../../utils/Error'

import { Formik } from 'formik';
import * as Yup from 'yup';
// redux
import { connect } from 'react-redux';
// Dispatch 
import { saveLoginUserInfo } from '../../Redux/Action/Login'
import { showHideLoding } from '../../Redux/Action/Loading'
import ProductDetails from './productDetails';
//api 
import { uoloadImage } from '../../ApiActions/ImageUpload';
import { AddProduct, GetManufacturer } from '../../ApiActions/Product';
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const validationSchema = Yup.object().shape({
    name: Yup.string()
        // .min(3, "Must have 6 character.")
        // .max(255, "Must be shorter than 255.")
        .required("Must enter product name."),
    volume: Yup.string()
        // .email("Please valid email address.")
        // .max(255, "Must be shorter than 255.")
        .required("Must enter volume."),
    bottleName: Yup.string()
        .required("Must enter bottle name."),
    closureName: Yup.string()
        .required("Must enter closure name."),
    productionTime: Yup.string()
        .required("Must enter production time."),
    bottleSize: Yup.string()
        .required("Must enter bottle size."),
    closureColor: Yup.string()
        .required("Must enter closure color."),
    bottleColor: Yup.string()
        .required("Must enter bottle color."),
    neckSize: Yup.string()
        .required("Must enter neck size."),
    boxType: Yup.string()
        .required("Must enter box type."),
    shippingType: Yup.string()
        .required("Must enter shipping type"),
    secondProductionTime: Yup.string()
        .required("Must enter Production time"),
    boxMaterial: Yup.string()
        .required("Must enter box material"),
    shippingMaterial: Yup.string()
        .required("Must enter shipping material"),
    boxSize: Yup.string()
        .required("Must enter box size"),
    shippingSize: Yup.string()
        .required("Must enter shipping size"),
    ingredientsList: Yup.string()
        .required("Must enter ingredients list"),
    fProductionTime: Yup.string()
        .required("Must enter production time"),
    pName: Yup.string()
        .required("Must enter name."),
    pContactName: Yup.string()
        .required("Must enter contact name."),
    pAddress: Yup.string()
        .required("Must enter contact address."),
    pEmail: Yup.string()
        .required("Must enter email"),
    pPhone: Yup.string()
        .required("Must enter phone"),
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
    sPhone: Yup.string()
        .required("Must enter phone"),
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
    fPhone: Yup.string()
        .required("Must enter phone"),
    fWeChatId: Yup.string()
        .required("Must enter WeChatId."),
    perUnit: Yup.string()
        .required("Must enter perUnit."),

})
class product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // showAddProduct: false,
            token: props.token ? props.token.token : "",
            primarySelectedOption: null,
            secondSelectedOption: null,
            manufacturerSelectedOption: null,
            productImage: "",
            primaryArtwork: "",
            unitCartonImage: "",
            shippingCartonImage: "",
            manufacturerData: [],
            primaryOptions: [],
            secondOptions: [],
            formulationOptions: [],
            name: "",
            volume: "", bottleName: "", closureName: "", productionTime: "", bottleSize: "", closureColor: "", bottleColor: "", neckSize: "", boxType: "", shippingType: "", secondProductionTime: "", boxMaterial: "", shippingMaterial: "", boxSize: "", shippingSize: "", ingredientsList: "", fProductionTime: "",
            pName: "",
            pContactName: "",
            pAddress: "",
            pEmail: "",
            pPhone: "",
            pChatId: "",
            sName: "",
            sContactName: "",
            sAddress: "",
            sEmail: "",
            sPhone: "",
            sWeChatId: "",
            fName: "",
            fContactName: "",
            fAddress: "",
            country: "",
            fVersion: "",
            fEmail: "",
            fPhone: "",
            fWeChatId: "",
            perUnit: '',
            errorPrimaryPackaging: false,
            checkPrimary: false,
            checkSecondary: false,
            checkFormulation: false
        }
    }
    componentWillMount() {
        this.props.showHideLoding(false);
        this.GeManufacturerList();
    }
    GeManufacturerList = () => {
        this.props.showHideLoding(true)
        GetManufacturer(this.state.token).then(response => {
            console.log(JSON.stringify(response.data.data.manufacturerList))
            let data = response.data.data.manufacturerList;
            // let primaryData = [];
            let primaryOptions = [];
            let secondOptions = [];;
            let formulationOptions = []
            for (var i = 0; i < data.length; i++) {
                console.log("data[i] :" + JSON.stringify(data[i]))
                if (data[i].type == "primary") {
                    // primaryData.push(data[i]);
                    primaryOptions.push(
                        { value: data[i].name, label: data[i].name, id: data[i].manufacturerId })
                } else if (data[i].type == "secondary") {
                    // primaryData.push(data[i]);
                    secondOptions.push(
                        { value: data[i].name, label: data[i].name, id: data[i].manufacturerId })
                } else if (data[i].type == "formulation") {
                    // primaryData.push(data[i]);
                    formulationOptions.push(
                        { value: data[i].name, label: data[i].name, id: data[i].manufacturerId })
                }
            }

            // alert(JSON.stringify(primaryOptions))
            this.setState({ manufacturerData: data, primaryOptions: primaryOptions, secondOptions: secondOptions, formulationOptions: formulationOptions })
            this.props.showHideLoding(false)
            // this.setState({ productionList: response.data.data.productionList })
        }).catch(err => {
            this.props.showHideLoding(false)
            //  this.props.showHideLoader(false)
        })
    };
    addProduct = (values) => {
        let productData = {
            userId: this.props.userId,
            name: values.name,
            volume: parseInt(values.volume),
            heroImage: this.state.productImage,
            primaryPackaging: {
                bottleName: values.bottleName,
                bottleSize: values.bottleSize,
                bottleColor: values.bottleColor,
                closureName: values.closureName,
                closureColor: values.closureColor,
                closureNeckSize: values.neckSize,
                productionTime: parseInt(values.productionTime),
                artworkImage: this.state.primaryArtwork
            },
            secondaryPackaging: {
                boxType: values.boxType,
                shippingType: values.shippingType,
                productionTime: parseInt(values.secondProductionTime),
                boxMaterial: values.boxMaterial,
                shippingMaterial: values.shippingMaterial,
                boxSize: values.boxSize,
                shippingSize: parseInt(values.shippingSize),
                cartonArtworkImage: this.state.unitCartonImage,
                cartonShippingImage: this.state.shippingCartonImage
            },
            formulationPackaging: {
                ingredientsList: values.ingredientsList,
                productionTime: parseInt(values.fProductionTime),
            },
            primary: {
                name: values.pName,
                contactName: values.pContactName,
                address: values.pAddress,
                contactEmail: values.pEmail,
                phone: values.pPhone,
                weChatId: values.pChatId

            },
            secondary: {
                name: values.sName,
                contactName: values.sContactName,
                address: values.sAddress,
                contactEmail: values.sEmail,
                phone: values.sPhone,
                weChatId: values.sWeChatId
            },
            formulation: {
                name: values.fName,
                contactName: values.fContactName,
                address: values.fAddress,
                contactEmail: values.fEmail,
                phone: values.fPhone,
                weChatId: values.fWeChatId,
                country: values.country,
                finalVersion: values.fVersion

            },
            carbonOffset: parseFloat(values.perUnit),
            // primaryManufacturerId: "",
            // secondaryManufacturerId: "",
            // formulationManufacturerId: ""
        }
        console.log("aad  data :" + JSON.stringify(productData))
        this.props.showHideLoding(true)
        AddProduct(productData, this.state.token).then(res => {
            console.log("res :", JSON.stringify(res))
            toast.success("Product add successfully.")
            this.props.showHideLoding(false)
            window.location.reload();
        }).catch(err => {
            if(err.response.data.statusCode === 400){
                // toast.success("Duplicate product not save")
                toast.error(err.response.data.data)
            }
            // toast.success("error")
            this.props.showHideLoding(false)
        })
        // alert(JSON.stringify(values))
    }
    handleChange = primarySelectedOption => {
        let slectManufacturer = this.state.manufacturerData.find(obj => obj.manufacturerId === primarySelectedOption.id);

        // alert(JSON.stringify(slectManufacturer))
        this.setState({
            primarySelectedOption,
            pName: slectManufacturer ? slectManufacturer.name : "",
            pContactName: slectManufacturer ? slectManufacturer.contactName : "",
            pAddress: slectManufacturer ? slectManufacturer.address : "",
            pEmail: slectManufacturer ? slectManufacturer.contactEmail : "",
            pPhone: slectManufacturer ? slectManufacturer.phone : "",
            pChatId: slectManufacturer ? slectManufacturer.weChatId : "",
            checkPrimary: false
        })
        // console.log(`Option selected:`, primarySelectedOption);
    }
    handleChangeSecond = secondSelectedOption => {
        // this.setState({ secondSelectedOption });
        // alert(JSON.stringify(secondSelectedOption))
        console.log(`Option selected:`, secondSelectedOption);
        let slectManufacturer = this.state.manufacturerData.find(obj => obj.manufacturerId === secondSelectedOption.id);
        this.setState({
            secondSelectedOption,
            sName: slectManufacturer ? slectManufacturer.name : "",
            sContactName: slectManufacturer ? slectManufacturer.contactName : "",
            sAddress: slectManufacturer ? slectManufacturer.address : "",
            sEmail: slectManufacturer ? slectManufacturer.contactEmail : "",
            sPhone: slectManufacturer ? slectManufacturer.phone : "",
            sWeChatId: slectManufacturer ? slectManufacturer.weChatId : "",
            checkSecondary: false
        })
    }
    handleChangeManufacturer = manufacturerSelectedOption => {
        // this.setState({ manufacturerSelectedOption });
        // alert(JSON.stringify(manufacturerSelectedOption))
        console.log(`Option selected:`, manufacturerSelectedOption);
        let slectManufacturer = this.state.manufacturerData.find(obj => obj.manufacturerId === manufacturerSelectedOption.id);
        this.setState({
            manufacturerSelectedOption,
            fName: slectManufacturer ? slectManufacturer.name : "",
            fContactName: slectManufacturer ? slectManufacturer.contactName : "",
            fAddress: slectManufacturer ? slectManufacturer.address : "",
            country: slectManufacturer ? slectManufacturer.country : "",
            fVersion: slectManufacturer ? slectManufacturer.finalVersion : "",
            fEmail: slectManufacturer ? slectManufacturer.contactEmail : "",
            fPhone: slectManufacturer ? slectManufacturer.phone : "",
            fWeChatId: slectManufacturer ? slectManufacturer.weChatId : "",
            checkFormulation: false
        })
    }
    onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            this.uploadImage(file, "product")
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    onDropPrimary = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            this.uploadImage(file, "primary")
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    onDropUnitCarton = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            this.uploadImage(file, "unitCarton")
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    onDropShippingCarton = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            this.uploadImage(file, "shippingCarton")
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    uploadImage(file, type) {
        const data = new FormData();
        data.append('image', file);
        // this.props.showHideLoding(true)
        uoloadImage(data, this.state.token).then(res => {
            if (type == "product") {
                this.setState({ productImage: res.data.url });
            } else if (type == "primary") {
                this.setState({ primaryArtwork: res.data.url });
            } else if (type == "unitCarton") {
                this.setState({ unitCartonImage: res.data.url });
            } else if (type === "shippingCarton") {
                this.setState({ shippingCartonImage: res.data.url });
            }
            // this.props.showHideLoding(false)
        }).catch(err => {
            toast.success("error")
            // this.props.showHideLoding(false)
        })
    }
    change = (event) => {
        // alert(event.target.value)
    }
    handleBlur1 = (event) => {
        let findName = this.state.primaryOptions.find((obj) => obj.label == event);
        if(!this.state.checkPrimary && findName){
            this.setState({checkPrimary: true})
            return
        }
        let findSecondry = this.state.secondOptions.find((obj) => obj.label == event);
        if(!this.state.checkSecondary && findSecondry){
            this.setState({checkSecondary: true})
            return
        }
        let findFormulation = this.state.formulationOptions.find((obj) => obj.label == event);
        if(!this.state.checkFormulation && findFormulation){
            this.setState({checkFormulation: true})
            return
        }
      };
    render() {
        const { showAddProduct, primarySelectedOption, secondSelectedOption, manufacturerSelectedOption, productImage, primaryArtwork, unitCartonImage, shippingCartonImage, primaryOptions, secondOptions, formulationOptions, pName, pContactName, pAddress, pEmail, pPhone, pChatId, sName, sContactName, sAddress, sEmail, sPhone, sWeChatId, fName, fContactName, fAddress, country, fVersion, fEmail, fPhone, fWeChatId, name, volume, bottleName, closureName, productionTime, bottleSize, closureColor, bottleColor, neckSize, boxType, shippingType, secondProductionTime, boxMaterial, shippingMaterial, boxSize, shippingSize, ingredientsList, fProductionTime, perUnit, checkPrimary, checkSecondary, checkFormulation} = this.state;

        return ( 
            <React.Fragment>
            <ToastContainer />
            <Formik enableReinitialize={true} initialValues={{ name: name, volume: volume, bottleName: bottleName, closureName: closureName, productionTime: productionTime, bottleSize: bottleSize, closureColor: closureColor, bottleColor: bottleColor, neckSize: neckSize, boxType: boxType, shippingType: shippingType, secondProductionTime: secondProductionTime, boxMaterial: boxMaterial, shippingMaterial: shippingMaterial, boxSize: boxSize, shippingSize: shippingSize, ingredientsList: ingredientsList, fProductionTime: fProductionTime, pName: pName, pContactName: pContactName, pAddress: pAddress, pEmail: pEmail, pPhone: pPhone, pChatId: pChatId, sName: sName, sContactName: sContactName, sAddress: sAddress, sEmail: sEmail, sPhone: sPhone, sWeChatId: sWeChatId, fName: fName, fContactName: fContactName, fAddress: fAddress, country: country, fVersion: fVersion, fEmail: fEmail, fPhone: fPhone, fWeChatId: fWeChatId, perUnit: perUnit }} validationSchema={validationSchema} onSubmit={(values, { resetForm }) => { this.addProduct(values); resetForm(); }}>
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <div className="col-sm-12 col-md-5 col-lg-5 product-detail-admin ml-15">
                        <div className="product-details-view d-flex flex-column">
                            <h4>New Product Form</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="add-new-product">
                                    <div className="detail-info">
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 product-detail">
                                                <div className="field-group">
                                                    <label>Product Details</label>
                                                    <input type="text" name="name" id="name" placeholder="Insert Product Name" 
                                                        onChange={e => this.setState({name: e.target.value})}
                                                        onBlur={handleBlur}
                                                        value={values.name}
                                                        className={touched.name && errors.name ? "form-control has-error" : "form-control"} />
                                                    <Error touched={touched.name} message={errors.name} />
                                                </div>
                                                <div className="field-group">
                                                    <input type="number" name="volume" placeholder="Product Volume" 
                                                        onChange={e => this.setState({volume: e.target.value})}
                                                        onBlur={handleBlur}
                                                        value={values.volume}
                                                        className={touched.volume && errors.volume ? "form-control has-error" : "form-control"} />
                                                    <Error touched={touched.volume} message={errors.volume} />
                                                </div>

                                                <div className="field-group">
                                                    <select className="form-control">
                                                        <option>Place of Manufacture</option>
                                                        <option>List of all Countries</option>
                                                        <option>Australia</option>
                                                        <option>USA</option>
                                                        <option>India</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 product-img"></div>
                                        </div>
                                    </div>

                                    <div className="prod-detail detail-block">
                                        <p>1. </p>
                                        <div className="field-grups">
                                            <div className="input-groups">
                                                <div className="col-md-6">
                                                    
                                                    
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Product Volume</label>
                                                    
                                                </div>
                                            </div>

                                            <div className="product-hero-img upload-field">
                                                <p>Product Hero Image</p>
                                                <div className="Dropzone">
                                                    <labe>
                                                        <Dropzone onDrop={this.onDrop}>
                                                            {({ getRootProps, getInputProps }) => (
                                                                <div {...getRootProps()}>
                                                                    <input {...getInputProps()} />
                                                                    Drag & Drop<br />
                                                                    or Click To Upload
                                                            <br /><span className="file-return">{productImage}</span>
                                                                </div>
                                                            )}
                                                        </Dropzone>
                                                    </labe>
                                                </div>
                                                {/* <label>
                                                    
                                                    <input type="file" name="" />
                                                    Drag & Drop<br />
                                                    or Click To Upload
                                                </label> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="prod-detail detail-block">
                                        <p>2. Component Details: <span>Primary Packaging</span></p>
                                        <div className="field-grups">
                                            <div className="input-groups">
                                                <div className="col-md-6">
                                                    <label>Primary Packaging: Bottle Name</label>
                                                    <input type="text" name="bottleName"
                                                        onChange={e => this.setState({bottleName: e.target.value})}
                                                        onBlur={handleBlur}
                                                        value={values.bottleName}
                                                        className={touched.bottleName && errors.bottleName ? "has-error" : ""} />
                                                    <Error touched={touched.bottleName} message={errors.bottleName} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Primary Packaging: Closure Name</label>
                                                    <input type="text" name="closureName"
                                                        onChange={e => this.setState({closureName: e.target.value})}
                                                        onBlur={handleBlur}
                                                        value={values.closureName}
                                                        className={touched.closureName && errors.closureName ? "has-error" : ""} />
                                                    <Error touched={touched.closureName} message={errors.closureName} />
                                                </div>
                                                <div className="col-md-6 production-time">
                                                    <label>Production Time</label>
                                                    <input type="number" name="productionTime"
                                                        onChange={e => this.setState({productionTime: e.target.value})}
                                                        onBlur={handleBlur}
                                                        value={values.productionTime}
                                                        className={touched.productionTime && errors.productionTime ? "has-error" : ""} />
                                                    <Error touched={touched.productionTime} message={errors.productionTime} />
                                                    Days
												</div>
                                            </div>

                                            <div className="input-groups">
                                                <div className="col-md-6">
                                                    <label>Primary Packaging: Bottle Size</label>
                                                    <input type="text" name="bottleSize"
                                                        onChange={e => this.setState({bottleSize: e.target.value})}
                                                        onBlur={handleBlur}
                                                        value={values.bottleSize}
                                                        className={touched.bottleSize && errors.bottleSize ? "has-error" : ""} />
                                                    <Error touched={touched.bottleSize} message={errors.bottleSize} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Primary Packaging: Closure Colour</label>
                                                    <input type="text" name="closureColor"
                                                        onChange={e => this.setState({closureColor: e.target.value})}
                                                        onBlur={handleBlur}
                                                        value={values.closureColor}
                                                        className={touched.closureColor && errors.closureColor ? "has-error" : ""} />
                                                    <Error touched={touched.closureColor} message={errors.closureColor} />
                                                </div>
                                            </div>

                                            <div className="input-groups">
                                                <div className="col-md-6">
                                                    <label>Primary Packaging: Bottle Colour</label>
                                                    <input type="text" name="bottleColor"
                                                        onChange={e => this.setState({bottleColor: e.target.value})}
                                                        onBlur={handleBlur}
                                                        value={values.bottleColor}
                                                        className={touched.bottleColor && errors.bottleColor ? "has-error" : ""} />
                                                    <Error touched={touched.bottleColor} message={errors.bottleColor} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Primary Packaging: Closure Neck Size</label>
                                                    <input type="text" name="neckSize"
                                                        onChange={e => this.setState({neckSize: e.target.value})}
                                                        onBlur={handleBlur}
                                                        value={values.neckSize}
                                                        className={touched.neckSize && errors.neckSize ? "has-error" : ""} />
                                                    <Error touched={touched.neckSize} message={errors.neckSize} />
                                                </div>
                                            </div>

                                            <div className="product-hero-img upload-field">
                                                <p>Primary Packaging Artwork</p>
                                                <div className="Dropzone">
                                                    <labe>
                                                        <Dropzone onDrop={this.onDropPrimary}>
                                                            {({ getRootProps, getInputProps }) => (
                                                                <div {...getRootProps()}>
                                                                    <input {...getInputProps()} />
                                                                    Drag & Drop<br />
                                                                    or Click To Upload
                                                            <br /><span className="file-return">{primaryArtwork}</span>
                                                                </div>
                                                            )}
                                                        </Dropzone>
                                                    </labe>
                                                </div>
                                                {/* <label>
                                                    <input type="file" name="" />
                                                    Drag & Drop<br />
                                                    or Click To Upload
												</label> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="prod-detail detail-block">
                                        <p>3. Component Details: <span>Secondary Packaging</span></p>
                                        <div className="field-grups">
                                            <div className="input-groups">
                                                <div className="col-md-6">
                                                    <label>Unit Carton: Box Type</label>
                                                    <input type="text" name="boxType"
                                                        onChange={e => this.setState({boxType: e.target.value})}
                                                        onBlur={handleBlur}
                                                        value={values.boxType}
                                                        className={touched.boxType && errors.boxType ? "has-error" : ""} />
                                                    <Error touched={touched.boxType} message={errors.boxType} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Shipping Carton: Type</label>
                                                    <input type="text" name="shippingType"
                                                        onChange={e => this.setState({shippingType: e.target.value})}
                                                        onBlur={handleBlur}
                                                        value={values.shippingType}
                                                        className={touched.shippingType && errors.shippingType ? "has-error" : ""} />
                                                    <Error touched={touched.shippingType} message={errors.shippingType} />
                                                </div>
                                                <div className="col-md-6 production-time">
                                                    <label>Production Time</label>
                                                    <input type="number" name="secondProductionTime"
                                                        onChange={e => this.setState({secondProductionTime: e.target.value})}
                                                        onBlur={handleBlur}
                                                        value={values.secondProductionTime}
                                                        className={touched.secondProductionTime && errors.secondProductionTime ? "has-error" : ""} />
                                                    <Error touched={touched.secondProductionTime} message={errors.secondProductionTime} />
                                                    Days
												</div>
                                            </div>

                                            <div className="input-groups">
                                                <div className="col-md-6">
                                                    <label>Unit Carton: Box Material</label>
                                                    <input type="text" name="boxMaterial"
                                                        onChange={e => this.setState({boxMaterial: e.target.value})}
                                                        onBlur={handleBlur}
                                                        value={values.boxMaterial}
                                                        className={touched.boxMaterial && errors.boxMaterial ? "has-error" : ""} />
                                                    <Error touched={touched.boxMaterial} message={errors.boxMaterial} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Shipping Carton: Material</label>
                                                    <input type="text" name="shippingMaterial"
                                                        onChange={e => this.setState({shippingMaterial: e.target.value})}
                                                        onBlur={handleBlur}
                                                        value={values.shippingMaterial}
                                                        className={touched.shippingMaterial && errors.shippingMaterial ? "has-error" : ""} />
                                                    <Error touched={touched.shippingMaterial} message={errors.shippingMaterial} />
                                                </div>
                                            </div>

                                            <div className="input-groups">
                                                <div className="col-md-6">
                                                    <label>Unit Carton: Box Size</label>
                                                    <input type="text" name="boxSize"
                                                        onChange={e => this.setState({boxSize: e.target.value})}
                                                        onBlur={handleBlur}
                                                        value={values.boxSize}
                                                        className={touched.boxSize && errors.boxSize ? "has-error" : ""} />
                                                    <Error touched={touched.boxSize} message={errors.boxSize} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Shipping Carton: Size</label>
                                                    <input type="number" name="shippingSize"
                                                        onChange={e => this.setState({shippingSize: e.target.value})}
                                                        onBlur={handleBlur}
                                                        value={values.shippingSize}
                                                        className={touched.shippingSize && errors.shippingSize ? "has-error" : ""} />
                                                    <Error touched={touched.shippingSize} message={errors.shippingSize} />
                                                </div>
                                            </div>

                                            <div className="product-hero-img upload-field">
                                                <p>Unit Carton Artwork</p>
                                                <div className="Dropzone">
                                                    <labe>
                                                        <Dropzone onDrop={this.onDropUnitCarton}>
                                                            {({ getRootProps, getInputProps }) => (
                                                                <div {...getRootProps()}>
                                                                    <input {...getInputProps()} />
                                                                    Drag & Drop<br />
                                                                    or Click To Upload
                                                            <br /><span className="file-return">{unitCartonImage}</span>
                                                                </div>
                                                            )}
                                                        </Dropzone>
                                                    </labe>
                                                </div>
                                                {/* <label>
                                                    <input type="file" name="" />
                                                    Drag & Drop<br />
                                                    or Click To Upload
												</label> */}
                                            </div>

                                            <div className="product-hero-img upload-field">
                                                <p>Shipping Carton</p>
                                                <div className="Dropzone">
                                                    <labe>
                                                        <Dropzone onDrop={this.onDropShippingCarton}>
                                                            {({ getRootProps, getInputProps }) => (
                                                                <div {...getRootProps()}>
                                                                    <input {...getInputProps()} />
                                                                    Drag & Drop<br />
                                                                    or Click To Upload
                                                            <br /><span className="file-return">{shippingCartonImage}</span>
                                                                </div>
                                                            )}
                                                        </Dropzone>
                                                    </labe>
                                                </div>
                                                {/* <label>
                                                    <input type="file" name="" />
                                                    Drag & Drop<br />
                                                    or Click To Upload
												</label> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="prod-detail detail-block">
                                        <p>4. Component Details: <span>Formulation</span></p>
                                        <div className="field-grups">
                                            <div className="input-groups">
                                                <div className="col-md-6 ingredient-list">
                                                    <label>INCI Ingredients List</label>
                                                    <input type="text" name="ingredientsList"
                                                        onChange={e => this.setState({ingredientsList: e.target.value})}
                                                        onBlur={handleBlur}
                                                        value={values.ingredientsList}
                                                        className={touched.ingredientsList && errors.ingredientsList ? "has-error" : ""} />
                                                    <Error touched={touched.ingredientsList} message={errors.ingredientsList} />
                                                </div>
                                                <div className="col-md-6 production-time">
                                                    <label>Production Time</label>
                                                    <input type="number" name="fProductionTime"
                                                        onChange={e => this.setState({fProductionTime: e.target.value})}
                                                        onBlur={handleBlur}
                                                        value={values.fProductionTime}
                                                        className={touched.fProductionTime && errors.fProductionTime ? "has-error" : ""} />
                                                    <Error touched={touched.fProductionTime} message={errors.fProductionTime} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="prod-detail detail-block">
                                        <p>5. Manufacturer Details: <span>Primary Packaging Manufacturer</span></p>

                                        {/* <!-- search will show only when if there is any manufacturer is available in the system --> */}
                                        <div className="search-manufacturer">
                                            <div className="input-search">
                                                <Select
                                                    value={primarySelectedOption}
                                                    onChange={this.handleChange}
                                                    options={primaryOptions}
                                                />
                                                {/* <input type="text" name="searchmanufacturer" placeholder="Search Manufacturer Name (Shenzen Bottle Guys)" /> */}
                                            </div>
                                        </div>

                                        <div className="field-grups">
                                            <div className="input-groups">
                                                <div className="col-md-6">
                                                    <label>Manufacturer Name</label>
                                                    <input type="text" name="pName"
                                                        onChange={handleChange}
                                                        onBlur={() => this.handleBlur1(values.pName, "primary")}
                                                        value={values.pName}
                                                        className={touched.pName && errors.pName ? "has-error" : ""} />
                                                    <Error touched={touched.pName} message={errors.pName} />
                                                    {checkPrimary?<div className="form-message text-danger">This name allearady exist Please select dropdown.</div>:null}
                                                    {/* <div class="form-message text-danger">Please.</div> checkPrimary*/}
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Contact Name</label>
                                                    <input type="text" name="pContactName"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.pContactName}
                                                        className={touched.pContactName && errors.pContactName ? "has-error" : ""} />
                                                    <Error touched={touched.pContactName} message={errors.pContactName} />
                                                </div>
                                            </div>

                                            <div className="input-groups">
                                                <div className="col-md-6">
                                                    <label>Manufacturer Address</label>
                                                    {/* <input type="text" name="" />
                                                    <input type="text" name="" /><textarea rows="2" cols="19" text
                                                    <input type="text" name="" /> */}
                                                    <textarea rows="4" cols="25" type="text" name="" name="pAddress"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.pAddress}
                                                        className={touched.pAddress && errors.pAddress ? "has-error" : ""} />
                                                    <Error touched={touched.pAddress} message={errors.pAddress} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Contact Email</label>
                                                    <input type="email" name="pEmail"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.pEmail}
                                                        className={touched.pEmail && errors.pEmail ? "has-error" : ""} />
                                                    <Error touched={touched.pEmail} message={errors.pEmail} />
                                                    <div className="input-field">
                                                        <label>Contact Phone</label>
                                                        <input type="text" name="pPhone"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.pPhone}
                                                            className={touched.pPhone && errors.pPhone ? "has-error" : ""} />
                                                        <Error touched={touched.pPhone} message={errors.pPhone} />
                                                    </div>
                                                    <div className="input-field">
                                                        <label>WeChat-ID</label>
                                                        <input type="text" name="pChatId"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.pChatId}
                                                            className={touched.pChatId && errors.pChatId ? "has-error" : ""} />
                                                        <Error touched={touched.pChatId} message={errors.pChatId} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="prod-detail detail-block">
                                        <p>6. Manufacturer Details: <span>Secondary Packaging Manufacturer</span></p>

                                        {/* <!-- search will show only when if there is any manufacturer is available in the system --> */}
                                        <div className="search-manufacturer">
                                            <div className="input-search">
                                                <Select
                                                    value={secondSelectedOption}
                                                    onChange={this.handleChangeSecond}
                                                    options={secondOptions}
                                                />
                                                {/* <input type="text" name="searchmanufacturer" placeholder="Search Manufacturer Name (Shenzen Bottle Guys)" /> */}
                                            </div>
                                        </div>

                                        <div className="field-grups">
                                            <div className="input-groups">
                                                <div className="col-md-6">
                                                    <label>Manufacturer Name</label>
                                                    <input type="text" name="sName"
                                                        onChange={handleChange}
                                                        onBlur={() => this.handleBlur1(values.sName, "secondary")}
                                                        value={values.sName}
                                                        className={touched.sName && errors.sName ? "has-error" : ""} />
                                                    <Error touched={touched.sName} message={errors.sName} />
                                                    {checkSecondary?<div className="form-message text-danger">This name allearady exist Please select dropdown.</div>:null}
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Contact Name</label>
                                                    <input type="text" name="sContactName"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.sContactName}
                                                        className={touched.sContactName && errors.sContactName ? "has-error" : ""} />
                                                    <Error touched={touched.sContactName} message={errors.sContactName} />
                                                </div>
                                            </div>

                                            <div className="input-groups">
                                                <div className="col-md-6">
                                                    <label>Manufacturer Address</label>
                                                    {/* <input type="text" name="" />
                                                    <input type="text" name="" />
                                                    <input type="text" name="" /> */}
                                                    <textarea rows="4" cols="25" type="text" name="" name="sAddress"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.sAddress}
                                                        className={touched.sAddress && errors.sAddress ? "has-error" : ""} />
                                                    <Error touched={touched.sAddress} message={errors.sAddress} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Contact Email</label>
                                                    <input type="email" name="sEmail"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.sEmail}
                                                        className={touched.sEmail && errors.sEmail ? "has-error" : ""} />
                                                    <Error touched={touched.sEmail} message={errors.sEmail} />
                                                    <div className="input-field">
                                                        <label>Contact Phone</label>
                                                        <input type="text" name="sPhone"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.sPhone}
                                                            className={touched.sPhone && errors.sPhone ? "has-error" : ""} />
                                                        <Error touched={touched.sPhone} message={errors.sPhone} />
                                                    </div>
                                                    <div className="input-field">
                                                        <label>WeChat-ID</label>
                                                        <input type="text" name="sWeChatId"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.sWeChatId}
                                                            className={touched.sWeChatId && errors.sWeChatId ? "has-error" : ""} />
                                                        <Error touched={touched.sWeChatId} message={errors.sWeChatId} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="prod-detail detail-block">
                                        <p>7. Manufacturer Details: <span>Formulation Manufacturer</span></p>

                                        {/* <!-- search will show only when if there is any manufacturer is available in the system --> */}
                                        <div className="search-manufacturer">
                                            <div className="input-search">
                                                <Select
                                                    value={manufacturerSelectedOption}
                                                    onChange={this.handleChangeManufacturer}
                                                    options={formulationOptions}
                                                />
                                                {/* <input type="text" name="searchmanufacturer" placeholder="Search Manufacturer Name (Shenzen Bottle Guys)" /> */}
                                            </div>
                                        </div>

                                        <div className="field-grups">
                                            <div className="input-groups">
                                                <div className="col-md-6">
                                                    <label>Manufacturer Name</label>
                                                    <input type="text" name="fName"
                                                        onChange={handleChange}
                                                        onBlur={() => this.handleBlur1(values.sName, "formulation ")}
                                                        value={values.fName}
                                                        className={touched.fName && errors.fName ? "has-error" : ""} />
                                                    <Error touched={touched.fName} message={errors.fName} />
                                                    {checkFormulation ?<div className="form-message text-danger">This name allearady exist Please select dropdown.</div>:null}
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Contact Name</label>
                                                    <input type="text" name="fContactName"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.fContactName}
                                                        className={touched.fContactName && errors.fContactName ? "has-error" : ""} />
                                                    <Error touched={touched.fContactName} message={errors.fContactName} />
                                                </div>
                                            </div>

                                            <div className="input-groups">
                                                <div className="col-md-6">
                                                    <label>Manufacturer Address</label>
                                                    {/* <input type="text" name="" />
                                                    <input type="text" name="" /> */}
                                                    <textarea rows="4" cols="25" type="text" name="fAddress"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.fAddress}
                                                        className={touched.fAddress && errors.fAddress ? "has-error" : ""} />
                                                    <Error touched={touched.fAddress} message={errors.fAddress} />
                                                    <select onChange={this.change} name="country"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.country}
                                                        className={touched.country && errors.country ? "has-error" : ""}>
                                                        <option>Country</option>
                                                        <option>United States</option>
                                                        <option>Australia</option>
                                                    </select>
                                                    <Error touched={touched.country} message={errors.country} />
                                                    <div className="input-field" style={{ marginTop: "15px" }}>
                                                        <label>Final Version</label>
                                                        <input type="text" name="fVersion"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.fVersion}
                                                            className={touched.fVersion && errors.fVersion ? "has-error" : ""} />
                                                        <Error touched={touched.fVersion} message={errors.fVersion} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Contact Email</label>
                                                    <input type="email" name="fEmail"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.fEmail}
                                                        className={touched.fEmail && errors.fEmail ? "has-error" : ""} />
                                                    <Error touched={touched.fEmail} message={errors.fEmail} />
                                                    <div className="input-field">
                                                        <label>Contact Phone</label>
                                                        <input type="text" name="fPhone"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.fPhone}
                                                            className={touched.fPhone && errors.fPhone ? "has-error" : ""} />
                                                        <Error touched={touched.fPhone} message={errors.fPhone} />
                                                    </div>
                                                    <div className="input-field">
                                                        <label>WeChat-ID</label>
                                                        <input type="text" name="fWeChatId"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.fWeChatId}
                                                            className={touched.fWeChatId && errors.fWeChatId ? "has-error" : ""} />
                                                        <Error touched={touched.fWeChatId} message={errors.fWeChatId} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="prod-detail detail-block">
                                        <p>8. Carbon Offset</p>
                                        <div className="field-grups">
                                            <div className="input-groups">
                                                <div className="col-md-6">
                                                    <label>Per Unit</label>
                                                    <input type="number" name="perUnit"
                                                        onChange={e => this.setState({perUnit: e.target.value})}
                                                        onBlur={handleBlur}
                                                        value={values.perUnit}
                                                        className={touched.perUnit && errors.perUnit ? "has-error" : ""} />
                                                    <Error touched={touched.perUnit} message={errors.perUnit} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="add-product-submit">
                                        <button type="submit" className="btn-module">Done</button>
                                    </div>

                                </div>
                            </form>
                        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(product)