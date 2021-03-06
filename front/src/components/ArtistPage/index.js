import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Stream from '../Stream'

import { clearTracks } from '../../actions/track'
import { getTracks } from '../../selectors'

class ArtistPage extends React.Component {
  componentDidMount () {
    const { artistName } = this.props.routeParams
    this.props.setArtistTracks(artistName)
  }

  componentWillUnmount () {
    this.props.clearTracks()
  }

  render () {
    const { songName } = this.props.routeParams
    let { tracks } = this.props
    if (songName) {
      tracks = tracks.filter(track => track.title === songName)
    }
    return (
        <Stream
          tracks={tracks}
          title={this.props.routeParams.artistName}
        />
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const routeParams = ownProps.routeParams
  return {
    routeParams,
    tracks: getTracks(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setArtistTracks: (artist) => dispatch(actions.setArtistPageTracks(artist)),
    clearTracks: () => dispatch(clearTracks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage)
