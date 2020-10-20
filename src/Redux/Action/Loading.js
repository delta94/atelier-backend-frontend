import { IS_LOADING } from './ActionTypes';

export const showHideLoding = (isLoading) => {
    return (dispatch) => {
        dispatch({
            type: IS_LOADING, payload: isLoading
        })
    }
}