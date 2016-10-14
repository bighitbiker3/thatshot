import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import ProfilePage from './presenter'

function mapStateToProps (state, props) {
  const route = state.routing.locationBeforeTransitions
  const routeParams = props.routeParams
  const { profilePage } = state;
  const { user } = state.auth
  return {
    profilePage,
    user,
    route,
    routeParams
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setProfilePageTracks: bindActionCreators(actions.setProfilePageTracks, dispatch),
    removeProfileTracks: bindActionCreators(actions.removeProfileTracks, dispatch),
    toggleSettings: bindActionCreators(actions.toggleSettings, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
