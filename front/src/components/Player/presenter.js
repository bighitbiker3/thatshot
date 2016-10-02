//I am keeping the state for player seeking and positioning in the presenter.
//Using redux seemed like overkill for this and could slow things down firing so many actions
import React from 'react'
import ReactDOM from 'react-dom'
import FontAwesome from 'react-fontawesome'
import { CLIENT_ID } from '../../constants/auth'
import Interval from 'react-interval'
import Slider from 'react-slider'

class Player extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      currentTime: 0,
      duration: 1,
      seekPosition: 0
    }
    this.durationInterval = null
  }

  componentDidUpdate () {
    const audioElement = ReactDOM.findDOMNode(this.refs.player)

    if (!audioElement) return

    const { nowPlaying, activeTrack } = this.props.player

    nowPlaying ? audioElement.play() : audioElement.pause()
  }

  getProgressFill () {
    let returnVal = this.state.currentTime ? (this.state.currentTime / this.state.duration * 100) : null
    let stringifiedReturnVal = returnVal ? returnVal += '%' : '0%'
    //ugh
    $('.progress-slider').css('background', `linear-gradient(to right, #ffffff ${stringifiedReturnVal},#1e1e1e ${stringifiedReturnVal},#a9a9a9 ${stringifiedReturnVal},#ffffff ${stringifiedReturnVal},#1e1e1e ${stringifiedReturnVal})`)
    $('.progress-slider-handle').css('left', stringifiedReturnVal)
    return returnVal
  }

  onSliderClick = (seekPosition) => {
    const audioElement = ReactDOM.findDOMNode(this.refs.player)
    audioElement.currentTime = this.state.duration * (seekPosition * 0.01)
    this.setState({currentTime: audioElement.currentTime})
  }

  getTimeFormat(time){
    let minutes = Math.floor(time/60)
    let seconds = Math.floor(time%60)
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
        <div className='currentTimeDiv'>
          <p>{this.getTimeFormat(this.state.currentTime)}</p>
          <p>{this.getTimeFormat(this.state.duration)}</p>
        </div>
        <Slider className={'progress-slider'} handleClassName ={'progress-slider-handle'} onSliderClick={this.onSliderClick} defaultValue={0} />
        <Interval timeout={50} enabled={true} callback={() => {
          if (this.refs.player) {
            this.setState({duration: this.refs.player.duration, currentTime: this.refs.player.currentTime})
            this.getProgressFill()
          }
        }}/>
        {activeTrack ? <audio id='audio' ref='player' src={`${activeTrack.stream_url}?client_id=${CLIENT_ID}`} /> : null}
      </player>
    )
  }
}

export default Player

//  IFRAME OPTION BELOW (NO API LIMIT W/ THIS ONE)

// import React from 'react'
// // import ReactDOM from 'react-dom'
// // import FontAwesome from 'react-fontawesome'
// // import { CLIENT_ID } from '../../constants/auth'
// let frameSrc
//
// class Player extends React.Component {
//   constructor (props) {
//     super(props)
//   }
//   componentWillMount () {
//     console.log(this.props)
//   }
//   render () {
//     const { activeTrack } = this.props.player
//     console.log(activeTrack, 'ACTIVE TRACKKKKKKK');
//     frameSrc = activeTrack ? `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${activeTrack.trackId}&amp;auto_play=true&amp;hide_related=true&amp;show_comments=false&amp;show_user=true&amp;show_reposts=true&amp;visual=true` : `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/&amp;auto_play=true&amp;hide_related=true&amp;show_comments=false&amp;show_user=true&amp;show_reposts=true&amp;visual=true`
//     return (
//       <player className='playerDiv'>
//         <div className='player'>
//           <iframe width="100%" height="50" scrolling="no" src={frameSrc}></iframe>
//         </div>
//     </player>
//     )
//   }
// }

// export default Player
