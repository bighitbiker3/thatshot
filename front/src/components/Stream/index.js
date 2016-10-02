import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Stream from './presenter'

function mapStateToProps (state) {
  const { user } = state.auth
  const tracks = state.track
  const stream = state.stream.show
  return {
    user,
    tracks,
    stream
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setSavantTracks: bindActionCreators(actions.setSavantTracks, dispatch),
    setUserTracks: bindActionCreators(actions.setUserTracks, dispatch),
    showUserTracks: bindActionCreators(actions.showUserTracks, dispatch),
    showSavantTracks: bindActionCreators(actions.showSavantTracks, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream)
