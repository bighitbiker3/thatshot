import React from 'react'
import { connect } from 'react-redux'
import { isEqual } from 'lodash'
import { clearTracks, getProfileTracks } from '../../actions/track'
import { getUser, getProfilePage, getTracks } from '../../selectors'

import Stream from '../Stream'

class ProfilePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      offset: 0,
      limit: 20
    }
    this.getMoreTracks = this.getMoreTracks.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }
  componentDidMount () {
    const { user } = this.props
    if (user && user.id) {
      this.props.getProfileTracks(user.id)
    }
  }

  handleScroll () {
    const winHeight = window.innerHeight
    const body = document.body
    const html = document.documentElement
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
    const value = document.body.scrollTop
    if (value + winHeight > docHeight * 0.75) this.getMoreTracks()
  }

  getMoreTracks () {
    const { user } = this.props
    const offset = this.state.offset + this.state.limit
    document.removeEventListener('scroll', this.handleScroll)
    this.props.getProfileTracks(user.id, this.state.limit, offset)
    this.setState({ offset })
  }

  componentWillReceiveProps (nextProps) {
    const { user } = this.props
    if (user.id !== nextProps.user.id) this.props.getProfileTracks(nextProps.user.id)
    if (!isEqual(nextProps.tracks, this.props.tracks)) document.addEventListener('scroll', this.handleScroll)
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
    getProfileTracks: (id, limit, offset) => dispatch(getProfileTracks(id, limit, offset)),
    clearTracks: () => dispatch(clearTracks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
