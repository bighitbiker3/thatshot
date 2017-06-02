const passport = require('passport')
const SoundCloudStrategy = require('passport-soundcloud').Strategy
const refresh = require('passport-oauth2-refresh')
const iswebview = require('is-webview')
const env = require('../env')
const clientID = env.SOUNDCLOUD.clientID
const clientSecret = env.SOUNDCLOUD.clientSecret
const callbackURL = env.SOUNDCLOUD.callbackUrl
const callbackRoute = env.SOUNDCLOUD.callbackRoute

module.exports = function (app, db) {
  const User = db.model('user')
  const strategy = new SoundCloudStrategy({
    clientID,
    clientSecret,
    callbackURL
  }, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({
      where: {
        soundcloud_id: profile.id
      },
      defaults: {
        username: profile._json.username,
        soundcloud_accessToken: accessToken,
        soundcloud_refreshToken: refreshToken
      }
    })
    .spread((user, created) => {
      user.created = created
      done(null, user)
    })
    .catch(err => {
      done(err, null)
    })
  })
  passport.use(strategy)
  refresh.use(strategy)

  app.get('/login/soundcloud/refresh', (req, res, next) => {
    refresh.requestNewAccessToken('soundcloud', req.user.soundcloud_refreshToken, (err, accessToken, refreshToken) => {
      User.findOne({where: { id: req.user.id }})
      .then(user => {
        return user.update({
          soundcloud_accessToken: accessToken,
          soundcloud_refreshToken: refreshToken
        })
      })
      .then(user => user)
      .catch(next)
    })
  })

  app.get('/login/soundcloud', function (req, res, next) {
    console.log(callbackURL, 'Callback URL')
    passport.authenticate('soundcloud')(req, res, next)
  })

  app.get(callbackRoute, passport.authenticate('soundcloud', { failureRedirect: '/wrong' }), (req, res) => {
    if (iswebview(req.headers['user-agent']) || iswebview(req.headers['User-Agent'])) {
      res.redirect(`thatshot://success`)
    } else {
      res.redirect('/')
    }
  })
}

