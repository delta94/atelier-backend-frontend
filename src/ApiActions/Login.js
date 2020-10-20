import { apiPostMethod } from './DbConfig/ApiPostMethod';
import { apiCommonParams } from './DbConfig/ApiBaseUrl'
import Api from './DbConfig/ApiActions'

// API of Login 
export const login = (data) => {
    return new Promise((resolve, reject) => {
        let url = Api.LOGIN,
            // data = `email=${email}&password=${passWord}&grant_type=password&client_id=${apiCommonParams.CLIENT_ID}&client_secret=${apiCommonParams.CLIENT_SECRET}`,
            // data = `email=${email}&password=${passWord}`,
            headers = '';
        apiPostMethod(url, data, headers).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}