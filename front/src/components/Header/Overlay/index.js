import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import io from 'socket.io-client'
let socket = io(window.location.origin)
import Loader from '../../Loader'
import { SERVER_LOCATION, API_LOCATION } from '../../../constants/server'
import { trackSetSavant, closeHeader, openHeader, initSoundCloud } from '../../../actions'

class Overlay extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      savants: false,
      songs: false,
      soundcloudData: false,
      needEmail: false,
      email: null,
      error: null
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this)
    this.getAllTheThings = this.getAllTheThings.bind(this)
  }

  handleEmailChange (e) {
    this.setState({ email: e.target.value })
  }

  handleEmailSubmit (e) {
    e.preventDefault()
    console.log(this.props.auth.user);
    const { id, soundcloud_id } = this.props.auth.user // eslint-disable-line camelcase
    const { email } = this.state

    axios.post(`${API_LOCATION}/users/${id}/email`, { email })
    .then(() => {
      this.setState({ needEmail: false, savants: true })
      this.getAllTheThings(soundcloud_id, id) // eslint-disable-line camelcase
    })
    .catch(err => console.log('email err', err))
  }

  getAllTheThings (soundcloud_id, id) { // eslint-disable-line camelcase
    axios.post(`${API_LOCATION}/users/${soundcloud_id}/savants`) // eslint-disable-line camelcase
    
    socket.on('doneGettingSavants', () => {
      console.log('dont getting savants')
      this.setState({savants: false, songs: true})
      return axios.post(`${API_LOCATION}/songs/${id}/savantTracks`)
    })

    socket.on('doneCreateSavantTracks', () => {
      axios.get(`${API_LOCATION}/songs/${id}/savantTracks`)
      .then(res => res.data)
      .then(songs => {
        this.setState({songs: false, soundcloudData: true})
        this.props.trackSetSavant(songs)
        return this.props.initSoundCloud()
      })
      .then(() => {
        this.props.closeHeader()
      })
    })
    socket.on('error', (err) => {
      this.setState({ error: err })
    })
  }

  componentDidUpdate (prevProps, prevState) {
    const { created } = this.props.auth.user

    if (!prevProps.auth.user.created && created) {
      this.props.openHeader()
      this.setState({ needEmail: true })
    }
  }

  getUI () {
    const { user } = this.props.auth
    const { savants, songs, soundcloudData, needEmail, error } = this.state
    if (error) {
      return (
        <div>
          <h2>An unexpected error occurred. Please try again</h2>
          <h4>{error}</h4>
        </div>
      )
    }
    if (!user.created) {
      return (
        <div>
          <h2>We're here to help you find the best tunes from smaller artists.</h2>
          <h2>We'll need to take a look at your SoundCloud to see what kind of music you like.</h2>
          <p><a href={`${SERVER_LOCATION}/login/soundcloud`}><span>Sign Up/Login</span></a></p>
        </div>
      )
    }
    if (user.created) {
      if (needEmail) {
        return (
          <div className='header-input'>
            <form onSubmit={this.handleEmailSubmit}>
              <h1>What's your email address?</h1>
              <input type="email" placeholder='ilove@new.music' onChange={this.handleEmailChange}/>
              <button type='submit'>:)</button>
            </form>
          </div>
        )
      }
      if (savants) {
        return (
          <div>
            <h1>We're checking which artists you like</h1>
            <Loader style={{position: 'relative', marginTop: '10px', border: '.5em solid #FFF'}} />
          </div>
        )
      }
      if (songs) {
        return (
          <div>
            <h1>Finding songs you might like</h1>
            <h1>This could take a couple minutes</h1>
            <h1>Please don't refresh the page</h1>
            <Loader style={{position: 'relative', marginTop: '10px', border: '.5em solid #FFF'}} />
          </div>
        )
      }
      if (soundcloudData) {
        return (
          <div>
            <h1>Grabbing some SoundCloud data to fine-tune the selection</h1>
            <Loader style={{position: 'relative', marginTop: '10px', border: '.5em solid #FFF'}} />
          </div>
        )
      }
    }
  }
  render () {
    return (
        <div className={this.props.header.active ? 'header-overlay-on' : 'header-overlay-off'}>
          <div className='header-intro-message'>
            {this.getUI()}
          </div>
        </div>
    )
  }
}

function mapStateToProps (state, props) {
  const { header, auth } = state
  return {
    header,
    auth
  }
}

const mapDispatchToProps = (dispatch) => ({
  trackSetSavant: (tracks) => dispatch(trackSetSavant(tracks)),
  closeHeader: () => dispatch(closeHeader()),
  openHeader: () => dispatch(openHeader()),
  initSoundCloud: () => dispatch(initSoundCloud())
})

export default connect(mapStateToProps, mapDispatchToProps)(Overlay)
