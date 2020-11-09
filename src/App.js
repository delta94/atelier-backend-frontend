import React, { Component } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveLoginUserInfo } from './Redux/Action/Login'
import InnerLayoutRoute from "./InnerPage";
import Login from './screen/Login/login';
import ForgotPassword from './screen/Login/forgotPassword';
import Company from './screen/Company/companyList';
import Production from './screen/Production/productionList';
import OuterPageLayout from './OuterPage';
import ProductList from './screen/Product/productList';
import UserOrderList from './screen/Product/userOrderList';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPageLoader: false
    }
  }

  componentWillUpdate() {
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
            <OuterPageLayout path="/login" component={Login} />
            <OuterPageLayout path="/forgotPassword" component={ForgotPassword} />
            <InnerLayoutRoute path="/company" component={Company} />
            <InnerLayoutRoute path="/products" component={ProductList} />
            <InnerLayoutRoute path="/production" component={Production} />
            <InnerLayoutRoute path="/orders" component={UserOrderList} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
