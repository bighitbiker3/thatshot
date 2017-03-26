import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Track from './presenter'
import { reducer as notifReducer, actions as notifActions, Notifs } from 'redux-notifications'
const { notifSend } = notifActions

function mapStateToProps (state, props) {
  const track = props.track
  const auth = state.auth
  return {
    track,
    auth
  }
}

function mapDispatchToProps (dispatch) {
  return {
    toggleTrack: bindActionCreators(actions.toggleTrack, dispatch),
    likeOnSoundCloud: bindActionCreators(actions.likeOnSoundCloud, dispatch),
    copyNotification: () => dispatch(notifSend({message: 'Copied Link :)', kind: 'success', dismissAfter: 3000}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Track)
