import React from 'react'
import UpVote from './UpVote'
import { Link } from 'react-router'
import FontAwesome from 'react-fontawesome'
import copy from 'copy-to-clipboard'
import urlEncoder from 'postman-url-encoder'
import { SERVER_LOCATION } from '../../constants/server'

function Track ({ track = {}, toggleTrack, auth, likeOnSoundCloud, copyNotification }) {
  return (
    <div className='track-group'>
      <UpVote track={track} />
      <div className='song-title-div'>
        <p className='song-title' onClick={() => {
          copy(urlEncoder.encode(`${SERVER_LOCATION}/artist/${track.artist}/${track.title}`))
          copyNotification()
        }}><span>{track.title}</span></p>
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
