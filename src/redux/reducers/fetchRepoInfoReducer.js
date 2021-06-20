import {
    FETCH_REPOINFO_FAILURE,
    FETCH_REPOINFO_REQUEST,
    FETCH_REPOINFO_SUCCESS,
} from '../../constants/constants';

const initialState = {}

const fetchRepoInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REPOINFO_SUCCESS:
            return action.payload;
        case FETCH_REPOINFO_FAILURE:
            return action.payload;
        default:
            return state
    }
}

export default fetchRepoInfoReducer;