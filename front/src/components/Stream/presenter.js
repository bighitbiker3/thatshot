import React from 'react'
import Track from '../Track'
import Loader from '../Loader/presenter'

class Stream extends React.Component {
  render () {
    var stream
    if (this.props.stream === 'savantTracks') stream = this.props.tracks.savantTracks.map((track, key) => { return track && <Track className='track' key={key} track={track} /> })
    else stream = this.props.tracks.userTracks.map((track, key) => { return track && <Track className='track' key={key} track={track} /> })
    return (
      <div>
        <br />
        <div>
          {stream}
        </div>
      </div>
    )
  }
}

export default Stream
