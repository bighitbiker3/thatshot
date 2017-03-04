const axios = require('axios')
const db = require('../db')
const Savant = db.model('savant')

function makeScUri (scUserId, endpoint) {
  if (!endpoint) throw new Error('NEED ENDPOINT IN makeScUri FUNC El')
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
  // .then(savants => console.log(savants))
  .then(savants => req.user.addSavants(savants))
  .then(added => console.log('GOT TO ADDEDDDDDDDDDDDDDDDDD'))
  .catch(err => console.log(err))
}

module.exports = setSavants
