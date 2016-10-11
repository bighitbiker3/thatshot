import React from 'react'
import Track from '../Track'
import Loader from '../Loader/presenter'

class Stream extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    console.log('this shit renderr');
    this.props.setSavantTracks()
    this.props.setUserTracks()
  }

  render () {
    var stream
    if (this.props.stream === 'savantTracks') stream = this.props.tracks.savantTracks.map((track, key) => { return track ? <Track className='track' key={key} track={track} /> : null })
    else stream = this.props.tracks.userTracks.map((track, key) => { return track ? <Track className='track' key={key} track={track} /> : null })
    return (
      <div>
        <br />
        <p className="track-types">Track Types: <a style={this.props.stream === 'savantTracks' ? null : {textDecoration: 'underline'}} onClick={() => this.props.showUserTracks()}>User Posted</a> <a style={this.props.stream === 'savantTracks' ? {textDecoration: 'underline'} : null} onClick={() => this.props.showSavantTracks()}>Savant</a></p>
        <div>
          {stream}
        </div>
      </div>
    )
  }
}

export default Stream
