import { apiPostMethod } from './DbConfig/ApiPostMethod';
import { apiGetMethod } from './DbConfig/ApiGetMethod';
import Api from './DbConfig/ApiActions'

// API of Login 
export const ForgotPassword = (value) => {
    return new Promise((resolve, reject) => {
        let url = Api.FORGOT_ADMIN_PASSWORD,
        data = {
            "email": value.email
        },
        headers = {};
        apiPostMethod(url, data, "").then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export const resetPassword = (data) => {
    //debugger
    return new Promise((resolve, reject) => {
        let url = Api.RESET_PASSWORD,
            headers = {};
        apiPostMethod(`${url}`, data, '').then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}