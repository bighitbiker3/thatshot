import React from 'react'
import UserPage from '../UserPage/presenter'

export default class ArtistPage extends React.Component {
  constructor (props) {
    super(props)
    this.getArtistTracks = this.props.getArtistTracks.bind(this)
  }

  componentDidMount () {
    this.getArtistTracks(this.props.routeParams.artistName)
  }

  render () {
    return (
      <UserPage name={this.props.routeParams.artistName}
                oneColumn={true}
                postedTracks={this.props.artist.artistTracks}
                upvotedTracks={[]}>
      </UserPage>
    )
  }
}
