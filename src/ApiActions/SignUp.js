import { apiPostMethod } from './DbConfig/ApiPostMethod'
import { apiGetMethod } from './DbConfig/ApiGetMethod';
import Api from './DbConfig/ApiActions'
// API of sigup 
export const signUp = (data, token) => {
    return new Promise((resolve, reject) => {
        let url = Api.SIGNUP,
            // data=`Email=${userName}&Password=${passWord}&ConfirmPassword=${confirmPassword}`,
            headers = {};
        apiPostMethod(url, data, token).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}
export const GetUser = (token) => {
    return new Promise((resolve, reject) => {

        console.log(JSON.stringify(token))
        let url = Api.USER_LIST,
            headers = {};
        // if (token) {
        //     // headers = { authorization: `${'Bearer ' + token}` }
        //     headers = { authorization: token }
        // }
        apiGetMethod(url, token)
            .then(response => {
                debugger
                resolve(response)
                // resolve(response.data.Data)
            }).catch(err => {
                reject(err)
            })
    })
}