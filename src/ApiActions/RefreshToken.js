import axios from 'axios';
//API URLS
import { apiPostMethod } from './DbConfig/ApiPostMethod';
import Api from './DbConfig/ApiActions'
import {apiCommonParams} from './DbConfig/ApiBaseUrl'

export const refreshToken = (token) => {
    return new Promise((resolve, reject) => {
        let data = {
            client_id : apiCommonParams.CLIENT_ID,
            client_secret : apiCommonParams.CLIENT_SECRET,
            refresh_token : token,
            grant_type: apiCommonParams.GRANT_TYPE_REFRESH_TOKEN
        },
        headers = '';

        apiPostMethod(Api.REFRESHTOKEN,data, headers).then((response) => {
            response.data.Success ? resolve(response.data) : reject(response.data)
        }).catch((error) => {
            reject(error)
        });
    })
}