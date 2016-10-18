import React from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router'

export default class Settings extends React.Component {
  constructor (props) {
    super(props)
    this.soundCloudAuth = this.props.soundCloudAuth.bind(this)
    this.toggleSettings = this.props.toggleSettings.bind(this)
  }

  componentWillUnmount () {
    this.toggleSettings()
  }

  render () {
    return (
      <div className="user-settings">
        <Link to='/me'><FontAwesome className="settings-cog" name='cog' size='2x' /></Link>
        <h1>Settings</h1>
        <div className="settings-soundcloud">
          <h3 onClick={this.props.auth.soundcloud ? null : this.soundCloudAuth}> {this.props.auth.soundcloud ? 'Connected To SoundCloud' : 'Connect With SoundCloud'}</h3>   
          <FontAwesome className="settings-soundcloud-fa" name='soundcloud' size='2x' />
        </div>
      </div>
    )
  }
}

