import {
	SAVE_LOGIN_USERINFO,
	UPDATE_USERINFO,
	SAVE_CUSTOMER_INFO
} from '../Action/ActionTypes';

const INITIAL_STATE = {
	updatedUserInfo: {},
	loginUserInfo: {},
	isCustomerLoaded: false,
}

export default function login(state = {
	updatedUserInfo: {},
	loginUserInfo: {},
	isCustomerLoaded: false,
}, action) {

	switch (action.type) {
		case SAVE_LOGIN_USERINFO: {
			return Object.assign({}, state, {
				loginUserInfo: action.payload
			})
		}
		case UPDATE_USERINFO: {
			return Object.assign({}, state, {
				userInfo: action.payload
			})
		}
		case SAVE_CUSTOMER_INFO: {
			return Object.assign({}, state, {
				isCustomerLoaded: action.payload
			})
		}
		default: {
			return state
		}
	}
}