const express = require('express')
const router = express.Router()
const db = require('../../db')
const Song = db.model('song')
const User = db.model('user')
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

module.exports = router
