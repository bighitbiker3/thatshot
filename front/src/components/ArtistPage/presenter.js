import React from 'react'
import Stream from '../Stream/presenter'

export default class ArtistPage extends React.Component {
  componentDidMount () {
    this.props.getArtistTracks(this.props.routeParams.artistName)
  }

  render () {
    return (
        <Stream
          tracks={this.props.artist.artistTracks}
          title={this.props.routeParams.artistName}
        />
    )
  }
}
