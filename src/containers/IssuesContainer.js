/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fetchGitIssuesAction } from '../redux/actions/fetchIssuesAction';
import Issue from '../components/issues-table/Issue';
import LoaderComponent from '../components/commons/LoaderComponent';
import SomethingWentWrong from '../components/commons/SomethingWentWrong';

const IssuesContainerWrapper = styled.div`
   border :  1px solid #e1e4e8;
   border-collapse : collapse;
`;

function IssuesContainer() {
  const [issues, setIssues] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const dispatch = useDispatch();

  const fetchIssuesReducer = useSelector(state => state.fetchIssuesReducer);

  useEffect(() => {
    dispatch(fetchGitIssuesAction(pageNumber))
  }, [pageNumber])

  useEffect(() => {
    if (fetchIssuesReducer) {
      setIssues(fetchIssuesReducer);
      setFetching(false)
    }

    if (fetchIssuesReducer?.error) {
      setError(true);
      setFetching(false);
    }
  }, [fetchIssuesReducer])

  window.onscroll = function () {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      scrollToEnd()
    }
  }

  const scrollToEnd = () => {
    setPageNumber(pageNumber + 1)
  }

  return (
    <div>
      {fetching ? (
        <LoaderComponent />
      ) : (error ? <SomethingWentWrong />
        : (
          <IssuesContainerWrapper>
            {!!issues
              && issues.map(issue => <Issue key={issue.id} issue={issue} />)
            }
          </IssuesContainerWrapper>
        )
      )}
    </div>
  );
}

IssuesContainer.propTypes = {
  requestIssues: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.string,
  issues: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

IssuesContainer.defaultProps = {
  error: null,
};

export default IssuesContainer;