import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Login from './presenter'

function mapStateToProps(state, props){
  const login = state.login;
  return {
    login
  }
}

function mapDispatchToProps(dispatch){
  return {
    loginEmailFormChange: bindActionCreators(actions.loginEmailFormChange, dispatch),
    loginPasswordFormChange: bindActionCreators(actions.loginPasswordFormChange, dispatch),
    loginSubmit: bindActionCreators(actions.loginSubmit, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
