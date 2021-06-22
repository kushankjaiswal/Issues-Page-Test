import { FETCH_REPOINFO_SUCCESS } from '../../constants/constants';

export function counterAction(data) {
    return dispatch => {
        dispatch({
            type: FETCH_REPOINFO_SUCCESS,
            payload: data
        })
    }
};
