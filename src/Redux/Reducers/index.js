import { combineReducers } from 'redux';

// importing reducers
import login from './Login'
import loading from './loading'

const appReducer = combineReducers({
  login,
  loading
});


const rootReducer = (state, action) => {
  // if (action.type === 'USER_LOGOUT') {
  //   state = undefined
  // }

  return appReducer(state, action)
}

export default rootReducer;