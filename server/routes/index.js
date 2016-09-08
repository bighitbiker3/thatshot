var express = require('express');
var router = express.Router();
var db = require('../db');
var User = db.model('user')
var Song = db.model('song');
var UpVotes = db.model('upvotes')
var Promise = require('bluebird');


router.get('/songs', function (req, res, next) {
  Song.findAll({
    include: [User]
  })
  .then(songs => {
    let key = Object.keys(req.query)
    let filteredSongs = songs.filter(obj => {
      console.log(obj.user[key], req.query[key]);
      console.log(obj.user[key] == Boolean(req.query[key]));
      obj.user[key]

    })
    res.json(filteredSongs)
  })
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
  .then(user => {
    console.log('THIS IS USER ON SERVER ', user);
    return user ? console.log('user already in there') : User.create(req.body)
  })
  .then(newUser => {
     console.log('THIS IS NEW USER ON SERVER', newUser);
     res.send(newUser)
  })
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
