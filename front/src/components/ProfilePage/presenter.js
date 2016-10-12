import React from 'react'
import Track from '../Track'

export default class ProfilePage extends React.Component {
  constructor (props) {
    super(props)
  }

  fetchData(){
    if (this.props.route.pathname === '/me') this.props.setProfilePageTracks(this.props.user.id)
    else this.props.setProfilePageTracks(this.props.routeParams.user)
  }

  componentDidMount () {
    this.fetchData()
  }

  componentDidUpdate(prevProps){
    if(prevProps.route.pathname !== this.props.route.pathname) this.fetchData()
  }

  componentWillUnmount () {
    this.props.removeProfileTracks()
  }

  render () {
    return (
      <profile-page>
        <h1 className='username'>{this.props.route.pathname === '/me' ? 'You :)' : this.props.routeParams.user}</h1>
        {
          this.props.routeParams.user === 'The Savant' ?
          null
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
}
