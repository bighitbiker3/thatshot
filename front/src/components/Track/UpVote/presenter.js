import React from 'react';

function UpVote({ trackId = null, upVoteTrack, user = null }) {
  return (
    <div onClick={() => upVoteTrack(trackId, user)}>
      <h3>^^^</h3>
    </div>
  )
}

export default UpVote;
