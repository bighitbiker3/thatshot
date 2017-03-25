const axios = require('axios')
const db = require('../db')
const Savant = db.model('savant')
const Promise = require('bluebird')
const _ = require('lodash')

function makeScUri (scUserId, endpoint) {
  if (!endpoint) throw new Error('NEED ENDPOINT IN makeScUri FUNC El')
  return `https://api-v2.soundcloud.com/users/${scUserId}/${endpoint}?&limit=200&client_id=622c5a5338becb1365fb57b6bdc97f09`
}

function makeOGScUri (scUserId, endpoint = '') {
  return `https://api.soundcloud.com/users/${scUserId}/${endpoint}?client_id=622c5a5338becb1365fb57b6bdc97f09`
}

function getListOfFollowingsSavants (scUserId) {
  return axios.get(makeScUri(scUserId, 'followings'))
  .then(res => res.data) // res.data ={collection: [obj, obj, obj], next_href: '', query_urn: ''}
  .then(data => data.collection) // data.collection = [obj, obj, obj]
  .then(followings => followings.filter(potentialSavant => {
    if (potentialSavant.likes_count > 50) return potentialSavant
  }))
}

function getListOfLikeArtistsSavants (scUserId) {
  if (!scUserId) throw new Error('Not Enough Info')
  return axios.get(makeScUri(scUserId, 'track_likes'))
  .then(res => res.data.collection)
  .then(collection => collection.map(track => track.track.user.id)) // return an array of userIds
  .then(userIds => {
    return Promise.all([userIds, Promise.all(userIds.map(userId => axios.get(makeOGScUri(userId))))])
  })
  .then(data => {
    const userIds = data[0]
    const arrOfUsers = data[1].map(res => res.data)
    arrOfUsers.filter(user => {
      if (user.public_favorites_count > 50) return user
    })
    return [userIds, arrOfUsers]
  })
}

function getSavantsRecurse (scUserId, savantsArr, likesUserId = []) {
  return getListOfLikeArtistsSavants(scUserId)
  .then(data => {
    const userIds = data[0]
    const arrOfSavants = data[1]
    const combinedSavants = [...savantsArr, ...arrOfSavants]
    if (combinedSavants.length > 90) return combinedSavants
    else {
      const nextUser = likesUserId.length ? likesUserId.shift() : userIds.shift()
      return getSavantsRecurse(nextUser, combinedSavants, likesUserId)
    }
  })
}

function getSavants (scUserId) {
  return getListOfFollowingsSavants(scUserId)
  .then(savants => {
    if (savants.length > 90) return savants
    else return getSavantsRecurse(scUserId, savants)
  })
}

function backupPlan (req, io) {
  db.query('SELECT "savantId" FROM "userSavants" GROUP BY "savantId" ORDER BY COUNT(*) DESC LIMIT 200;', { type: db.QueryTypes.SELECT })
  .then(savantIds => req.user.addSavants(savantIds.map(obj => obj.savantId)))
  .catch(err => {
    console.log(err)
    io.emit('error', 'Error in BUP')
  })
}

function setSavants (scUserId, req, io) {
  return getSavants(scUserId)
  .then(savants => Promise.all(savants.map(savant => {
    return Savant.findOrCreate({
      where: {
        soundcloud_id: savant.id,
        permalink: savant.permalink,
        avatar_url: savant.avatar_url,
        username: savant.username,
        description: savant.description,
        city: savant.city
      }
    })
  })))
  .then(foundOrCreated => foundOrCreated
    .reduce((a, b) => a.concat(b))
    .filter(thing => {
      if (typeof thing === 'object') return thing
    })
  )
  .then(savants => req.user.addSavants(_.uniqBy(savants, 'id')))
  .then(added => io.emit('doneGettingSavants'))
  .catch(err => {
    if (err.message === 'Not Enough Info') return backupPlan(req, io)
    else io.emit('error', 'Error finding artists')
  })
}

module.exports = setSavants
