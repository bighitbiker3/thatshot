const express = require('express')
const router = express.Router()
const db = require('../../db')
const User = db.model('user')
const Savant = db.model('savant')
const Promise = require('bluebird')
const getSavantTracks = require('../../funStuff/savant')
const setSavants = require('../../funStuff/setSavants')

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

router.get('/savants', function (req, res, next) {
  getSavantTracks.runSavant(1)
  .then(songs => {
    res.send(songs)
  })
  .catch(err => res.send('THIS IS AN ERROR', err))
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

// GET SPECIFIC USERS TRACKS
router.get('/:userId/tracks', function (req, res, next) {
  // Allow for passing of ID's or usernames
  let findBy
  if (Number(req.params.userId)) {
    findBy = User.findById(req.params.userId)
  } else {
    findBy = User.findOne({where: {username: req.params.userId}})
  }
  findBy.then(thing => console.log(thing))

  findBy
  .then(user => Promise.all([user.getSongs({include: {model: User}}), user.getUpVotedSongs({include: [User]})]))
  .then(songs => songs.reduce((a, b) => a.concat(b), []))
  .then(songs => res.send(songs))
  .catch(next)
})

router.post('/:soundcloudId/savants', function (req, res, next) {
  const soundcloudId = req.params.soundcloudId
  setSavants(soundcloudId, req)
  .then(() => res.send(201))
  .catch(next)
})

module.exports = router
