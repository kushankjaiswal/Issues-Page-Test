import {
    FETCH_ISSUES_FAILURE,
    FETCH_ISSUES_SUCCESS
} from '../../constants/constants';

const initialState = [];

const fetchIssuesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ISSUES_SUCCESS:
            return [...state, ...action.payload.data];
        case FETCH_ISSUES_FAILURE:
            return action.payload;
        default:
            return state
    }
}

export default fetchIssuesReducer;