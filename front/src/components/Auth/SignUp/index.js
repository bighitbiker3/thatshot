import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import SignUp from './presenter'

function mapStateToProps (state, props) {
  const header = state.header
  return {
    header
  }
}

function mapDispatchToProps (dispatch) {
  return {
    signUpSubmit: bindActionCreators(actions.signUpSubmit, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
