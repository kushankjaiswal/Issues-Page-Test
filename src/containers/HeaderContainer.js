/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRepoInfoAction } from '../redux/actions/fetchRepoInfoAction';
import { counterAction } from '../redux/actions/counterAction';
import Header from '../components/header/Header';
import LoaderComponent from '../components/commons/LoaderComponent';
import SomethingWentWrong from '../components/commons/SomethingWentWrong';

function HeaderContainer() {
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);
  const [repoInfo, setRepoInfo] = useState({});

  const dispatch = useDispatch();

  const fetchRepoInfoReducer = useSelector(state => state.fetchRepoInfoReducer);

  useEffect(() => {
    dispatch(fetchRepoInfoAction())
  }, []);

  useEffect(() =>{
    if (fetchRepoInfoReducer?.data) {
      setRepoInfo(fetchRepoInfoReducer.data)
      setFetching(false)
    }

    if (fetchRepoInfoReducer?.error) {
      setError(true);
      setFetching(false);
    }
  }, [fetchRepoInfoReducer]);

  const handleChange = (tag, operation) => {
    const cloneRepoInfo = JSON.parse(JSON.stringify(fetchRepoInfoReducer));
    let { subscribers_count, stargazers_count, forks_count } = cloneRepoInfo.data;

      switch (tag) {
        case 'Star':
          operation === 'increment' ? stargazers_count++ : stargazers_count--;
          cloneRepoInfo.data.stargazers_count = stargazers_count;
          break;
        case 'Watch':
          operation === 'increment' ? subscribers_count++ : subscribers_count--;
          cloneRepoInfo.data.subscribers_count = subscribers_count;
          break;
        case 'Fork':
          operation === 'increment' ? forks_count++ : forks_count--;
          cloneRepoInfo.data.forks_count = forks_count;
          break;
        default:
          return cloneRepoInfo.data
      }

    dispatch(counterAction(cloneRepoInfo));
  };

  return (
    <div>
      {fetching
        ? <LoaderComponent />
        : error ? <SomethingWentWrong />
          : !!repoInfo && Object.keys(repoInfo).length > 0
          && <Header
            repoInfo={repoInfo}
            handleChange={handleChange}
          />
      }
    </div>
  );
}

HeaderContainer.propTypes = {
  requestRepoInfo: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

HeaderContainer.defaultProps = {
  error: null,
};

export default HeaderContainer;