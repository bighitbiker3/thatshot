import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome'
import { CLIENT_ID } from '../../constants/auth'

class Player extends React.Component {
  componentDidUpdate(){
    const audioElement = ReactDOM.findDOMNode(this.refs.player)

    if(!audioElement) return;

    const { nowPlaying, activeTrack } = this.props.player;

    nowPlaying ? audioElement.play() : audioElement.pause()
  }

  render(){
    const { nowPlaying, activeTrack } = this.props.player;
    return (
      <player className="player">
        <div onClick={() => this.props.toggleTrack()} className="play-pause-button">
          {nowPlaying ? <FontAwesome name='pause-circle-o' size='2x'/> : <FontAwesome name='play-circle-o' size='2x'/>}
        </div>
        {activeTrack ? <audio id="audio" ref="player" src={`${activeTrack.stream_url}?client_id=${CLIENT_ID}`}></audio> : null}
      </player>
    )
  }
}

export default Player;
