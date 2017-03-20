#!/usr/bin/env node
const User = require('../server/db/models/user')
const db = require('../server/db')
const getTodaysTracks = require('../server/funStuff/getTodaysTracks')
const mailgun = require('mailgun-js')({ apiKey, domain })

const apiKey = 'key-aaa3f71c340b05266e25a7f2da185eea'
const domain = 'mail.thatshot.audio'

module.exports = db.sync()
.then(() => sendEmails())


const sendEmails = () => {
  return User.findAll({
    where: {
      allow_marketing: true
    }
  })
  .then(users => {
    users.length = users.length > 100 ? 100 : users.length // shorten to 100 for now
    users.forEach(user => getTracksSendEmail(user))
  })
  .catch(err => console.log(err))
}

const getTracksSendEmail = (user) => {
  getTodaysTracks(user.id)
  .then(tracks => tracks.map(t => t.song))
  .then(tracks => {
    mailgun.messages().send(makeEmail(user.email, tracks), (error, body) => {
      console.log(body, 'body')
      console.log(error, 'err')
    })
  })
}

const makeEmail = (address, tracks) => {
  return {
    from: 'That\'s Hot <elliott@thatshot.audio>',
    to: address,
    subject: `That's Hot - New tunes from ${tracks[0].artist}, ${tracks[3].artist}, and ${tracks[6].artist}!`,
    text: 'Testing some Mailgun awesomness!'
  }
}
