import { apiPostMethod } from './DbConfig/ApiPostMethod'
import { apiGetMethod } from './DbConfig/ApiGetMethod';
import Api from './DbConfig/ApiActions'
// API of sigup 
export const uoloadImage = (data, token) => {
    return new Promise((resolve, reject) => {
        let url = Api.IMAGE_UPLOAD,
            // data=`Email=${userName}&Password=${passWord}&ConfirmPassword=${confirmPassword}`,
            headers = {};
        apiPostMethod(url, data, token).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}