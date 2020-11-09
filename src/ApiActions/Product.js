import Api from './DbConfig/ApiActions';
import { apiGetMethod } from './DbConfig/ApiGetMethod';
import { apiPostMethod } from './DbConfig/ApiPostMethod';
import { apiPutMethod } from './DbConfig/ApiPutMethod';

export const AddProduct = (productData, token) => {
    return new Promise((resolve, reject) => {

        console.log(JSON.stringify(token))
        let url = Api.ADD_PRODUCT,
            headers = {};
        apiPostMethod(url, productData, token)
            .then(response => {
                // debugger
                resolve(response)
            }).catch(err => {
                reject(err)
            })
    })
}
export const updateProduct = (data, token) => {
    // debugger
    return new Promise((resolve, reject) => {
        let url = Api.ADD_PRODUCT,
            headers = {};
        apiPutMethod(url, data, token).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}
export const GetProduct = (userId, token) => {
    return new Promise((resolve, reject) => {

        console.log(JSON.stringify(token))
        let url = Api.GET_PRODUCT,
            headers = {};
        // if (token) {
        //     // headers = { authorization: `${'Bearer ' + token}` }
        //     headers = { authorization: token }
        // }
        // apiGetMethod(`${url}?userId=${userId}`, "").then(res => {
        apiGetMethod(`${url}?userId=${userId}`, token)
            .then(response => {
                // debugger
                // alert(response)
                resolve(response)
                // resolve(response.data.Data)
            }).catch(err => {
                reject(err)
            })
    })
}
export const GetManufacturer = (token) => {
    return new Promise((resolve, reject) => {

        console.log(JSON.stringify(token))
        let url = Api.GET_MANUFACTURER,
            headers = {};
        apiGetMethod(`${url}`, token)
            .then(response => {
                // debugger
                // alert(response)
                resolve(response)
                // resolve(response.data.Data)
            }).catch(err => {
                reject(err)
            })
    })
}
export const GetCart = (productId, token) => {
    return new Promise((resolve, reject) => {

        console.log(JSON.stringify(token))
        let url = Api.GET_CART,
            headers = {};
        // if (token) {
        //     // headers = { authorization: `${'Bearer ' + token}` }
        //     headers = { authorization: token }
        // }
        apiGetMethod(`${url}/${productId}`, token)
            .then(response => {
                // debugger
                // alert(response)
                resolve(response)
                // resolve(response.data.Data)
            }).catch(err => {
                reject(err)
            })
    })
}
export const GetCartUserList = (userId, token) => {
    return new Promise((resolve, reject) => {

        console.log(JSON.stringify(token))
        let url = Api.GET_USER_CART,
            headers = {};
        // if (token) {
        //     // headers = { authorization: `${'Bearer ' + token}` }
        //     headers = { authorization: token }
        // }
        apiGetMethod(`${url}/?userId=${userId}`, token)
            .then(response => {
                // debugger
                // alert(response)
                resolve(response)
                // resolve(response.data.Data)
            }).catch(err => {
                reject(err)
            })
    })
}
export const updateImage = (data, token) => {
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
export const AddComplianceInfo = (data, token) => {
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
export const ConfirmOrder = (token, data) => {
    return new Promise((resolve, reject) => {

        console.log(JSON.stringify(token))
        let url = Api.PRODUCT_ORDER,
            headers = {};
        apiPostMethod(url, data, token)
            .then(response => {
                // debugger
                // alert(response)
                resolve(response)
                // resolve(response.data.Data)
            }).catch(err => {
                reject(err)
            })
    })
}
export const GetOrder = (token) => {
    return new Promise((resolve, reject) => {

        console.log(JSON.stringify(token))
        let url = Api.GET_ORDER,
            headers = {};
        // if (token) {
        //     // headers = { authorization: `${'Bearer ' + token}` }
        //     headers = { authorization: token }
        // }
        apiGetMethod(url, token)
            .then(response => {
                // debugger
                // alert(response)
                resolve(response)
                // resolve(response.data.Data)
            }).catch(err => {
                reject(err)
            })
    })
}
export const GetProduction = (token) => {
    return new Promise((resolve, reject) => {

        console.log(JSON.stringify(token))
        let url = Api.GET_PRODUCTION
        apiGetMethod(url, token)
            .then(response => {
                // debugger
                // alert(response)
                resolve(response)
                // resolve(response.data.Data)
            }).catch(err => {
                reject(err)
            })
    })
}
export const GetCount = (token) => {
    return new Promise((resolve, reject) => {

        console.log(JSON.stringify(token))
        let url = Api.GET_COUNT,
            headers = {};
        apiGetMethod(url, token)
            .then(response => {
                // debugger
                resolve(response)
            }).catch(err => {
                reject(err)
            })
    })
}
export const updateManufacturer = (data, token) => {
    // debugger
    return new Promise((resolve, reject) => {
        let url = Api.UPDATE_MANUFACTUR,
            headers = {};
        apiPutMethod(url, data, token).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}
