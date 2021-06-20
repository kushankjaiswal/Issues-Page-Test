/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRepoInfoAction } from '../redux/actions/fetchRepoInfoAction';
import Header from '../components/header/Header';
import LoaderComponent from '../components/commons/LoaderComponent';
import SomethingWentWrong from '../components/commons/SomethingWentWrong';


class HeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: this.props.fetchRepoInfoReducer.data ? false : true,
      repoInfo: this.props.fetchRepoInfoReducer.data,
      error: this.props.fetchRepoInfoReducer.data ? false : true
    };
    this.props.fetchRepoInfo();

    console.log(this.props.fetchRepoInfoReducer.data)
  }

  componentDidMount() {
    this.props.fetchRepoInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.fetchRepoInfoReducer?.data && prevProps.fetchRepoInfoReducer !== this.props.fetchRepoInfoReducer) {
      this.setState({ repoInfo: this.props.fetchRepoInfoReducer.data });

      console.log('in Did update', this.props.fetchRepoInfoReducer.data);
    }
  }

  render() {
    const { fetching, repoInfo, error } = this.state;

    return (
      <div>
        {fetching
          ? <LoaderComponent />
          : error ? <SomethingWentWrong />
            : !!repoInfo && Object.keys(repoInfo).length > 0
            && <Header {...repoInfo} />
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
    fetchRepoInfo: fetchRepoInfoAction
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