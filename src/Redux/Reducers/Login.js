import {SAVE_LOGIN_USERINFO, UPDATE_USERINFO, ACCESS_TOKEN} from '../Action/ActionTypes';

    const INITIAL_STATE ={
        updatedUserInfo:{},
        loginUserInfo:{},
        token: {}
    }

    export default function login(state = {
        updatedUserInfo:{},
        loginUserInfo:{},
        token: {}

    }
, action) {
    
//   alert(action.type )
        switch (action.type) {
            case SAVE_LOGIN_USERINFO: {
                return Object.assign({}, state, { loginUserInfo: action.payload })
            }
            case UPDATE_USERINFO: {
                return Object.assign({}, state, { userInfo: action.payload })
            }
            case ACCESS_TOKEN: {
                return Object.assign({}, state, { token: action.payload })
                // return (state, { access_token: action.payload })
            }
            default: {
                return state
            }
        }
    }