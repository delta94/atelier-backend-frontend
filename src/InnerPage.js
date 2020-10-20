import React from 'react';
import { Route } from 'react-router-dom';
// Dispatch 
import SideBar from './screen/sidebar/sideBar'
// import '../css/style-main.css'
import './screen/css/style-main.css'
const InnerLayout = ({ children, ...rest }) => {
    return (
        // <div className="page page-dashboard">  
        //   <div className="main">{children}</div>  

        // </div>  
        <div className="main d-flex flex-column">
            <div className="container-fluid d-flex flex-column">
                <div className="row">
                    <SideBar />
                    {children}
                </div>
            </div>
        </div >
    )
}

const InnerLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <InnerLayout>
                <Component {...matchProps} />
            </InnerLayout>
        )} />
    )
};

export default InnerLayoutRoute;
// export default login;
