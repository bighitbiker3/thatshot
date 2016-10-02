import React from 'react'
import UpVote from './UpVote'

function Track ({ track = {}, toggleTrack }) {
  return (
    <div className='track-group'>
      <UpVote track={track} />
      <div className='song-title-div'>
          <p className='song-title' onClick={() => toggleTrack(track)}>{track.title}</p>
          <p className='artist-name'><a href={track.artist_permalink} target='_blank'>{track.artist} </a></p>
      </div>
      <div className='link-item-right'>
        <div className='posted-by'>
          {track.user.username}
        </div>
        <div className='up-votes'>
          <p>{track.upvotes} upvotes</p>
        </div>
        <div className='genre'>
          <p>genre: {track.genre || 'idk'}</p>
        </div>
      </div>
    </div>
  )
}

export default Track
