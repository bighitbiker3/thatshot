import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import * as actions from '../../actions';
import Overlay from './presenter'

function mapStateToProps (state, props) {
  const header = state.header
  return {
    header
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // showSignUp: bindActionCreators(actions.showSignUp, dispatch),
    // showLogin: bindActionCreators(actions.showLogin, dispatch),
    // showSubmission: bindActionCreators(actions.showSubmission, dispatch),
    // closeHeader: bindActionCreators(actions.closeHeader, dispatch),
    // getSession: bindActionCreators(actions.getSession, dispatch),
    // logout: bindActionCreators(actions.logout, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overlay)
