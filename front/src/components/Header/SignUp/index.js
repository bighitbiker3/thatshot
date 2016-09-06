import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import SignUp from './presenter'

function mapStateToProps(state, props){
  const signup = state.signup;
  return {
    signup
  }
}

function mapDispatchToProps(dispatch){
  return {
    signUpEmailFormChange: bindActionCreators(actions.signUpEmailFormChange, dispatch),
    signUpPasswordFormChange: bindActionCreators(actions.signUpPasswordFormChange, dispatch),
    signUpSubmit: bindActionCreators(actions.signUpSubmit, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
