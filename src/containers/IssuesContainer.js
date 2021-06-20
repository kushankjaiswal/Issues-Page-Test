/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

class IssuesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: this.props.fetchIssuesReducer.data ? false : true,
      issues: this.props.fetchIssuesReducer.data,
      error: this.props.fetchIssuesReducer.data ? false : true
    }
    this.props.fetchGitIssues();

    console.log(this.props.fetchIssuesReducer)
  }

  componentDidMount() {
    this.props.fetchGitIssues();
  }

  componentDidUpdate(prevProps) {
    if (this.props.fetchIssuesReducer?.data && prevProps.fetchIssuesReducer !== this.props.fetchIssuesReducer) {
      this.setState({ issues: this.props.fetchIssuesReducer.data });
      console.log('inDidUpdate', this.props.fetchIssuesReducer.data)
    }
  }

  render() {
    const { fetching, issues, error } = this.state;

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
}

const mapStateToProps = (state) => {
  return {
    fetchIssuesReducer: state.fetchIssuesReducer
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchGitIssues: fetchGitIssuesAction
  }, dispatch)
};

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

export default connect(mapStateToProps, mapDispatchToProps)(IssuesContainer);