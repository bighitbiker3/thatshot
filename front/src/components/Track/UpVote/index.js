import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import UpVote from './presenter'

function mapStateToProps (state, props) {
  const track = props.track
  const user = state.auth.user
  return {
    track,
    user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upVoteTrack: bindActionCreators(actions.upVoteTrack, dispatch),
    mouseEnterUpvote: bindActionCreators(actions.mouseEnterUpvote, dispatch),
    mouseLeaveUpvote: bindActionCreators(actions.mouseLeaveUpvote, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpVote)
