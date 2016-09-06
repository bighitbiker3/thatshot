var express = require('express');
var router = express.Router();
var db = require('../db');
var User = db.model('user')
var Song = db.model('song');
var UserSongs = db.model('userSongs')
var UpVotes = db.model('upvotes')
var Promise = require('bluebird');


router.get('/songs', function (req, res, next) {
  UserSongs.findAll({
    where: req.query
  })
  .then(data => Promise.all(data.map(userSong => Song.findById(userSong.songId))))
  .then(songs => res.json(songs))
  .catch(next)
});

router.post('/songs/:trackId/:userId/upvote', function(req, res, next) {
  UpVotes.findOne({where: {song_id: req.params.trackId, user_id: req.params.userId}})
  .then(result => {
    if(!result) {
      UpVotes.create({song_id: req.params.trackId, user_id: req.params.userId})
      .then(() => Song.findById(req.params.trackId))
      .then(song => song.upvote(req.params.userId))
      .then(updated => {
        return updated.save()
      })
      .then(track => res.send(track))    }
    else {
      res.send(false)
    }
  })
  .catch(next)
});

router.post('/songs/:userId/:trackId', function(req, res, next){
  Song.findOne({
    where: {trackId: req.params.trackId}
  })
  .then(song => {
    if(song) res.send(null)
    else return User.findById(req.params.userId)
  })
  .then(user => user.createSong(req.body, {isSavant: false}))
  .then(song => res.send(song))
  .catch(next)
});






router.post('/users', function(req, res, next){
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => user ? console.log('user already in there') : User.create(req.body))
  .then(newUser => res.send(newUser))
  .catch(next)
});

router.post('/users/auth', function(req, res, next){
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => user ? Promise.all([user, user.correctPassword(req.body.password)]) : console.log('no user found'))
  .spread((user, correctPassword) => correctPassword ? res.send(user) : console.log('pw incorrect'))
  .catch(next)
});




module.exports = router;
