import React from 'react'
import UpVote from './UpVote'
import { Link } from 'react-router'
import FontAwesome from 'react-fontawesome'

function Track ({ track = {}, toggleTrack, auth, likeOnSoundCloud }) {
  return (
    <div className='track-group'>
      <UpVote track={track} />
      <div className='song-title-div'>
        <p className='song-title' onClick={() => toggleTrack(track)}><span>{track.title}</span></p>
        <p className='artist-name'><Link to={`/artist/${track.artist}`}><span>{track.artist}</span></Link></p>
        <FontAwesome onClick={() => likeOnSoundCloud(track.trackId)} className="soundcloud-like" name={auth.soundcloud.favorites.includes(track.trackId) ? 'heart' : 'heart-o'} size='lg' />
      </div>
      <div className='link-item-right'>

        <div className='up-votes'>
          <p><span>{track.upvotes} upvotes</span></p>
        </div>
        <div className='genre'>
          <p><span>genre: {track.genre || 'idk'}</span></p>
        </div>
      </div>
    </div>
  )
}

export default Track
