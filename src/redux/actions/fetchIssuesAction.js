import {
    FETCH_ISSUES_FAILURE,
    FETCH_ISSUES_SUCCESS
} from '../../constants/constants';
import { fetchIssues } from '../../api/fetchIssues';

export function fetchGitIssuesAction(pageNumber) {
    return dispatch => {
        fetchIssues(pageNumber)
            .then(data => {
                dispatch(fetchGitIssuesSuccess(data));
            })
            .catch(error => {
                dispatch(fetchGitIssuesFailure({ error: true, message: 'Something Went Wrong' }));
            });
    }
}


export function fetchGitIssuesSuccess(issues) {
    return {
        type: FETCH_ISSUES_SUCCESS,
        payload: issues,
    };
}


export function fetchGitIssuesFailure(error) {
    return {
        type: FETCH_ISSUES_FAILURE,
        payload: error,
    };
}