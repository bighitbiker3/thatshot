const axios = require('axios')
const db = require('../db')
const Savant = db.model('savant')
const Promise = require('bluebird')
const _ = require('lodash')
const welcomeEmail = require('../lib/welcomeEmail')

function makeScUri (scUserId, endpoint) {
  if (!endpoint) throw new Error('NEED ENDPOINT IN makeScUri FUNC El')
  return `https://api-v2.soundcloud.com/users/${scUserId}/${endpoint}?&limit=200&client_id=622c5a5338becb1365fb57b6bdc97f09`
}

function makeOGScUri (scUserId, endpoint = '') {
  return `https://api.soundcloud.com/users/${scUserId}/${endpoint}?client_id=622c5a5338becb1365fb57b6bdc97f09`
}

function filterNonActive (arr) {
  console.log('filtering non active', arr.length)
  return arr.filter(a => a).filter(potentialSavant => {
    if (potentialSavant.likes_count > 100) return potentialSavant
  })
}

function getListOfFollowingsSavants (scUserId) {
  console.log('running this')
  return axios.get(makeScUri(scUserId, 'followings'))
  .then(res => res.data) // res.data ={collection: [obj, obj, obj], next_href: '', query_urn: ''}
  .then(data => data.collection) // data.collection = [obj, obj, obj]
  .then(followings => followings)
  .catch(err => console.log(err))
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
  // console.log(scUserId, savantsArr, likesUserId, 'id in recruse');
  return getListOfLikeArtistsSavants(scUserId)
  .then(data => {
    const userIds = data[0]
    const arrOfSavants = data[1]
    const savantIds = [...likesUserId, ...userIds]
    const combinedSavants = [...savantsArr, ...arrOfSavants]
    const uniqueCombined = _.uniqBy(combinedSavants, 'id')
    if (uniqueCombined.length > 90) return uniqueCombined
    else {
      console.log(savantIds, scUserId, 'in recurse');
      if (!savantIds.length) return 'Not enough info'
      return getSavantsRecurse(savantIds.shift(), uniqueCombined, savantIds)
    }
  })
}

function getSavants (scUserId) {
  return getListOfFollowingsSavants(scUserId)
  // .then(followings => Promise.all([followings, Promise.all(followings.map(user => getListOfFollowingsSavants(user.id)))]))
  // .then(separation => {
  //   const firstDegree = filterNonActive(separation[0]) // [user, user, user]
  //   const secondDegree = separation[1].length && filterNonActive(separation[1].reduce((a, b) => a.concat(b))) // [[user, user], [user, user]]
  //   return [firstDegree, secondDegree]
  // })
  .then(savants => {
    if ((savants.length) > 90) return savants
    else {
      const recurseSavants = savants.length ? savants.filter(a => a) : []
      return getSavantsRecurse(scUserId, recurseSavants)
    }
  })
  .catch(err => console.log(err))
}

function backupPlan (req, io) {
  console.log('Backup plan engaged');
  db.query('SELECT "savantId" FROM "userSavants" GROUP BY "savantId" ORDER BY COUNT(*) DESC LIMIT 400;', { type: db.QueryTypes.SELECT })
  .then(savantIds => req.user.addUserSavants(savantIds.map(obj => obj.savantId)))
  .catch(err => {
    console.log(err)
    io.emit('error', 'Error in BUP')
  })
}

function getUnique (first, second) {
  const keysOfIds = first.reduce((obj, user) => {
    obj[user.id] = true
    return obj
  }, {})
  const filteredSecond = second.filter(user => !keysOfIds[user.id]) // only return if doesn't exist in first already
  return [first, filteredSecond]
}

function findOrCreate (arr) {
  return Promise.all(arr.map(savant => {
    return Savant.findOrCreate({
      where: {
        soundcloud_id: savant.id
      },
      defaults: {
        permalink: savant.permalink,
        avatar_url: savant.avatar_url,
        username: savant.username,
        description: savant.description,
        city: savant.city
      }
    })
  }))
}

function flatten (arr) {
  return arr.reduce((a, b) => a.concat(b))
    .filter(thing => {
      if (typeof thing === 'object') return thing
    })
}

function setSavants (scUserId, req, io) {
  return getSavants(scUserId)
  .then(savants => {
    if (savants === 'Not enough info') return backupPlan(req, io);
    if (savants.length > 2) {
      return findOrCreate(savants)
        .then(created => {
          const flat = flatten(created)
          return req.user.addUserSavants(_.uniqBy(flat, 'id'), { degree: 1 })
        })
    } else {
      const unique = getUnique(savants[0], savants[1])
      const firstDegree = findOrCreate(unique[0])
      const secondDegree = findOrCreate(unique[1])
      return Promise.all([firstDegree, secondDegree])
        .then(foundOrCreated => {
          const firstDegree = flatten(foundOrCreated[0])
          const secondDegree = flatten(foundOrCreated[1])
          return [firstDegree, secondDegree]
        })
        .then(savants => {
          const firstDegree = savants[0]
          const secondDegree = savants[1]
          return Promise.all([
            req.user.addUserSavants(_.uniqBy(firstDegree, 'id'), { degree: 1 }),
            req.user.addUserSavants(_.uniqBy(secondDegree, 'id'), { degree: 2 })
          ])
        })
    }
  })
  .then(added => io.emit('doneGettingSavants'))
  .then(() => welcomeEmail(req.user))
  .catch(err => {
    console.log(err, 'this is err')
    if (err.message === 'Not enough info') return backupPlan(req, io)
    else io.emit('error', `Error finding artists ${scUserId}`)
  })
}

module.exports = setSavants
