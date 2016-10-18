import React from 'react'
import Track from '../Track'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router'

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

  render () {
    return (
      <profile-page>
       {/* {this.props.route.pathname === '/me' ? <Link to='/me/settings'> <FontAwesome onClick={this.toggleSettings} className="settings-cog" name='cog' size='2x' /> </Link> : null} */}
        <h1 className='username'>{this.props.route.pathname === '/me' ? 'You :)' : this.props.routeParams.user}</h1>
        {this.props.children}
        {
          this.props.routeParams.user === 'The Savant'
          ? null
          : <div>
              <h3 className='upvotes-title'>Upvotes</h3>
              <h3 className='posted-title'>Submissions</h3>
            </div>
        }
        <div className='upvoted-tracks'>
          {this.props.profilePage.profileTracks.upvoted.map((track, i) => <Track className='track' key={i} track={track} />)}
        </div>
        <div className={this.props.routeParams.user === 'The Savant' ? null : 'posted-tracks'}>
          {this.props.profilePage.profileTracks.posted.map((track, i) => <Track className='track' key={i} track={track} />)}
        </div>
      </profile-page>
    )
  }

    // Helpers
  fetchData () {
    if (this.props.route.pathname === '/me' && this.props.user.id) this.props.setProfilePageTracks(this.props.user.id)
    else this.props.setProfilePageTracks(this.props.routeParams.user)
  }

}
