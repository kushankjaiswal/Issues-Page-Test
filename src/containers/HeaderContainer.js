/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRepoInfoAction } from '../redux/actions/fetchRepoInfoAction';
import { counterAction } from '../redux/actions/counterAction';
import Header from '../components/header/Header';
import LoaderComponent from '../components/commons/LoaderComponent';
import SomethingWentWrong from '../components/commons/SomethingWentWrong';

class HeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      repoInfo: {},
      error: false
    };
  }

  componentDidMount() {
    this.props.fetchRepoInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.fetchRepoInfoReducer?.data && JSON.stringify(prevProps.fetchRepoInfoReducer) !== JSON.stringify(this.props.fetchRepoInfoReducer)) {
      this.setState({
        repoInfo: this.props.fetchRepoInfoReducer.data,
        fetching: false
      });
    }

    if (this.props.fetchRepoInfoReducer?.error && JSON.stringify(prevProps.fetchRepoInfoReducer) !== JSON.stringify(this.props.fetchRepoInfoReducer)) {
      this.setState({
        error: true,
        fetching: false
      });
    }
  }

  handleChange = (tag, operation) => {
    const cloneRepoInfo = JSON.parse(JSON.stringify(this.props.fetchRepoInfoReducer));
    let { subscribers_count, stargazers_count, forks_count } = cloneRepoInfo.data;

    if (operation === 'increment') {
      switch (tag) {
        case 'Star':
          stargazers_count++
          cloneRepoInfo.data.stargazers_count = stargazers_count;
          break;
        case 'Watch':
          subscribers_count++
          cloneRepoInfo.data.subscribers_count = subscribers_count;
          break;
        case 'Fork':
          forks_count++
          cloneRepoInfo.data.forks_count = forks_count;
          break;
        default:
          return cloneRepoInfo.data
      }
    } else {
      switch (tag) {
        case 'Star':
          stargazers_count--
          cloneRepoInfo.data.stargazers_count = stargazers_count;
          break;
        case 'Watch':
          subscribers_count--
          cloneRepoInfo.data.subscribers_count = subscribers_count;
          break;
        case 'Fork':
          forks_count--
          cloneRepoInfo.data.forks_count = forks_count;
          break;
        default:
          return cloneRepoInfo.data
      }
    }

    this.props.counterAction(cloneRepoInfo);
  }

  render() {
    const { fetching, repoInfo, error } = this.state;

    return (
      <div>
        {fetching
          ? <LoaderComponent />
          : error ? <SomethingWentWrong />
            : !!repoInfo && Object.keys(repoInfo).length > 0
            && <Header
              // {...repoInfo}
              repoInfo={repoInfo}
              handleChange={this.handleChange}
            />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetchRepoInfoReducer: state.fetchRepoInfoReducer
  }
};


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchRepoInfo: fetchRepoInfoAction,
    counterAction: counterAction
  }, dispatch)
};

HeaderContainer.propTypes = {
  requestRepoInfo: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

HeaderContainer.defaultProps = {
  error: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);