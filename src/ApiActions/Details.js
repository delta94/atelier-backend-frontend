import { apiGetMethod } from './DbConfig/ApiGetMethod';
import { apiPostMethod } from './DbConfig/ApiPostMethod';
import apiUrl from './DbConfig/ApiActions'
export const getShippingDetails = (user_id, token) => {
    return new Promise((resolve, reject) => {
        let url = apiUrl.SHIPPING_DETAIL
        apiGetMethod(`${url}/${user_id}`, token).then(response => {
            resolve(response.data)
        }).catch(err => {
            reject(err)
        })
    })
}
export const updateUserDetail = (data, token) => {
    return new Promise((resolve, reject) => {
        let url = apiUrl.UPDATE_USER_INFO
        apiPostMethod(url, data, token).then(response => {
            resolve(response.data)
        }).catch(err => {
            reject(err)
        })
    })
}