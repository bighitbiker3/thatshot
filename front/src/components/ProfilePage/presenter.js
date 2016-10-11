import React from 'react'
import Track from '../Track'

export default class ProfilePage extends React.Component {
  constructor(props){
    super(props)
  }

  componentWillMount () {
    this.props.setProfilePageTracks(this.props.route.pathname.slice(1))
  }

  render () {
    return (
      <profile-page>
        <h1 className="username">{this.props.route.pathname.slice(1)}</h1>
        <h3 className="upvotes-title">Upvotes</h3>
        <h3 className="posted-title">Submissions</h3>
        <div className='upvoted-tracks'>
          {this.props.profilePage.profileTracks.upvoted.map((track, i) => <Track className='track' key={i} track={track} />)}
        </div>
        <div className='posted-tracks'>
          {this.props.profilePage.profileTracks.posted.map((track, i) => <Track className='track' key={i} track={track} />)}
        </div>
      </profile-page>
    )
  }
}
