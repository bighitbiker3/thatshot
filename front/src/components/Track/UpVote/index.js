import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import UpVote from './presenter';

function mapStateToProps(state, props){
  const trackId = props.trackId;
  const user = state.auth.user
  return {
    trackId,
    user
  }
}

function mapDispatchToProps(dispatch){
  return {
    upVoteTrack: bindActionCreators(actions.upVoteTrack, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpVote)
