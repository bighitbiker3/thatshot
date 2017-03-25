'use strict'
const express = require('express')
const router = express.Router()
const songsRouter = require('./routers/songs')
const artistsRouter = require('./routers/artists')
const usersRouter = require('./routers/users')
const subscribersRouter = require('./routers/subscribers')

module.exports = (io) => {
  router.use('/songs', songsRouter(io))
  router.use('/artists', artistsRouter)
  router.use('/users', usersRouter(io))
  router.use('/subscribers', subscribersRouter)
  return router
}
