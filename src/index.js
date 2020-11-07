import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

/* global style */
import './global.scss';

import * as serviceWorker from './serviceWorker';
import { HashRouter, Route, Switch } from 'react-router-dom';

//redux
import { Provider } from 'react-redux';
//redux to get appredux on page refreash 
import { PersistGate } from 'redux-persist/integration/react'
//app store
import store from './Redux/Store/Store';

ReactDOM.render(
    <Provider store={store().store}>
        <PersistGate loading={null} persistor={store().persistor}>
            <HashRouter>
                <Switch>
                    <Route component={App} />
                </Switch>
            </HashRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
