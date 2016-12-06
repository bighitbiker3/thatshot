const ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) return next()
  else res.sendStatus(401)
}


module.exports = {
  ensureAuthenticated: ensureAuthenticated
}
