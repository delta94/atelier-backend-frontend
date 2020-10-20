import { apiPostMethod } from './DbConfig/ApiPostMethod';
import { apiPutMethod } from './DbConfig/ApiPutMethod';
import { apiGetMethod } from './DbConfig/ApiGetMethod';
import Api from './DbConfig/ApiActions'

// API of Login 
export const ForgotPassword = (data, token) => {
    return new Promise((resolve, reject) => {
        let url = Api.FORGOT_PASSWORD,
            headers = {};
        apiGetMethod(`${url}?email=${data.email}`, "").then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export const updateAccount = (data, token) => {
    debugger
    return new Promise((resolve, reject) => {
        let url = Api.UPDATE_USER_INFO,
            headers = {};
        apiPutMethod(url, data, token).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}
export const updateCompany = (data, token) => {
    debugger
    return new Promise((resolve, reject) => {
        let url = Api.UPDATE_COMP_INFO,
            headers = {};
        apiPutMethod(url, data, token).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}
export const updateShippingDetail = (data, token) => {
    debugger
    return new Promise((resolve, reject) => {
        let url = Api.UPDATE_SHIPPING_DETAIL,
            headers = {};
        apiPutMethod(url, data, token).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}
export const getUserDetails = (token) => {
    debugger
    return new Promise((resolve, reject) => {
        let url = Api.USER_DETAIL,
            headers = {};
        // apiPostMethod(`${url}`, '', token).then(res => {
        apiGetMethod(url, token).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}