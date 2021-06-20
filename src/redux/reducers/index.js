import { combineReducers } from 'redux';
import fetchRepoInfoReducer from './fetchRepoInfoReducer';
import fetchIssuesReducer from './fetchIssuesReducer';

export default combineReducers({
  fetchRepoInfoReducer: fetchRepoInfoReducer,
  fetchIssuesReducer: fetchIssuesReducer
});
