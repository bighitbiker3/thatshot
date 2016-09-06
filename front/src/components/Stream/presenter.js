import React from 'react';
import Track from '../Track';

class Stream extends React.Component {
  constructor(props){
    super(props)
  }

  componentWillMount() {
    this.props.setSavantTracks()
    this.props.setUserTracks()
  }

  render(){
    var stream;
    if(this.props.stream === 'savantTracks') stream = this.props.tracks.savantTracks.map((track, key) => {return track ? <Track className="track" key={key} track={track} /> : null;})
    else stream = this.props.tracks.userTracks.map((track, key) => {return track ? <Track className="track" key={key} track={track} /> : null;})
    return (
      <div>
        <br/>
        <p>Track Types: <a onClick={() => this.props.showSavantTracks()}>Savant</a> <a onClick={() => this.props.showUserTracks()}>User Posted</a></p>
        <div>
          {stream}
        </div>
      </div>
    );
  }
}


export default Stream;
