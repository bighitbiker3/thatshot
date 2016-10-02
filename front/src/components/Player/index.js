import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Player from './presenter'

function mapStateToProps (state, props) {
  const player = state.player
  return {
    player
  }
}

function mapDispatchToProps (dispatch) {
  return {
    toggleTrack: bindActionCreators(actions.toggleTrack, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
