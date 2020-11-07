import React, { Component } from 'react';
import LoadingOverlay from 'react-loading-overlay';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';
import { connect } from 'react-redux';
// Dispatch 
import { saveLoginUserInfo } from './Redux/Action/Login'

import InnerLayoutRoute from "./InnerPage";
import Login from './screen/Login/login';
import ForgotPassword from './screen/Login/forgotPassword';
// import ResetPassword from './screen/login/resetPassword';
// import Welcome from './screen/login/welcome';
import Company from './screen/Company/companyList';
// import Products from './screen/Product/productList';
import Production from './screen/Production/productionList';
// import OderDetails from './screen/Orders/orderDetails';
// import Accounts from './screen/Accounts/AccountsDetails';
import Home from './screen/Home/home';
import OuterPageLayout from './OuterPage';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPageLoader: false
    }
  }
  componentWillUpdate() {
    // alert(JSON.stringify("lllll :" + this.props.isLoading))
  }
  showHideLoader = (isShowHide) => {
    this.setState({
      showPageLoader: isShowHide
    })
  }
  render() {
    return (
      <LoadingOverlay
        active={this.props.isLoading}
        spinner
        text='Loading your content...'
      >
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="login" />
            </Route>
            {/* <OuterPageLayout path="/welcome" component={Welcome} /> */}
            <OuterPageLayout path="/login" component={Login} />
            <OuterPageLayout path="/forgotPassword" component={ForgotPassword} />
            {/*<OuterPageLayout path="/resetPassword" component={ResetPassword} />*/}
            <InnerLayoutRoute path="/home" component={Home} />
            <InnerLayoutRoute path="/company" component={Company} />
            <InnerLayoutRoute path="/production" component={Production} />
            {/*<InnerLayoutRoute path="/oderDetails" component={OderDetails} />
            <InnerLayoutRoute path="/accounts" component={Accounts} />  */}
          </Switch>
        </Router>
      </LoadingOverlay>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loginUserInfo: state.login.loginUserInfo,
    isLoading: state.loading
  }
}
const mapDispatchToProps = (dispatch) => ({
  saveLoginUserInfo: (actionType, data) => dispatch(saveLoginUserInfo(actionType, data))
})
// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
