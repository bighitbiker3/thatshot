import React from 'react'
import ReactDOM from 'react-dom'
import FontAwesome from 'react-fontawesome'
import { CLIENT_ID } from '../../constants/auth'
import Interval from 'react-interval'
import Slider from 'react-slider'
import keyBindings from '../../lib/keyBindings'

class Player extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      currentTime: 0,
      duration: 0,
      seekPosition: 0
    }
    this.durationInterval = null
    this.getNextTrack = this.getNextTrack.bind(this)
    this.onSliderClick = this.onSliderClick.bind(this)
  }

  componentDidMount () {
    keyBindings('space', this.props.toggleTrack)
    this.refs.player.onended = () => this.getNextTrack()
  }

  getNextTrack () {
    const { tracks } = this.props
    const { activeTrack } = this.props.player
    let nextTrack = tracks.indexOf(activeTrack) + 1
    if (nextTrack >= tracks.length) nextTrack = 0
    this.props.toggleTrack(tracks[nextTrack])
  }

  componentDidUpdate () {
    const audioElement = ReactDOM.findDOMNode(this.refs.player)

    if (!audioElement) return

    const { nowPlaying } = this.props.player

    nowPlaying ? audioElement.play() : audioElement.pause()
  }

  getProgressFill () {
    let returnVal = this.state.currentTime ? (this.state.currentTime / this.state.duration * 100) : null
    let stringifiedReturnVal = returnVal ? returnVal += '%' : '0%'
    // TODO: Can change this to use bars like in dscout app
    $('.progress-slider').css('background', `linear-gradient(to right, #ffffff ${stringifiedReturnVal},#1e1e1e ${stringifiedReturnVal},#a9a9a9 ${stringifiedReturnVal},#ffffff ${stringifiedReturnVal},#1e1e1e ${stringifiedReturnVal})`)
    $('.progress-slider-handle').css('left', stringifiedReturnVal)
    return returnVal
  }

  onSliderClick (seekPosition) {
    const audioElement = ReactDOM.findDOMNode(this.refs.player)
    audioElement.currentTime = this.state.duration * (seekPosition * 0.01)
    this.setState({currentTime: audioElement.currentTime})
  }

  getTimeFormat (time) {
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time % 60)
    if (isNaN(minutes) || isNaN(seconds)) return '....'
    seconds = '' + seconds
    seconds = seconds.length < 2 ? '0' + seconds : seconds
    return `${minutes}:${seconds}`
  }

  render () {
    const { nowPlaying, activeTrack } = this.props.player
    return (
      <player style={activeTrack && {bottom: 0}} className='player'>
        <div onClick={() => this.props.toggleTrack()} className='play-pause-button'>
          {nowPlaying ? <FontAwesome name='pause' size='2x' /> : <FontAwesome name='play' size='2x' />}
        </div>
        <div className='current-time-div'>
          <p>{this.getTimeFormat(this.state.currentTime)}</p>
          <p>{this.getTimeFormat(this.state.duration)}</p>
        </div>
        <div className='current-song-div'>
          <p>{activeTrack ? activeTrack.title : null}</p>
          <p>{activeTrack ? activeTrack.artist : null}</p>
        </div>
        <Slider className={'progress-slider'} handleClassName ={'progress-slider-handle'} onSliderClick={this.onSliderClick} defaultValue={0} />
        <Interval timeout={50} enabled={true} callback={() => {
          if (this.refs.player) {
            this.setState({duration: this.refs.player.duration, currentTime: this.refs.player.currentTime})
            this.getProgressFill()
          }
        }}/>
        <audio id='audio' style={{display: activeTrack ? '' : 'none'}} ref='player' src={`${activeTrack && activeTrack.stream_url}?client_id=${CLIENT_ID}`} />
      </player>
    )
  }
}

export default Player
