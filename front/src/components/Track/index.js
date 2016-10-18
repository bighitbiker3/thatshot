import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Track from './presenter'

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
    likeOnSoundCloud: bindActionCreators(actions.likeOnSoundCloud, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Track)
