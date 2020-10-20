import {apiGetMethod} from './DbConfig/ApiGetMethod';
import {apiPostMethod} from './DbConfig/ApiPostMethod';
import apiUrl from './DbConfig/ApiActions'
export const fetchUserDetail = (token) =>{
    return new Promise((resolve,reject) =>{
        let url = apiUrl.USER_DETAIL
        apiGetMethod(url,token).then(response =>{
            resolve(response.data)
        }).catch(err =>{
            reject(err)
        })
    })
}
export const updateUserDetail = (data,token) =>{
    return new Promise((resolve,reject) =>{
        let url = apiUrl.UPDATE_USER_INFO
        apiPostMethod(url,data,token).then(response =>{
            resolve(response.data)
        }).catch(err =>{
            reject(err)
        })
    })
}
export const updateUserAddress = (data,token) =>{
    return new Promise((resolve,reject) =>{
        let url = apiUrl.UPDATE_USER_ADDRESS
        apiPostMethod(url,data,token).then(response =>{
            resolve(response.data)
        }).catch(err =>{
            reject(err)
        })
    })
}
export const changePassword = (data,headers) =>{
    return new Promise((resolve,reject) =>{
        let url = apiUrl.CHANGE_PASSWORD
        apiPostMethod(url,data,headers).then(response =>{
            resolve(response.data)
        }).catch(err =>{
            reject(err)
        })
    })
}