import React from 'react'
import UpVote from './UpVote'
import { Link } from 'react-router'
import FontAwesome from 'react-fontawesome'

function Track ({ track = {}, toggleTrack, auth, likeOnSoundCloud }) {
  return (
    <div className='track-group'>
      <UpVote track={track} />
      <div className='song-title-div'>
        <p className='song-title' onClick={() => toggleTrack(track)}>{track.title}</p>
        <p className='artist-name'><a href={track.artist_permalink} target='_blank'>{track.artist} </a></p>
        { auth.soundcloud ? <FontAwesome onClick={() => likeOnSoundCloud(track.trackId)} className="soundcloud-like" name={auth.soundcloud.favorites.includes(track.trackId) ? 'heart' : 'heart-o'} size='lg' /> : null }
      </div>
      <div className='link-item-right'>
        <div className='posted-by'>
          <Link to={`/${track.user.username}`}>{track.user.username}</Link>
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
