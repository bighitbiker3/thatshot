import React from 'react';
import ReactDOM from 'react-dom';

export default class UpVote extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    ReactDOM.findDOMNode(this).addEventListener('mouseenter', () => {
      this.props.mouseEnterUpvote()
    });
    ReactDOM.findDOMNode(this).addEventListener('mouseleave', () => {
      this.props.mouseLeaveUpvote()
    })
  }

  render(){
    var style;
    this.props.track.upVoteHover ? style = {bottom: 25} : style = null;

    return (
      <div className="album-art-div">
        <div className="upvote-box"><p>UPVOTE</p></div>
        <img style={style} onClick={() => this.props.upVoteTrack(this.props.track.id, this.props.user)} className = "img-responsive album-art" src={this.props.track.artwork_url}></img>
      </div>
    )
  }
}
