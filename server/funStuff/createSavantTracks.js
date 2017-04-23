const getSavantTracks = require('./savant')
const db = require('../db')
const Song = db.model('song')
const User = db.model('user')

module.exports = (id, req, io) => {
  console.log('THIS IS ID', id);
  return getSavantTracks.runSavant(id)
  .then(data => Promise.all(data.map(song => {
    const songToAdd = {
      artwork_url: song.artwork_url,
      duration: song.duration,
      genre: song.genre,
      tag_list: `${song.genre} ${song.tag_list}`,
      trackId: song.id,
      permalink_url: song.permalink_url,
      reposts_count: song.reposts_count,
      title: song.title,
      artist: song.user.username,
      artist_uri: song.user.uri,
      playback_count: song.playback_count,
      artist_permalink: song.user.permalink_url,
      stream_url: song.stream_url,
      artist_id: song.user.id,
      waveform_url: song.waveform_url
    }
    return Song.findOrCreate({where: songToAdd, include: [User]})
  }))) // returns [[songObj, bool],[songObj, bool],[songObj, bool]]
  .then(foundOrCreated => {
    if (!foundOrCreated.length) {
      throw new Error('No Tracks')
    }
    return foundOrCreated.reduce((a, b) => a.concat(b)).filter(thing => {
      if (typeof thing === 'object') return thing
    })
  })
  .then(songsAdded => {
    return [Promise.all(songsAdded.map(song => req.user.addUserSavantTracks(song))), songsAdded]
  })
  .spread((savantTunes, songsAdded) => {
    return [req.user.update({last_updated: Date.now()}), songsAdded]
  })
  .spread((updated, songsAdded) => io.emit('doneCreateSavantTracks'))
  .catch(err => {
    console.log(err)
    io.emit('error', `Error getting tracks ${id}`)
  })
}
