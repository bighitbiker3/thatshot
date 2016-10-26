const { CLIENT_ID } = require('../constants/auth')
const { API_LOCATION } = require('../constants/server')
const Song = require('../db/models/song')
const request = require('request-promise')
const Promise = require('bluebird')
let usersArr = ['duvetcover', 'balconies_co', 'ollyjamesmusic', 'bl3rmusic', 'sakuraburst', 'maca-music', 'crvvcksuk', 'brothelmusic', 'iamspont']
let usersArrIds = [22158004, 44180050, 58544051, 66089549, 42680724, 44776911, 40811082, 24980742, 136833642]

module.exports = {
  runSavant: () => {
    return getUserLikes(shuffle(usersArrIds))
    .then(likesArr => likesArr.map(string => JSON.parse(string).collection).reduce((a, b) => a.concat(b)))
    .then(objWithTrackArr => objWithTrackArr.map(obj => obj.track))
    .then(flatArr => flatArr.filter(obj => obj))
    .then(flatArr => getUserFollowers(flatArr))
    .then(songObjArr => songObjArr.filter(songObj => (songObj.userInfo.followers_count < 15000)))
    .then(lessThan15kArr => lessThan15kArr.filter(songObj => (songObj.favoritings_count / songObj.playback_count > 0.39 && songObj.playback_count < 10000) || (songObj.playback_count > 10000 && songObj.comment_count > 9)))
    .then(itsFire => getNew15(itsFire))
    .then(fireTracks => getStreamUrl(fireTracks))
    .then(itsFire15 => itsFire15)
    .catch(err => console.log(err))
  }
}

function getUserLikes (arr) {
  return Promise.all(arr.map(userId => request(`https://api-v2.soundcloud.com/users/${userId}/track_likes?&limit=100&client_id=${CLIENT_ID}`).catch(e => console.log(e))))
}

function getUserFollowers(arrOfSongs){
  return Promise.all(arrOfSongs.map(songObj => request(`https://api.soundcloud.com/users/${songObj.user.id}/?client_id=${CLIENT_ID}`)))
  .then(arrOfUsers => arrOfUsers.map(user => user ? JSON.parse(user) : null))
  .then(parsedArrOfUsers => arrOfSongs.map((songObj, i) => {
    let user = parsedArrOfUsers[i]
    return Object.assign(songObj, {userInfo: user})
  }))
}

function getNew15(arr){
  return Promise.all(arr.map(song => Song.findOne({where: {trackId: song.id}})))
  .then(arrOfFound => arrOfFound.map(track => track ? track.trackId : null))
  .then(arrOfTrackIds => arr.filter(song => !arrOfTrackIds.includes(song.id)))
  .then(newSongs => shuffle(newSongs, 15))
}

function getStreamUrl(arr){
  return Promise.all(arr.map(song => request(`https://api.soundcloud.com/tracks/${song.id}/?client_id=${CLIENT_ID}`)))
  .then(arrOfSongStreams => arrOfSongStreams.map(song => JSON.parse(song)))
  .then(arrOfSongStreams => arr.map((song, i) => {
    song.stream_url = arrOfSongStreams[i].stream_url
    return song
  }))
}

function shuffle(arr, size){
  let currentIndex = size || arr.length

  while(currentIndex !== 0) {
    console.log(currentIndex);
    let randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    let holder = arr[currentIndex]
    arr[currentIndex] = arr[randomIndex]
    arr[randomIndex] = holder
  }
  if(size) arr.length = size;
  console.log(arr);
  return arr;
}
