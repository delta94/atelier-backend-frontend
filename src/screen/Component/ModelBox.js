import React, { Component } from "react";
// redux
import { Formik } from "formik";
import * as Yup from "yup";
import Error from "../utils/Error";
import { connect } from "react-redux";
// Dispatch

//model css
import "./model.scss";

import popcross from "../img-new/small-cross-icon.svg";
import Carousel from "react-bootstrap/Carousel";

class ModelBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupConfirm: true,
      popupConfirmOk: true
    };
  }
  onPressOk = () => {
    this.props.onPressClosePass();
  };

  onPressOkAll = () => {
    this.props.onPressClosePass();
  };

  onPressCancel = () => {
    this.props.onPressCancelPass();
  };

  onViewOrder = () => {
    this.props.onViewOrder();
  };

  onSubmitDetails = values => {
    console.log(values);
  };

  render() {
    const { headerTitle } = this.props;
    return (
      // <!-- popup -->
      <div className="popup-module pop-style">
        <div className="popup-content d-flex flex-column">
          <div className="header-content d-flex align-items-center justify-content-center flex-column">
            <div className="popup-textarea d-flex align-items-center justify-content-between">
              <div className="popup-text">
                <h3>{headerTitle}</h3>
              </div>
              <div className="popup-btns">
                <p>If all your details are correct, click 'OK' to continue.</p>
                <a onClick={this.onPressOk} href="#" className="btn-module">
                  ok
                </a>
                <a onClick={this.onPressCancel} href="#" className="not-ready">
                  CANCEL
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModelBox;
