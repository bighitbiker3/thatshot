'use strict'
var path = require('path')
var session = require('express-session')
var passport = require('passport')
var SequelizeStore = require('connect-session-sequelize')(session.Store)
const setSavants = require('../funStuff/setSavants')

var ENABLED_AUTH_STRATEGIES = [
  'local',
  'soundcloud'
    // 'twitter',
    // 'facebook',
    // 'google'
]

module.exports = function (app, db) {
  var dbStore = new SequelizeStore({
    db: db
  })

  var User = db.model('user')

  dbStore.sync()

  app.use(session({
    secret: 'lol',
    store: dbStore,
    resave: false,
    saveUninitialized: false
  }))

    // Initialize passport and also allow it to read
    // the request session information.
  app.use(passport.initialize())
  app.use(passport.session())
    // When we give a cookie to the browser, it is just the userId (encrypted with our secret).
  passport.serializeUser(function (user, done) {
    return done(null, user.id)
  })

    // When we receive a cookie from the browser, we use that id to set our req.user
    // to a user found in the database.
  passport.deserializeUser(function (id, done) {
    User.findById(id)
    .then(function (user) {
      return done(null, user)
    })
    .catch(done)
  })

    // We provide a simple GET /session in order to get session information directly.
    // This is used by the browser application (React/Redux) to determine if a user is
    // logged in already.
  app.get('/session', function (req, res) {
    if (req.user) {
      req.user.getSavants()
      .then(savants => {
        //return setSavants(req.user.soundcloud_id, req)
        if (!savants.length) res.send({user: req.user.sanitize(), created: true})
        else res.send({user: req.user.sanitize(), created: false})
      })
    } else {
      res.status(401).send('No authenticated user.')
    }
  })

    // Simple /logout route.
  app.get('/logout', function (req, res) {
    req.logout()
    res.status(200).end()
  })

    // Each strategy enabled gets registered.
  ENABLED_AUTH_STRATEGIES.forEach(function (strategyName) {
    require(path.join(__dirname, strategyName))(app, db)
  })
}
