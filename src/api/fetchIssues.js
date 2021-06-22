import axios from 'axios';
import { GIT_ISSUE_ENDPOINT } from './constants';

export function fetchIssues(pageNumber) {
  return axios({
    method: 'get',
    url: GIT_ISSUE_ENDPOINT,
    params: {
      per_page: 10,
      page: pageNumber
    }
  });
}
