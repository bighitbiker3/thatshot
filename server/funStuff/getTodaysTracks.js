const moment = require('moment')
const db = require('../db')
const Song = db.model('song')
const User = db.model('user')
const UserSavantTracks = db.model('userSavantTracks')

module.exports = (userId) => {
  return UserSavantTracks.findAll({
    where: {
      userId,
      $and: {
        posted: true,
        posted_date: moment().startOf('day').toDate()
      }
    },
    limit: 9,
    include: [{model: Song}]
  })
  .then(tracks => {
    if (tracks.length) return tracks
    else {
      return UserSavantTracks.findAll({
        where: {
          userId,
          posted: false
        },
        limit: 9,
        include: [{model: Song}]
      })
    }
  })
}
