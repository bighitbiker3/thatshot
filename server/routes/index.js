'use strict'
const express = require('express')
const router = express.Router()
const songsRouter = require('./routers/songs')
const artistsRouter = require('./routers/artists')
const usersRouter = require('./routers/users')

module.exports = (io) => {
  router.use('/songs', songsRouter(io))
  router.use('/artists', artistsRouter)
  router.use('/users', usersRouter(io))
  return router
}
