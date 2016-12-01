const express = require('express')
const router = express.Router()
const db = require('../../db')

const Subscriber = db.model('subscriber')

// ADD SUBSCRIBER
router.post('/subscribers', function (req, res, next) {
  Subscriber.create(req.body)
  .then(newSub => res.send(newSub))
  .catch(next)
})

module.exports = router
