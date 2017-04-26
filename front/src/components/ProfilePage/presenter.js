import React from 'react'
import Stream from '../Stream/presenter'

export default class ProfilePage extends React.Component {
  componentDidMount () {
    this.fetchData(this.props.user.id)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.user.id && !this.props.tracks.length) this.fetchData(nextProps.user.id)
  }

  // Helpers
  fetchData (id) {
    if (this.props.route.pathname === 'me' && id) this.props.setProfilePageTracks(id)
    else if (id) this.props.setProfilePageTracks(this.props.routeParams.user)
  }

  render () {
    return (
      <Stream
        tracks={this.props.tracks}
        title={this.props.route.pathname === 'me' ? 'You :)' : this.props.routeParams.user}
      />
    )
  }
}
