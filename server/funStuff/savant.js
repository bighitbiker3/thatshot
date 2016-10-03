const { CLIENT_ID } = require('../constants/auth')
const { API_LOCATION } = require('../constants/server')
const Song = require('../db/models/song')
console.log(CLIENT_ID, API_LOCATION);
const request = require('request-promise')
const Promise = require('bluebird')
let usersArr = ['duvetcover', 'balconies_co', 'ollyjamesmusic', 'bl3rmusic', 'sakuraburst', 'maca-music', 'crvvcksuk', 'brothelmusic', 'tippermusic', 'colten-jackson-1', 'joeldarling']


module.exports = {
  runSavant: () => {
    return getUserLikes()
    .then(likesArr => likesArr.map(string => JSON.parse(string)))
    .then(parsedArr => parsedArr.reduce((a, b) => a.concat(b)))
    .then(flatArr => getUserFollowers(flatArr))
    .then(songObjArr => songObjArr.filter(songObj => (songObj.userInfo.followers_count < 15000)))
    .then(lessThan15kArr => lessThan15kArr.filter(songObj => (songObj.favoritings_count / songObj.playback_count > 0.39 && songObj.playback_count < 10000) || (songObj.playback_count > 10000 && songObj.comment_count > 9)))
    .then(itsFire => getNew15(itsFire))
    .then(itsFire15 => itsFire15)
    .catch(err => console.log(err))
  }
}

function getUserLikes () {
  return Promise.all(usersArr.map(username => request(`https://api.soundcloud.com/users/${username}/favorites/?client_id=${CLIENT_ID}&limit=200`).catch(e => console.log(e))))
}

function getUserFollowers(arrOfSongs){
  // console.log(arrOfSongs);
  return Promise.all(arrOfSongs.map(songObj => request(`https://api.soundcloud.com/users/${songObj.user.id}/?client_id=${CLIENT_ID}`)))
  .then(arrOfUsers => arrOfUsers.map(user => user ? JSON.parse(user) : null))
  .then(parsedArrOfUsers => arrOfSongs.map((songObj, i) => {
    let user = parsedArrOfUsers[i]
    return Object.assign(songObj, {userInfo: user})
  }))
}

function getNew15(arr){
  console.log(arr.length);
  return Promise.all(arr.map(song => Song.findOne({where: {trackId: song.id}})))
  .then(arrOfFound => arrOfFound.map(track => track ? track.trackId : null))
  .then(arrOfTrackIds => arr.filter(song => !arrOfTrackIds.includes(song.id)))
  .then(newSongs => shuffle(newSongs, 15))
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
  return arr;
}
