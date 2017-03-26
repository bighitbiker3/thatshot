const express = require('express')
const router = express.Router()
const db = require('../../db')
const User = db.model('user')
const Song = db.model('song')
const UserSavantTracks = db.model('userSavantTracks')
const Promise = require('bluebird')
const setSavants = require('../../funStuff/setSavants')

module.exports = (io) => {
  // CREATE NEW USER
  router.post('/', function (req, res, next) {
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
      res.send(user)
    })
    .catch(next)
  })

  // GET SPECIFIC USER
  router.get('/:userId', function (req, res, next) {
    User.findById(req.params.userId)
    .then(user => res.send(user))
    .catch(next)
  })

  // Add email for user
  router.post('/:userId/email', (req, res, next) => {
    req.user.update(req.body)
    .then(() => res.send(201))
    .catch(next)
  })

  router.get('/:userId/unsubscribe', (req, res, next) => {
    User.findById(req.params.userId)
    .then(user => user.update({allow_marketing: false}))
    .then(() => res.redirect('/unsubscribe'))
    .catch(next)
  })

  // GET SPECIFIC USERS TRACKS
  router.get('/:userId/tracks', function (req, res, next) {
    // Allow for passing of ID's or usernames
    let findBy
    if (Number(req.params.userId)) {
      findBy = User.findById(req.params.userId)
    } else {
      findBy = User.findOne({where: {username: req.params.userId}})
    }

    findBy
    .then(user => {
      return UserSavantTracks.findAll({
        where: {
          userId: user.id,
          posted: true
        },
        include: [{model: Song}]
      })
    })
    .then(songs => songs.map(song => song.song))
    .then(songs => res.send(songs))
    .catch(next)
  })

  // Set Savants
  router.post('/:soundcloudId/savants', function (req, res, next) {
    const soundcloudId = req.params.soundcloudId
    setSavants(soundcloudId, req, io)
    .catch(next)
    res.send(201)
  })

  return router
}
