import { SAVE_LOGIN_USERINFO, UPDATE_USERINFO, ACCESS_TOKEN } from './ActionTypes';

export const saveLoginUserInfo = (loginUserInfo) => {
    return (dispatch) => {
        dispatch({
            type: SAVE_LOGIN_USERINFO, payload: loginUserInfo
        })
    }
}
export const updateUserInfo = (userInfo) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_USERINFO, payload: userInfo
        })
    }
}

export const saveToken = (token) => {
    return (dispatch) => {
        dispatch({
            type: ACCESS_TOKEN, payload: token
        })
    }
}