'use strict'
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

module.exports = function (app, db) {
  var User = db.model('user')

    // When passport.authenticate('local') is used, this function will receive
    // the email and password to run the actual authentication logic.
  var strategyFn = function (email, password, done) {
    console.log(email, password, 'in strategyfnnnnn')
    User.findOne({
      where: {
        email: email
      }
    })
    .then((user) => {
        // user.correctPassword is a method from the User schema.
      if (!user || !user.correctPassword(password)) done(null, false)
      else done(null, user)
    })
    .catch(done)
  }

  passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, strategyFn))

    // A POST /login route is created to handle login.
  app.post('/login', function (req, res, next) {
    var authCb = function (err, user) {
      console.log('were in authcb')
      if (err) return next(err)

      if (!user) {
        var error = new Error('Invalid login credentials.')
        error.status = 401
        return next(error)
      }

            // req.logIn will establish our session.
      req.logIn(user, function (loginErr) {
        if (loginErr) return next(loginErr)
                // We respond with a response object that has user with _id and email.
        res.status(200).send({
          user: user.sanitize()
        })
      })
    }

    passport.authenticate('local', authCb)(req, res, next)
  })
}
