import {
    FETCH_REPOINFO_FAILURE,
    FETCH_REPOINFO_SUCCESS,
} from '../../constants/constants';
import { fetchRepoInfo } from '../../api/fetchRepoInfo';


export function fetchRepoInfoAction() {
    return dispatch => {
        fetchRepoInfo()
            .then(data => {
                dispatch(fetchRepoInfoSuccess(data));
            })
            .catch(error => {
                dispatch(fetchRepoInfoFailure({ error: true, message: 'Something Went Wrong' }));
            });
    };
}


export function fetchRepoInfoSuccess(repoInfo) {
    return {
        type: FETCH_REPOINFO_SUCCESS,
        payload: repoInfo,
    };
}


export function fetchRepoInfoFailure(error) {
    return {
        type: FETCH_REPOINFO_FAILURE,
        payload: error,
    };
}