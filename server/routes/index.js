'use strict'
const express = require('express')
const router = express.Router()
const songsRouter = require('./routers/songs')
const artistsRouter = require('./routers/artists')
const usersRouter = require('./routers/users')
const subscribersRouter = require('./routers/subscribers')


router.use('/songs', songsRouter)
router.use('/artists', artistsRouter)
router.use('/users', usersRouter)
router.use('/subscribers', subscribersRouter)

// USER IS ON REQ.USER

// ENSURE AUTH


module.exports = router
