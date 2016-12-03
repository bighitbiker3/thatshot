import React from 'react'
import Track from '../Track'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router'
import UserPage from '../UserPage/presenter'

export default class ProfilePage extends React.Component {
  constructor (props) {
    super(props)
    this.toggleSettings = this.props.toggleSettings.bind(this)
    this.removeProfileTracks = this.props.removeProfileTracks.bind(this)
  }

  componentDidMount () {
    this.fetchData()
  }

  componentDidUpdate (prevProps) {
    // Prevent reloading when going to settings page
    if (prevProps.route.pathname !== this.props.route.pathname &&
    this.props.route.pathname !== '/me/settings' &&
    (prevProps.route.pathname !== '/me/settings' || this.props.route.pathname !== '/me')) {
      this.removeProfileTracks()
      this.fetchData()
    }
  }

  componentWillUnmount () {
    this.removeProfileTracks()
  }
  
  // Helpers
  fetchData () {
    if (this.props.route.pathname === '/me' && this.props.user.id) this.props.setProfilePageTracks(this.props.user.id)
    else this.props.setProfilePageTracks(this.props.routeParams.user)
  }

  render () {
    // Add settings when Soundcloud gets URI updated
    {/* {this.props.route.pathname === '/me' ? <Link to='/me/settings'> <FontAwesome onClick={this.toggleSettings} className="settings-cog" name='cog' size='2x' /> </Link> : null}*/}
    return (
      <UserPage name={this.props.route.pathname === '/me' ? 'You :)' : this.props.routeParams.user}
                oneColumn={this.props.routeParams.user === 'The Savant' ? true : false}
                upvotedTracks={this.props.profilePage.profileTracks.upvoted}
                postedTracks={this.props.profilePage.profileTracks.posted}>
      </UserPage>
    )
  }
}
