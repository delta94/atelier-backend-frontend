import { IS_LOADING } from '../Action/ActionTypes';

const INITIAL_STATE = {
    isLoading: false
}

export default function loading(state = {
    isLoading: false

}
    , action) {

    // alert(action.type)
    switch (action.type) {
        case IS_LOADING: {
            return (state, action.payload)
        }
        default: {
            return state
        }
    }
}