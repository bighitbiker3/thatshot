const express = require('express')
const router = express.Router()
const db = require('../../db')
const User = db.model('user')
const Song = db.model('song')

// FIND SONGS BY ARTIST
router.get('/:artistName/songs', function (req, res, next) {
  Song.findAll({
    where: {
      artist: {
        $iLike: req.params.artistName
      }
    },
    include: [{model: User, where: req.query}]
  })
  .then(songs => res.json(songs))
  .catch(next)
})

module.exports = router
