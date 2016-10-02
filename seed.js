const db = require('./server/db')
const Song = db.model('song')
const User = db.model('user')
const UpVotes = db.model('upvotes')
const request = require('request-promise')
const Promise = require('bluebird')
const Chance = require('chance')
const chance = new Chance()

// Add some users
function createUserArray () {
  let userArray = []
  for (let i = 0; i < 100; i++) {
    let email = chance.email()
    let password = chance.string()
    let username = chance.string()
    let firstName = chance.first()
    let lastName = chance.last()
    let isSavant = i % 10 === 0 ? true : false
    userArray.push({email: email, password: password, firstName: firstName, lastName: lastName, username: username, isSavant: isSavant})
  }
  return userArray
}

function createUpVoteArray () {
  let upvoteArr = []
  for (let i = 0; i < 50; i++) {
    let user_id = chance.integer({min: 1, max: 100})
    let song_id = chance.integer({min: 1, max: 50})
    upvoteArr.push({user_id: user_id, song_id: song_id})
  }
  return upvoteArr
}

const songToAdd = {
  'artwork_url': 'https://i1.sndcdn.com/artworks-000170281119-ewopjn-large.jpg',
  'duration': 150452,
  'genre': 'World',
  'trackId': 272372880,
  'permalink_url': 'http://soundcloud.com/thouxanban/still-kickin-on-go-ft-playboicarti',
  'reposts_count': 0,
  'title': 'Still Kickin/ On GO ft. PlayboiCarti',
  'artist': 'THOUXANBANFAUNI',
  'artist_uri': 'https://api.soundcloud.com/users/43412991',
  'artist_permalink': 'http://soundcloud.com/thouxanban',
  'stream_url': 'https://api.soundcloud.com/tracks/272372880/stream',
  'artist_id': 43412991,
  'waveform_url': 'https://w1.sndcdn.com/gANs7fKZggqX_m.png',
  'upvotes': 11,
  'playback_count': 16091,
  'createdAt': '2016-09-02T16:00:27.162Z',
  'updatedAt': '2016-09-03T14:37:57.828Z'
}

function seed (id) {
  return User.findById(1)
  .then(user => {
    return user.createSong({
      'artwork_url': 'https://i1.sndcdn.com/artworks-000170281119-ewopjn-large.jpg',
      'duration': 150452,
      'genre': 'World',
      'trackId': 272372880,
      'permalink_url': 'http://soundcloud.com/thouxanban/still-kickin-on-go-ft-playboicarti',
      'reposts_count': 0,
      'title': 'Still Kickin/ On GO ft. PlayboiCarti',
      'artist': 'THOUXANBANFAUNI',
      'artist_uri': 'https://api.soundcloud.com/users/43412991',
      'artist_permalink': 'http://soundcloud.com/thouxanban',
      'stream_url': 'https://api.soundcloud.com/tracks/272372880/stream',
      'artist_id': 43412991,
      'waveform_url': 'https://w1.sndcdn.com/gANs7fKZggqX_m.png',
      'upvotes': 11,
      'playback_count': 16091,
      'createdAt': '2016-09-02T16:00:27.162Z',
      'updatedAt': '2016-09-03T14:37:57.828Z'
    })
  })
}

// for(let i = 0; i < 10; i++){
//   seed(i);
//   seed(i*3);
//   seed(i*9)
// }

Promise.all(createUserArray().map(user => User.create(user)))
.then(users => {
  return Promise.all([users, request.get('https://api.soundcloud.com/users/17826556/favorites/?client_id=622c5a5338becb1365fb57b6bdc97f09')])
})
.spread((users, songs) => {
  songs = JSON.parse(songs)
  return songs
})
.then(data => {
  return Promise.all(data.map(song => Song.create({artwork_url: song.artwork_url, duration: song.duration, genre: song.genre, trackId: song.id, permalink_url: song.permalink_url, reposts_count: song.reposts_count, title: song.title, artist: song.user.username, artist_uri: song.user.uri, playback_count: song.playback_count, artist_permalink: song.user.permalink_url, stream_url: song.stream_url, artist_id: song.user.id, waveform_url: song.waveform_url})))
})
.then(() => Promise.all(createUpVoteArray().map(obj => UpVotes.create(obj))))
.catch(err => console.log(err))

// .then(users => {
//   users.forEach(user => seed(user.id))
// })

// Add some tunes
