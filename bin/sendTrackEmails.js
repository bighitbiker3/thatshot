#!/usr/bin/env node
const User = require('../server/db/models/user')
const db = require('../server/db')
const getTodaysTracks = require('../server/funStuff/getTodaysTracks')
const apiKey = 'key-aaa3f71c340b05266e25a7f2da185eea'
const domain = 'mail.thatshot.audio'
const mailgun = require('mailgun-js')({ apiKey, domain })


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
    mailgun.messages().send(makeEmail(user.email, user.id, tracks), (error, body) => {
      console.log(body, 'body')
      console.log(error, 'err')
    })
  })
}

const makeEmail = (address, id, tracks) => {
  tracks = tracks.filter(track => {
    if (track.artwork_url) {
      track.artwork_url = track.artwork_url.replace('large', 't300x300')
      return track
    }
  })
  return {
    from: 'That\'s Hot <elliott@thatshot.audio>',
    to: address,
    subject: `That's Hot - New tunes from ${tracks[0].artist}, ${tracks[1].artist}, and ${tracks[2].artist}!`,
    text: 'Testing some Mailgun awesomness!',
    html: `
<body bgcolor="#f6f6f6" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; margin: 0; padding: 0;">
&#13;
&#13;
&#13;
  <table style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; width: 100%; margin: 0; padding: 20px;"><tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"><td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"></td>&#13;
    <td bgcolor="#FFFFFF" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0;">
&#13;
&#13;
&#13;
<div style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; max-width: 600px; display: block; margin: 0 auto; padding: 0;">&#13;
<table style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; width: 100%; margin: 0; padding: 0;"><tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"><td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">&#13;
<h1 style="font-family: 'Times New Roman', Arial, 'Lucida Grande', serif; font-size: 70px; text-align: center; line-height: 1.2; color: #000; font-style: italic; font-weight: 200; margin: 40px 0 10px; padding: 0;">That's Hot</h1>&#13;
<h2 style="font-family: 'Times New Roman', Arial, 'Lucida Grande', serif; font-size: 28px; line-height: 1.2; color: #000; font-weight: 200; margin: 20px 0 20px; padding: 0; text-align: center">New Music </h2>&#13;
<div style='text-align: center;'>
<a href="https://thatshot.audio">
<img src='${tracks[0].artwork_url}' />&#13;
</a>
</div>
<div style='text-align: center;'>
<a href="https://thatshot.audio">
<img src='${tracks[1].artwork_url}' />&#13;
</a>
</div>
<div style='text-align: center;'>
<a href="https://thatshot.audio">
<img src='${tracks[2].artwork_url}' />&#13;
</a>
</div>
<table style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; width: 100%; margin: 0; padding: 0;"><tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"><td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 10px 0;">&#13;
<p style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; text-align: center; font-weight: normal; margin: 0 0 10px; padding: 0;"><a href="https://thatshot.audio" style="font-family: 'Times New Roman', Arial, 'Lucida Grande', serif; font-size: 32px; line-height: 1; color: #FFF; text-decoration: none; font-weight: 100; text-align: center; cursor: pointer; display: inline-block; background-color: black; margin: 0 10px 0 0; padding: 10px;">Listen</a></p>&#13;
</td>&#13;</div>&#13;
&#13;
&#13;
</td>&#13;
<td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"></td>&#13;
</tr></table><table style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; width: 100%; clear: both !important; margin: 0; padding: 0;"><tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"><td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"></td>&#13;
<td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto; padding: 0;">&#13;
&#13;
&#13;
<div style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; max-width: 600px; display: block; margin: 0 auto; padding: 0;">&#13;
<table style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; width: 100%; margin: 0; padding: 0;"><tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"><td align="center" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">&#13;
<p style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 1.6; color: #666; font-weight: normal; margin: 0 0 10px; padding: 0;">Don't like these annoying emails? <a href='https://localhost:3000/api/users/${id}/unsubscribe' style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; color: #999; margin: 0; padding: 0;"><unsubscribe style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">Unsubscribe</unsubscribe></a>.&#13;
</p>&#13;
</td>&#13;
</tr></table></div>&#13;
&#13;
&#13;
</td>&#13;
<td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"></td>&#13;
</tr></table></body>`
  }
}
