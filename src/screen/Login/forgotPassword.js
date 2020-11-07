import React, { Component } from "react";

// atelier logo
import atelierlogo from "../../img-new/atelier-logo.svg"; 

// alogo header only
import Alogo from "../Component/header/header";

// style
import './login.scss'

class forgotPassword extends Component {
  render() {
    return (
            <div className="login-screen">
              <Alogo />

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
                              <h3>
                                Thank you
                                <br />
                                :)
                                <br />
                                <br />
                                Check your email. We'll see you soon.
                              </h3>
                              <div className="form-submit">
                                <a href="/login" onClick={this.redirect} className="btn-module">
                                  SIGN IN
                                </a>
                              </div>
                            </div>
                          
                            <div class="formarea d-flex flex-column justify-content-between">
                              <h3>
                                No worries!
                                <br />
                                Enter the email associated with your account and we'll send you a reset.
                              </h3>
                              <form>
                                <div className="field-groups">
                                  <div className="login-fields">
                                    <div className="input-field">
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder="Email"
                                        autocomplete="off"
                                        value=""
                                      />
                                      
                                      <div className="form-message text-danger"></div>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-submit">
                                  <input className="btn-module" type="submit" name="" value="Send" />
                                </div>
                              </form>
                            </div>

                        </div>
                      </div>
                    </div>
                  </div>
            </div>
        );
  }
}

export default forgotPassword;