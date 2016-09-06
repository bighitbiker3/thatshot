import React from 'react';
import UpVote from './UpVote'

function Track({ track = {}, toggleTrack }) {
  return (
    <div>
      <UpVote trackId = {track.id} />
      <h3 onClick={() => toggleTrack(track)}>{track.title} - {track.artist}</h3>
      <p>Plays: {track.playback_count} UpVotes: {track.upvotes}</p>
    </div>
  )
}

export default Track
