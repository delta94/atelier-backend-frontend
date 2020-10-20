import {SAVE_LOGIN_USERINFO,UPDATE_USERINFO} from '../Action/ActionTypes';

    const INITIAL_STATE ={
        updatedUserInfo:{},
        loginUserInfo:{},
    }

    export default function login(state = {
        updatedUserInfo:{},
        loginUserInfo:{},

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
            default: {
                return state
            }
        }
    }