import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Submission from './presenter'

function mapStateToProps(state, props){
  const submission = state.submission;
  const user = state.auth.user;
  return {
    submission,
    user
  }
}

function mapDispatchToProps(dispatch){
  return {
    submissionFormChange: bindActionCreators(actions.submissionFormChange, dispatch),
    submissionSubmit: bindActionCreators(actions.submissionSubmit, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Submission)
