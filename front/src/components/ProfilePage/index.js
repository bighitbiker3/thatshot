import React from 'react'
import { connect } from 'react-redux'
import { clearTracks, getProfileTracks } from '../../actions/track'
import { getUser, getProfilePage, getTracks } from '../../selectors'

import Stream from '../Stream'

class ProfilePage extends React.Component {
  componentDidMount () {
    const { user } = this.props
    if (user && user.id) {
      this.props.getProfileTracks(user.id)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { user } = this.props
    console.log(nextProps.user.id);
    if (user.id !== nextProps.user.id) this.props.getProfileTracks(nextProps.user.id)
  }
  

  componentWillUnmount () {
    this.props.clearTracks()
  }

  render () {
    return (
      <Stream
        tracks={this.props.tracks}
        title='Your Tracks'
      />
    )
  }
}

function mapStateToProps (state, props) {
  return {
    profilePage: getProfilePage(state),
    user: getUser(state),
    tracks: getTracks(state)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getProfileTracks: (id) => dispatch(getProfileTracks(id)),
    clearTracks: () => dispatch(clearTracks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
