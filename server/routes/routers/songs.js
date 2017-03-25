const express = require('express')
const moment = require('moment')
const Promise = require('bluebird')
const router = express.Router()
const db = require('../../db')
const Song = db.model('song')
const User = db.model('user')
const createSavantTracks = require('../../funStuff/createSavantTracks')
const getTodaysTracks = require('../../funStuff/getTodaysTracks')
const ensureAuthenticated = require('../middleware').ensureAuthenticated

module.exports = (io) => {
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

  // GET USER'S SAVANT TUNES
  router.get('/:userId/savantTracks', function (req, res, next) {
    console.log(req.user.last_updated)
    const { userId } = req.params
    getTodaysTracks(userId, Song)
    .then(tracks => {
      if (tracks.length === 9) return Promise.all(tracks.map(track => track.update({posted: true, posted_date: moment().startOf('day').toDate()})))
      else res.send(204)
    })
    .then(tracks => {
      if (tracks) res.send(tracks.map(track => track.song))
    })
    .catch(next)
  })

  // ADD USER'S SAVANT TUNES
  router.post('/:userId/savantTracks', function (req, res, next) {
    createSavantTracks(req.params.userId, req, io)
    // .then(tracks => res.send(201))
    .catch(next)
    res.send(201)
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
  return router
}
