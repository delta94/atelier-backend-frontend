import axios from 'axios';
import { apiCommonParams } from './ApiBaseUrl'
import { api } from './ApiActions'

export const apiGetMethod = (url, token) => {

    return new Promise((resolve, reject) => {
        let headers = {};
        if (token) {
            headers = {
                // Authorization: `bearer ${token}`
                Authorization: `${token}`
            }
        }
        axios.get(url, { headers })
            .then(res => {
                resolve(res);
            }).catch(err => {
                debugger
                if (err.response && err.response.status === 400) {
                    window.history.pushState('', '', `login`);
                    setTimeout(() => {
                        window.location.reload();
                    }, 100)
                }
                //reject(err)
                err.response ?
                    err.response.status === 401 ?
                        reAuth(url, headers)
                            .then(res => { resolve(res) })
                            .catch(err => { reject(err) })
                        : err.response && err.response.status === 500 ? pageRedirect('#/login') : reject(err)
                    : pageRedirect('#/login')
            })
    })
}
export const reAuth = (url, headers) => {
    return new Promise((resolve, reject) => {
        let reduxData = JSON.parse(localStorage.getItem(`persist:${apiCommonParams.REDUX_STORE_KEY}`));
        let authReducer = JSON.parse(reduxData.login);
        let loginData = `grant_type=refresh_token&client_id=${apiCommonParams.CLIENT_ID}&client_secret=${apiCommonParams.CLIENT_SECRET}&refresh_token=${authReducer.loginUserInfo.refresh_token}`
        axios.post(api.REFRESHTOKEN, loginData, { headers: {} }).then(res => {
            headers['Authorization'] = `bearer ${res.data.access_token}`;
            authReducer.loginUserInfo.access_token = res.data.access_token;
            authReducer.loginUserInfo.refresh_token = res.data.refresh_token;
            reduxData.login = JSON.stringify(authReducer);
            updateLocalStorage(reduxData)
            axios.get(url, { headers }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        }).catch(err => {
            debugger
            if (window.location.pathname !== "#/login") {
                pageRedirect('#/login');
            }
        })
    })
}
export function updateLocalStorage(reduxData) {
    localStorage.setItem(`persist:${apiCommonParams.REDUX_STORE_KEY}`, JSON.stringify(reduxData));
}
export function pageRedirect(pageName) {
    let reduxData = JSON.parse(localStorage.getItem(`persist:${apiCommonParams.REDUX_STORE_KEY}`));
    let authReducer = JSON.parse(reduxData.login),
        loginUserInfo = {
            loginUserInfo: {},
        };
    authReducer.login = loginUserInfo;
    reduxData.login = JSON.stringify(authReducer);
    updateLocalStorage(reduxData);
    setTimeout(() => {
        window.history.pushState('', '', `/${pageName}`);
        window.location.reload();
    }, 100)

}