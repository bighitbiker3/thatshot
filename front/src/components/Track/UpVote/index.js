import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import UpVote from './presenter'

function mapStateToProps (state, props) {
  const track = props.track
  const user = state.auth.user
  const {activeTrack, nowPlaying} = state.player
  return {
    track,
    activeTrack,
    nowPlaying,
    user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    toggleTrack: bindActionCreators(actions.toggleTrack, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpVote)
