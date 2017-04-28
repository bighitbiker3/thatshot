import React from 'react'
import Track from '../Track'

const Stream = (props) => {
  const stream = props.tracks && props.tracks.map((track, key) => { return track && <Track className='track' key={key} track={track} /> })
  return (
    <div>
      {props.title && <h1 className='stream-title'>{props.title}</h1>}
      <div>
        {stream}
      </div>
    </div>
  )
}

export default Stream
