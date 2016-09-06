import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Header from './presenter'

function mapStateToProps(state, props){
  const header = state.header;
  const auth = state.auth;
  return {
    header,
    auth
  }
}

export default connect(mapStateToProps)(Header)
