const express = require('express')
const router = express.Router()
const db = require('../../db')
const Song = db.model('song')
const User = db.model('user')
const getSavantTracks = require('../../funStuff/savant')
const Promise = require('bluebird')
const ensureAuthenticated = require('../middleware').ensureAuthenticated


// GET SONGS
router.get('/', function (req, res, next) {
  req.query.is_savant = (req.query.is_savant === 'true')
  Song.findAll({
    include: [{model: User, where: req.query}],
    order: [['createdAt', 'DESC']],
    limit: req.query.is_savant ? 15 : null
  })
  .then(songs => {
    res.json(songs)
  })
  .catch(next)
})

// ADD OR GET USER'S SAVANT TUNES
router.post('/:userId/savantTracks', function (req, res, next) {
  console.log('THIS IS REQ PARAMSSSS', req.params)
  const day = new Date()
  req.user.getUserSavantTracks({
    where: {
        createdAt: {
          $lt: new Date(),
          $gt: new Date(new Date() - 24 * 60 * 60 * 1000)
        }
    }
  })
  .then(tracks => {
    if (tracks.length) return tracks
    else return createSavantTracks(req.params.userId, req)
  })
  .then(tracks => res.send(tracks))
  .catch(next)
})

// UPVOTE TRACK
router.post('/:trackId/:userId/upvote', ensureAuthenticated, function (req, res, next) {
  Song.findById(req.params.trackId, {include: [{model: User}]})
  .then(song => Promise.all([song, song.getUpVotingUsers()]))
  .spread((song, result) => Promise.all([song, result.filter(user => user.id === +req.params.userId)]))
  .spread((song, filtered) => {
    if (!filtered.length) {
      return song.addUpVotingUsers(req.params.userId)
      .then(() => song.upvote())
      .then(updated => updated.save())
      .then(track => res.send(track))
    } else {
      res.send(false)
    }
  })
  .catch(next)
})

// POST NEW TRACK FROM USER SUBMISSION
router.post('/:userId/:trackId', ensureAuthenticated, function (req, res, next) {
  Song.findOne({where: {trackId: req.params.trackId}})
  .then(song => {
    if (song) res.send(false)
    else return req.user.createSong(req.body)
  })
  .then(song => res.send(song))
  .catch(next)
})


// HELPERS

function createSavantTracks (id, req) {
  console.log('THIS IS ID', id);
  return getSavantTracks.runSavant(id)
  .then(data => Promise.all(data.map(song => {
    const songToAdd = {
      artwork_url: song.artwork_url,
      duration: song.duration,
      genre: song.genre,
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
    return Song.findOrCreate({where: songToAdd})
  }))) // returns [[songObj, bool],[songObj, bool],[songObj, bool]]
  .then(foundOrCreated => foundOrCreated.reduce((a, b) => a.concat(b)).filter(thing => {
    if (typeof thing === 'object') return thing
  }))
  .then(songsAdded => Promise.all(songsAdded.map(song => req.user.addUserSavantTracks(song))))
  .then(added => added.reduce((a, b) => a.concat(b[0]), []))
}

module.exports = router
