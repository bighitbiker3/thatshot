import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import Stream from '../../Stream'


class SingleTrack extends Component {
  componentDidMount () {
    console.log('hi');
    const { artistName, songName } = this.props.routeParams
    this.props.setSingleTrack(artistName, songName)
  }

  render () {
    return (
      <Stream tracks={this.props.track}/>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  routeParams: ownProps.routeParams,
  track: state.artist.single
})

const mapDispatchToProps = {
  setSingleTrack: actions.setSingleTrack
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTrack)
