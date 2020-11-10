import React, { Component } from 'react';
// redux
import { Formik } from 'formik';
import * as Yup from 'yup';
import Error from '../../utils/Error'
import { connect } from 'react-redux';
// Dispatch 

//model css
import "./model.scss";

import popcross from '../../img-new/small-cross-icon.svg';
import Carousel from 'react-bootstrap/Carousel'

import ProductionDetails from '../Production/ProductionDetails'

const userValidationSchema = Yup.object().shape({
  name: Yup.string()
      .min(2, "Must have 2 character.")
      .max(255, "Must be shorter than 255.")
      .required("Must enter name."),
  company: Yup.string()
      .min(2, "Must have 2 character.")
      .max(255, "Must be shorter than 255.")
      .required("Must enter companyN."),
  address: Yup.string()
      .min(10, "Must have 10 character.")
      .max(255, "Must be shorter than 255.")
      .required("Must enter an address."),
  city: Yup.string()
      .min(2, "Must have 2 character.")
      .max(255, "Must be shorter than 255.")
      .required("Must enter an city."),
  country: Yup.string()
      .min(2, "Must have 2 character.")
      .max(255, "Must be shorter than 255.")
      .required("Must enter an country."),
  state: Yup.string()
      .min(2, "Must have 2 character.")
      .max(255, "Must be shorter than 255.")
      .required("Must enter an state."),
  zip: Yup.string()
      .min(2, "Must have 2 character.")
      .max(255, "Must be shorter than 255.")
      .required("Must enter an postcode/zip ccode."),
      
})
class Model extends Component {
    constructor(props) {
        super(props)
        this.state = {
            popupConfirm:true,
            popupConfirmOk:true,
        }
    }
    onPressOk = () => {
        this.props.onPressClosePass();
    }

    onPressOkAll = () => {
        this.props.onPressClosePass();
    }
    onPressCancel = () => {
        this.props.onPressCancelPass();
    }
    onViewOrder = () => {
        this.props.onViewOrder();
    }
    onSubmitDetails = (values) => {
      console.log(values);
      // this.props.updateShipping(values)
    }

    render() {
        const { open, onPressClose, onPressCancelPass, response, productName, units, order, successMeg, submitModel,
            shippingModel } = this.props;
        const { userInfo} = this.state;
        return (
            // <!-- popup -->
            <div className={shippingModel ? 'popup-module pop-style edit-payment-popup':'popup-module pop-style'}>
                <div className="popup-content d-flex flex-column">
                    {order  ? <div className="header-content d-flex align-items-center justify-content-center flex-column">
                        <div className="popup-textarea d-flex align-items-center justify-content-between">

                            <div className="popup-text">
                                <h3>Your order is now in production.</h3>
                            </div>
                            <div className="popup-btns">
                                <p>If all your details are correct, click 'OK' to continue.</p>
                                <a onClick={this.onPressOk}
                                
                                   href="#" className="btn-module">ok</a>
                                <a onClick={this.onPressCancel} href="#" className="not-ready">CANCEL</a>
                            </div>
                        </div>
                    </div> :
                         successMeg  ? <div className="header-content d-flex align-items-center justify-content-center flex-column">
                            <div className="popup-textarea d-flex align-items-center justify-content-between">
                                <div className="popup-text">
                                <h3>Your order has been placed</h3>
                                    {/* <h3>Congratulations <br />on your <br />new order</h3> */}
                                </div>
                                <div className="popup-btns">
                                    <a onClick={this.onViewOrder} href="#" className="btn-module">VIEW order</a>
                                    <a onClick={this.onPressCancel} href="#" className="not-ready">CLOSE</a>
                                </div>
                            </div>
                        </div>:
                             shippingModel ?
                            <div className="change-payment-popup">
                                <a href="#" className="not-ready close-popup" onClick={this.onPressCancel}><img src={popcross} alt="small-cross-icon" /></a>
                                
                                <div className="header-content">
                                  <div className="popup-content-area">
                                    <h3>Update and change your details here for this order only.</h3>
                                    <div className="popup-form-area">
                                    <Formik initialValues={{ name: userInfo ? userInfo.name : "", company: userInfo ? userInfo.company : "", address: userInfo ? userInfo.address : "", city: userInfo ? userInfo.city : "", country: userInfo ? userInfo.country : "", state: userInfo ? userInfo.state : "", zip: userInfo ? userInfo.zip : "" }} validationSchema={userValidationSchema} onSubmit={(values, { resetForm }) => { this.onSubmitDetails(values); resetForm(); }}>
                                      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                                          <form onSubmit={handleSubmit}>
                                        <div className="shiping-address">
                                          <label>Shipping Address</label>
                                          <div className="field-group">
                                            <input type="text" name="name" id="name" placeholder="First and Last Name" onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                                onChange={handleChange}
                                                className={touched.name && errors.name ? "form-control has-error" : "form-control"} />
                                            <Error touched={touched.name} message={errors.name} />
                                            <input type="text" name="company" id="company" placeholder="Company Name" onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.company}
                                                onChange={handleChange}
                                                className={touched.company && errors.company ? "form-control has-error" : "form-control"} />
                                            <Error touched={touched.company} message={errors.company} />
                                          </div>
                                        </div>

                                        <div className="delivery-address">
                                          <label>Delivery Address</label>
                                          <div className="field-group">
                                            {/* <input className="form-control" type="text" name="" placeholder="Address" /> */}
                                            <input type="text" name="address" id="address" placeholder="Address" onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.address}
                                            className={touched.address && errors.address ? "form-control has-error" : "form-control"} />
                                            <Error touched={touched.address} message={errors.address} />
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

                                          <div className="update-details">
                                            <button onClick={() => this.onSubmitDetails(values)} type="submit">Update Details</button>
                                          </div>
                                        </div>
                                      </form>
                                      )}
                                      </Formik>
                                      <form>
                                        <div className="method-fields">
                                          <label>Payment Method</label>
                                          <div className="field-group">
                                            <label>Card Number</label>
                                            <input className="form-control" type="text" name="" placeholder="####-####-####-####" />
                                          </div>
                                          <div className="form-group d-flex">
                                            <div className="col-sm-6 col-md-6 col-lg-6">
                                              <label>Expiry Date</label>
                                              <input className="form-control" type="text" name="" placeholder="MM/YY" />
                                            </div>

                                            <div className="col-sm-6 col-md-6 col-lg-6">
                                              <label>CVC/CODE</label>
                                              <input className="form-control" type="text" name="" placeholder="***" />
                                            </div>
                                          </div>

                                          <div className="update-details">
                                            <button type="button">Update Details</button>
                                          </div>
                                        </div>
                                      </form>
                                      
                                    </div>
                                  </div>
                                </div>
                            </div>
                                 :this.props.imgModel ? <Carousel>
                                     <div className="popup-btns">
                                         <a onClick={this.onPressCancel} href="#" className="not-ready">CANCEL</a>
                                     </div>
                                     <Carousel.Item>
                                         <img
                                             className="d-block w-100"
                                             src="images/face-serun-60ml.png"
                                             alt="First slide"
                                         />
                                         <Carousel.Caption>
                                             <h3>First slide label</h3>
                                             <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                         </Carousel.Caption>
                                     </Carousel.Item>
                                     <Carousel.Item>
                                         <img
                                             className="d-block w-100"
                                             src="images/face-serun-60ml.png"
                                             alt="Third slide"
                                         />

                                         <Carousel.Caption>
                                             <h3>Second slide label</h3>
                                             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                         </Carousel.Caption>
                                     </Carousel.Item>
                                     <Carousel.Item>
                                         <img
                                             className="d-block w-100"
                                             src="images/face-serun-60ml.png"
                                             alt="Third slide"
                                         />

                                         <Carousel.Caption>
                                             <h3>Third slide label</h3>
                                             <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                         </Carousel.Caption>
                                     </Carousel.Item>
                                 </Carousel>
                                 :this.props.postModel ? <div>
                                         <div className="popup-text">
                                             <h3>product detail come here</h3>
                                         </div>
                                        {/*<ProductionDetails />*/}
                                         <div className="popup-btns">
                                             <a onClick={this.onPressCancel} href="#" className="not-ready">CANCEL</a>
                                         </div>

                                 </div>
                                 :<div className="header-content d-flex align-items-center justify-content-center flex-column">
                            <div className="popup-textarea d-flex align-items-center justify-content-between">
                                <div className="popup-text">
                                    <h3>Congratulations <br />on your <br />new order</h3>
                                </div>
                                <div className="popup-btns">
                                    <p>Make sure your details are correct. Are you sure this is what you want?</p>
                                    <a onClick={this.onPressOk}  href="#" className="btn-module">Confirm Order</a>
                                    <a onClick={this.onPressCancel} href="#" className="not-ready">CANCEL</a>
                                </div>
                            </div>
                        </div>}
                </div>
            </div>
        )
    }
}



export default Model
