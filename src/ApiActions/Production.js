import Api from "./DbConfig/ApiActions";
import { apiGetMethod } from "./DbConfig/ApiGetMethod";
import { apiPostMethod } from "./DbConfig/ApiPostMethod";
import { apiPutMethod } from "./DbConfig/ApiPutMethod";

// export const GetCart = (productId, token) => {
//     return new Promise((resolve, reject) => {

//         console.log(JSON.stringify(token))
//         let url = Api.GET_CART,
//             headers = {};
//         // if (token) {
//         //     // headers = { authorization: `${'Bearer ' + token}` }
//         //     headers = { authorization: token }
//         // }
//         apiGetMethod(`${url}/${productId}`, token)
//             .then(response => {
//                 debugger
//                 // alert(response)
//                 resolve(response)
//                 // resolve(response.data.Data)
//             }).catch(err => {
//                 reject(err)
//             })
//     })
// }
// export const AddComplianceInfo = (data, token) => {
//     return new Promise((resolve, reject) => {
//         let url = Api.IMAGE_UPLOAD,
//             // data=`Email=${userName}&Password=${passWord}&ConfirmPassword=${confirmPassword}`,
//             headers = {};
//         apiPostMethod(url, data, token).then(res => {
//             resolve(res.data)
//         }).catch(err => {
//             reject(err)
//         })
//     })
// }
// export const ConfirmOrder = (token, data) => {
//     return new Promise((resolve, reject) => {

//         console.log(JSON.stringify(token))
//         let url = Api.PRODUCT_ORDER,
//             headers = {};
//         apiPostMethod(url, data, token)
//             .then(response => {
//                 debugger
//                 // alert(response)
//                 resolve(response)
//                 // resolve(response.data.Data)
//             }).catch(err => {
//                 reject(err)
//             })
//     })
// }
// export const GetOrder = (token) => {
//     return new Promise((resolve, reject) => {

//         console.log(JSON.stringify(token))
//         let url = Api.GET_ORDER,
//             headers = {};
//         // if (token) {
//         //     // headers = { authorization: `${'Bearer ' + token}` }
//         //     headers = { authorization: token }
//         // }
//         apiGetMethod(url, token)
//             .then(response => {
//                 debugger
//                 // alert(response)
//                 resolve(response)
//                 // resolve(response.data.Data)
//             }).catch(err => {
//                 reject(err)
//             })
//     })
// }
export const GetProduction = (token) => {
  return new Promise((resolve, reject) => {
    console.log(JSON.stringify(token));
    let url = Api.GET_PRODUCTION;
    apiGetMethod(url, token)
      .then((response) => {
        // debugger;
        // alert(response)
        resolve(response);
        // resolve(response.data.Data)
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const GetProductionDetails = (productionId, token) => {
  return new Promise((resolve, reject) => {
    console.log(JSON.stringify(token));
    let url = Api.GET_PRODUCTION;
    apiGetMethod(`${url}/${productionId}`, token)
      .then((response) => {
        // debugger;
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const GetUserProduction = (userId, token) => {
  return new Promise((resolve, reject) => {
    let url = Api.GET_PRODUCTION;
    apiGetMethod(`${url}/?userId=${userId}`, token)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
// export const GetCount = (token) => {
//     return new Promise((resolve, reject) => {

//         console.log(JSON.stringify(token))
//         let url = Api.GET_COUNT,
//             headers = {};
//         apiGetMethod(url, token)
//             .then(response => {
//                 debugger
//                 resolve(response)
//             }).catch(err => {
//                 reject(err)
//             })
//     })
// }
export const UpdateStatus = (data, token) => {
  return new Promise((resolve, reject) => {
    let url = Api.UPDATE_PRODUCTION,
      headers = {};
    apiPutMethod(url, data, token)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const UpdateDelayStatus = (data, token) => {
  return new Promise((resolve, reject) => {
    let url = Api.UPDATE_DELAY,
      headers = {};
    apiPostMethod(url, data, token)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
