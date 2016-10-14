import React from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router'

export default (props) => {
  return (
    <div className="user-settings">
      <Link to='/me'><FontAwesome onClick={props.toggleSettings} className="settings-cog" name='cog' size='2x' /></Link>
      <h1>Settings</h1>
      <h3 onClick={props.soundCloudAuth}>Connect with SoundCloud <FontAwesome className="settings-soundcloud-fa" name='soundcloud' size='2x' /></h3>
    </div>
  )
}
