const express = require('express')
const router = express.Router()
const db = require('../../db')
const User = db.model('user')
const scAuthToken = db.model('scAuthToken')
const Promise = require('bluebird')
const axios = require('axios')
const getSavantTracks = require('../../funStuff/savant')

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
  getSavantTracks.runSavant(102)
  .then(songs => {
    res.send(songs)
  })
  .catch(err => res.send('THIS IS AN ERRORR'))
})

// GET SPECIFIC USER
router.get('/:userId', function (req, res, next) {
  User.findById(req.params.userId)
  .then(user => res.send(user))
  .catch(next)
})

// GET SPECIFIC USERS TRACKS
router.get('/:userId/tracks', function (req, res, next) {
  // Allow for passing of ID's or usernames
  let findBy = Number(req.params.userId) ? User.findById(req.params.userId) : User.findOne({where: {username: req.params.userId}})

  findBy
  .then(user => Promise.all([user.getSongs({include: {model: User}}), user.getUpVotedSongs({include: [User]})]))
  .then(songs => songs.reduce((a, b) => a.concat(b), []))
  .then(songs => res.send(songs))
  .catch(next)
})

router.post('/:userId/savants', function (req, res, next) {
  const userId = req.params.userId
  setSavants(userId, req)
  .catch(next)
})

// ADD SOUNDCLOUD API TOKEN
router.post('/soundCloudAuth', function (req, res, next) {
  const access_token = req.body.access_token
  const scUserId = req.body.scUserId
  Promise.all([scAuthToken.findOne({where: {access_token}}), req.user.update({soundcloud_id: scUserId})])
  .spread((foundToken, updated) => {
    if (!foundToken) {
      return req.user.createScAuthToken({access_token})
    } else {
      return foundToken
    }
  })
  .then(token => res.send(token))
  .then(() => {
    return setSavants(req.user.soundcloud_id, req)
  })
  .catch(next)
})

// HELPERS

function makeScUri (scUserId, endpoint) {
  if (!endpoint) throw new Error('NEED ENDPOINT IN makeScUri FUNC stupid El')
  return `https://api-v2.soundcloud.com/users/${scUserId}/${endpoint}?&limit=200&client_id=622c5a5338becb1365fb57b6bdc97f09`
}

function getListOfFollowings (scUserId) {
  return axios.get(makeScUri(scUserId, 'followings'))
  .then(res => res.data) // res.data ={collection: [obj, obj, obj], next_href: '', query_urn: ''}
  .then(data => data.collection) // data.collection = [obj, obj, obj]
}

function setSavants (scUserId, req) {
  return getListOfFollowings(scUserId)
  .then(followings => followings.filter(potentialSavant => {
    if (potentialSavant.likes_count > 50) return potentialSavant
  }))
  .then(savants => Promise.all(savants.map(savant => {
    return req.user.createSavant({
      soundcloud_id: savant.id,
      permalink: savant.permalink,
      avatar_url: savant.avatar_url,
      username: savant.username,
      description: savant.description,
      city: savant.city
    })
  })))
  .catch(err => console.log(err))
}

module.exports = router
