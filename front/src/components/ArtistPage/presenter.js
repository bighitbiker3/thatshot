import React from 'react'
import Stream from '../Stream/presenter'

export default class ArtistPage extends React.Component {
  componentDidMount () {
    const { artistName } = this.props.routeParams
    this.props.setArtistTracks(artistName)
  }

  render () {
    const { songName } = this.props.routeParams
    let tracks = this.props.artist.artistTracks
    if (songName) {
      tracks = this.props.artist.artistTracks.filter(track => track.title === songName)
    }
    return (
        <Stream
          tracks={tracks}
          title={this.props.routeParams.artistName}
        />
    )
  }
}
