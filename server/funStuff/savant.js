const { CLIENT_ID } = require('../constants/auth')
const Song = require('../db/models/song')
const request = require('request-promise')
const Promise = require('bluebird')
const db = require('../db')
const User = db.model('user')

module.exports = {
  runSavant: (reqUserId) => {
    return getSavants(reqUserId)
    .then(savantArr => shuffle(savantArr))
    .then(shuffledArr => getUserLikes(shuffledArr))
    // TODO SPLIT THESE INTO VERBOSE FUNCTION NAMES FOR THE SYNC STUFF
    .then(likesArr => likesArr.map(string => JSON.parse(string).collection).reduce((a, b) => a.concat(b)))
    .then(objWithTrackArr => objWithTrackArr.map(obj => obj.track))
    .then(flatArr => flatArr.filter(songObj => (songObj.favoritings_count / songObj.playback_count > 0.39 && songObj.playback_count < 10000) || (songObj.playback_count > 10000 && songObj.comment_count > 9)))
    .then(filteredArr => getUserFollowers(filteredArr))
    .then(songObjArr => songObjArr.filter(songObj => (songObj.userInfo && songObj.userInfo.followers_count < 15000)))
    .then(itsFire => getNew15(itsFire))
    .then(newFire => newFire.filter(obj => obj))
    .then(fireTracks => getStreamUrl(fireTracks))
    .then(itsFire15 => itsFire15)
    .catch(err => console.log(err))
  }
}

function getSavants (reqUserId) {
  return User.findById(reqUserId)
  .then(user => user.getSavants())
  .then(savants => savants.map(savant => savant.soundcloud_id))
  .catch(err => console.log(err))
}

function getUserLikes (arr) {
  return Promise.all(arr.map(userId => request(`https://api-v2.soundcloud.com/users/${userId}/track_likes?&limit=200&client_id=${CLIENT_ID}`)
  .catch(err => console.log(err, 'THIS WAS AN ERROR BUT KEEP GOING LMAOOO'))))
}

function getUserFollowers (arrOfSongs) {
  return Promise.all(arrOfSongs.map(songObj => request(`https://api.soundcloud.com/users/${songObj.user.id}/?client_id=${CLIENT_ID}`)
  .catch(err => console.log(err, 'THIS WAS AN ERROR BUT KEEP GOING LMAOOO'))))
  .then(arrOfUsers => arrOfUsers.map(user => user ? JSON.parse(user) : null))
  .then(parsedArrOfUsers => arrOfSongs.map((songObj, i) => {
    let user = parsedArrOfUsers[i]
    return Object.assign(songObj, {userInfo: user})
  }))
}

function getNew15 (arr) {
  return Promise.all(arr.map(song => Song.findOne({where: {trackId: song.id}})))
  .then(arrOfFound => arrOfFound.map(track => track ? track.trackId : null))
  .then(arrOfTrackIds => arr.filter(song => !arrOfTrackIds.includes(song.id)))
  .then(newSongs => shuffle(newSongs, 9))
}

function getStreamUrl (arr) {
  return Promise.all(arr.map(song => request(`https://api.soundcloud.com/tracks/${song.id}/?client_id=${CLIENT_ID}`)
  .catch(err => console.log(err, 'THIS WAS AN ERROR BUT KEEP GOING LMAOOO'))))
  .then(arrOfSongStreams => arrOfSongStreams.filter(song => song))
  .then(arrOfSongStreams => arrOfSongStreams.map(song => JSON.parse(song)))
  .then(arrOfSongStreams => arr.map((song, i) => {
    if (arrOfSongStreams[i]) {
      song.stream_url = arrOfSongStreams[i].stream_url
      return song
    }
  }))
}

function shuffle (arr, size) {
  let currentIndex = size || arr.length
  arr = arr.filter(thing => {
    if (thing) return thing
  })
  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    let holder = arr[currentIndex]
    arr[currentIndex] = arr[randomIndex]
    arr[randomIndex] = holder
  }
  if (size) arr.length = size
  arr.length = 9
  return arr
}
