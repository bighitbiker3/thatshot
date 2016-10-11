import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import ProfilePage from './presenter'

function mapStateToProps (state) {
  const route = state.routing.locationBeforeTransitions
  const { profilePage } = state;
  const { user } = state.auth
  return {
    profilePage,
    user,
    route
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setProfilePageTracks: bindActionCreators(actions.setProfilePageTracks, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
