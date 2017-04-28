import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Stream from '../Stream'
import { getSavantTracks } from '../../actions/auth'
import { clearTracks } from '../../actions/track'
import { getTracks, getUser } from '../../selectors'

class Home extends Component {
  componentDidMount () {
    const { user } = this.props
    this.props.getSavantTracks(user.id)
  }

  componentWillUnmount () {
    this.props.clearTracks()
  }

  render () {
    return <Stream tracks={this.props.tracks} />
  }
}

Home.propTypes = {
  tracks: PropTypes.array
}

Home.defaultProps = {
  tracks: []
}

const mapStateToProps = state => {
  return {
    tracks: getTracks(state),
    user: getUser(state)
  }
}

const mapDispatchToProps = dispatch => ({
  getSavantTracks: (id) => dispatch(getSavantTracks(id)),
  clearTracks: () => dispatch(clearTracks())
})


export default connect(mapStateToProps, mapDispatchToProps)(Home)
