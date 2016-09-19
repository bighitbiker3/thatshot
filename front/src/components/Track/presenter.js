import React from 'react';
import UpVote from './UpVote'

function Track({ track = {}, toggleTrack }) {
  return (
    <div className = "track-group">
      <UpVote track = {track} />
      <div className="song-title-div">
          <p className="song-title" onClick={() => toggleTrack(track)}>{track.title}</p>
          <p className="artist-name">{track.artist}</p>
      </div>
      <div className="link-item-right">
        <div className="posted-by">
          {track.user.firstName}
        </div>
        <div className="up-votes">
          <p>{track.upvotes} upvotes</p>
        </div>
        <div className="genre">
          <p>genre: {track.genre || 'idk'}</p>
        </div>
      </div>
    </div>
  )
}

export default Track
