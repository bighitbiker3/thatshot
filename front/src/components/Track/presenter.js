import React from 'react'
import UpVote from './UpVote'
import { Link } from 'react-router'
import FontAwesome from 'react-fontawesome'
import copy from 'copy-to-clipboard'
import DocumentMeta from 'react-document-meta'
import urlEncoder from 'postman-url-encoder'
import { SERVER_LOCATION } from '../../constants/server'

function Track ({ track = {}, toggleTrack, auth, likeOnSoundCloud, copyNotification, unlikeOnSoundCloud }) {
  const alreadLiked = auth.soundcloud.favorites.includes(track.trackId)
  const meta = {
    title: `${track.title} - ${track.artist}`,
    description: 'That\'s Hot',
    meta: {
      charset: 'utf-8',
      name: {
        keywords: 'react,meta,document,html,tags'
      },
      property: {
        'og:title': `${track.title} - ${track.artist}`,
        'og:type': 'article',
        'og:image': track.artwork_url.replace('large', 't300x300'),
        'og:site_name': 'That\'s Hot'
      }
    }
  }
  return (
    <div className='track-group'>
      <DocumentMeta {...meta} />
      <UpVote track={track} />
      <div className='song-title-div'>
        <p className='song-title' onClick={() => {
          copy(urlEncoder.encode(`${SERVER_LOCATION}/artist/${track.artist}/${track.title}`))
          copyNotification()
        }}><span>{track.title}</span></p>
        <p className='artist-name'><Link to={`/artist/${track.artist}`}><span>{track.artist}</span></Link></p>
        <div className='soundcloud-like-wrapper'>
          <FontAwesome
          onClick={() => alreadLiked ? unlikeOnSoundCloud(track.trackId) : likeOnSoundCloud(track.trackId, track.id, auth.user)}
          className="soundcloud-like"
          name={alreadLiked ? 'heart' : 'heart-o'}
          size='lg' />
          <div className='soundcloud-like-text'>
            {alreadLiked ? 'Already liked :)' : 'Like on SoundCloud'}
          </div>
        </div>
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
