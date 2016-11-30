'use strict'
var express = require('express')
var router = express.Router()
var db = require('../db')
var User = db.model('user')
var Song = db.model('song')
var Subscriber = db.model('subscriber')
var Promise = require('bluebird')
var scAuthToken = db.model('scAuthToken')

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

//FIND SONGS BY ARTIST
router.get('/artists/:artistName/songs', function(req, res, next) {
    console.log(req.params.artistName, 'artist anmeeee')
  Song.findAll({
    where: {
      artist: {
        $iLike: req.params.artistName
      }
    },
    include: [{model: User, where: req.query}]
  })
  .then(songs => res.json(songs))
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
    if (song) res.send(false)
    else return req.user.createSong(req.body)
  })
  .then(song => res.send(song))
  .catch(next)
})

// CREATE NEW USER
router.post('/users', function (req, res, next) {
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
  Subscriber.create(req.body)
  .then(newSub => res.send(newSub))
  .catch(next)
})

// ADD SOUNDCLOUD API TOKEN
router.post('/soundCloudAuth', function (req, res, next) {
  const access_token = req.body.access_token
  scAuthToken.findOne({where: {access_token}})
  .then(foundToken => {
    if (!foundToken) {
      return req.user.createScAuthToken({access_token})
    } else {
      return foundToken
    }
  })
  .then(token => res.send(token))
  .catch(next)
})

module.exports = router
