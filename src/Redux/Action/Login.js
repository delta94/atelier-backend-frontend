import { SAVE_LOGIN_USERINFO, UPDATE_USERINFO } from './ActionTypes';

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