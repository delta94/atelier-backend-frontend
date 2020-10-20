import React from 'react';
import { Route } from 'react-router-dom';

const OuterLayout = ({ children, ...rest }) => {
  return (
    <div className="page page-dashboard">
      <div className="main">{children}</div>

    </div>
  )
}

const OuterLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      <OuterLayout>
        <Component {...matchProps} />
      </OuterLayout>
    )} />
  )
};

export default OuterLayoutRoute;