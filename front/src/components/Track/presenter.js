import React from 'react'
import UpVote from './UpVote'
import { Link } from 'react-router'
import FontAwesome from 'react-fontawesome'
import copy from 'copy-to-clipboard'
import urlEncoder from 'postman-url-encoder'
import { SERVER_LOCATION } from '../../constants/server'

function Track ({ track = {}, toggleTrack, auth, likeOnSoundCloud, copyNotification, unlikeOnSoundCloud }) {
  const alreadLiked = auth.soundcloud.favorites.includes(track.trackId)
  return (
    <div className='track-group'>
      <UpVote track={track} />
      <div className='song-title-div'>
        <p className='song-title' onClick={() => {
          copy(urlEncoder.encode(`${SERVER_LOCATION}/artist/${track.artist}/${track.title}`))
          copyNotification()
        }}><span>{track.title}</span></p>
        <p className='artist-name'><Link to={`/artist/${track.artist}`}><span>{track.artist}</span></Link></p>
        { auth.user.id
        ? <div className='soundcloud-like-wrapper'>
            <FontAwesome
            onClick={() => alreadLiked ? unlikeOnSoundCloud(track.trackId) : likeOnSoundCloud(track.trackId, track.id, auth.user)}
            className="soundcloud-like"
            name={alreadLiked ? 'heart' : 'heart-o'}
            size='lg' />
            <div className='soundcloud-like-text'>
              {alreadLiked ? 'Already liked :)' : 'Like on SoundCloud'}
            </div>
          </div>
        : null
      }

      </div>
      <div className='link-item-right'>
        <div className='genre'>
          <p><span>genre: {track.genre || 'idk'}</span></p>
        </div>
      </div>
    </div>
  )
}

export default Track
