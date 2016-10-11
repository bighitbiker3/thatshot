'use strict'
var express = require('express')
var router = express.Router()
var db = require('../db')
var User = db.model('user')
var Song = db.model('song')
var Promise = require('bluebird')

// USER IS ON REQ.USER

// ENSURE AUTH
var ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) return next()
  else res.sendStatus(401)
}

// GET SONGS
router.get('/songs', function (req, res, next) {
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
router.post('/songs/:trackId/:userId/upvote', ensureAuthenticated, function (req, res, next) {
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
router.post('/songs/:userId/:trackId', ensureAuthenticated, function (req, res, next) {
  Song.findOne({where: {trackId: req.params.trackId}})
  .then(song => {
    if (song) res.send(null)
    else return req.user.createSong(req.body)
  })
  .then(song => res.send(song))
  .catch(next)
})

// CREATE NEW USER
router.post('/users', function (req, res, next) {
  console.log(req.body)
  User.findOrCreate({
    where: {
      $or: [
        {username: req.body.username},
        {email: req.body.email}
      ]
    },
    defaults: req.body
  })
  .then(user => {  // array [instance, createdBool]
    console.log(user)
    res.send(user)
  })
  .catch(next)
})

// GET SPECIFIC USER
router.get('/users/:userId', function (req, res, next) {
  User.findById(req.params.userId)
  .then(user => res.send(user))
  .catch(next)
})

// GET SPECIFIC USERS TRACKS
router.get('/users/:userId/tracks', function (req, res, next) {
  //Allow for passing of ID's or usernames
  let findBy = Number(req.params.userId) ? User.findById(req.params.userId) : User.findOne({where:{username:req.params.userId}})

  findBy
  .then(user => Promise.all([user.getSongs({include: {model: User}}), user.getUpVotedSongs({include: [User]})]))
  .then(songs => songs.reduce((a, b) => a.concat(b), []))
  .then(songs => res.send(songs))
  .catch(next)
})

// ADD SUBSCRIBER
router.post('/subscribers', function (req, res, next) {
  console.log(req.body)
})

module.exports = router
