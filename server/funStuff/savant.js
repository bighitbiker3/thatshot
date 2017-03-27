const { CLIENT_ID, CLIENT_ID_DUP1, CLIENT_ID_DUP2 } = require('../constants/auth')
const Song = require('../db/models/song')
const axios = require('axios')
const axiosRetry = require('axios-retry')
const Promise = require('bluebird')
const _ = require('lodash')
const db = require('../db')
const User = db.model('user')

axiosRetry(axios, { retries: 10 })

module.exports = {
  runSavant: (reqUserId) => {
    return getSavants(reqUserId)
    .then(savantArr => shuffle(shuffle(shuffle(savantArr)))) // lol (for good measure 3 is my lucky num)
    .then(shuffledArr => getUserLikes(shuffledArr.filter(s => s)))
    // TODO SPLIT THESE INTO VERBOSE FUNCTION NAMES FOR THE SYNC STUFF
    .then(likesArr => likesArr.map(data => data.collection).reduce((a, b) => a.concat(b)))
    .then(objWithTrackArr => shuffle(objWithTrackArr, objWithTrackArr.length).map(obj => obj.track))
    .then(flatArr => flatArr.filter(songObj => (songObj.favoritings_count / songObj.playback_count > 0.39 && songObj.playback_count < 10000) || (songObj.playback_count > 10000 && songObj.comment_count > 9)))
    .then(hotSongs => {
      console.log(hotSongs, 'herrrrrrrrrrrrrrrrrrrrrrrr');
      return hotSongs.filter(song => {
        console.log(song.title, song);
        const title = song.title.toLowerCase()
        console.log(title, 'here')
        if (!title.includes('preview') && !title.includes('sample pack') && !title.includes('teaser')) return song
      })
    })
    .then(filteredArr => getUserFollowers(filteredArr))
    .then(songObjArr => shuffle(songObjArr, songObjArr.length).filter(songObj => (songObj.userInfo && songObj.userInfo.followers_count < 15000)))
    .then(itsFire => getNew(itsFire))
    .then(newFire => newFire.filter(obj => obj))
    .then(fireTracks => getStreamUrl(fireTracks))
    .then(itsFire15 => itsFire15.filter(obj => obj))
    .catch(err => console.log(err))
  }
}

function getSavants (reqUserId) {
  return User.findById(reqUserId)
  .then(user => user.getUserSavants())
  .then(savants => savants.map(savant => savant.soundcloud_id))
  .catch(err => console.log(err))
}

function getUserLikes (arr) {
  console.log('lolllllllllllllllllll')
  return Promise.all(arr.map(userId => axios.get(`https://api-v2.soundcloud.com/users/${userId}/track_likes?&limit=200&client_id=${CLIENT_ID_DUP1}`)
    .catch(err => console.log(err, 'THIS WAS AN ERROR get user likes BUT KEEP GOING LMAOOO'))))
  .then(arrOfResp => arrOfResp.map(resp => resp.data))
}

function getUserFollowers (arrOfSongs) {
  return Promise.all(arrOfSongs.map(songObj => axios.get(`https://api.soundcloud.com/users/${songObj.user.id}/?client_id=${CLIENT_ID}`, {timeout: 60000})
    .catch(err => console.log(err, 'THIS WAS AN ERROR get user followers BUT KEEP GOING LMAOOO'))))
  .then(responses => responses.filter(r => r))
  .then(arrOfResp => arrOfResp.map(resp => resp.data).filter(user => user))
  .then(arrOfUsers => {
    const userObj = {}
    arrOfUsers.forEach(user => (userObj[user.id] = user))
    return userObj
  })
  .then(userObj => arrOfSongs.map((songObj) => {
    const songUserId = songObj.user.id
    return Object.assign(songObj, {userInfo: userObj[songUserId]})
  }))
}

function getNew (arr) {
  return Promise.all(arr.map(song => Song.findOne({where: {trackId: song.id}})))
  .then(arrOfFound => arrOfFound.map(track => track ? track.trackId : null))
  .then(arrOfTrackIds => arr.filter(song => !arrOfTrackIds.includes(song.id)))
  .then(newSongs => _.uniqBy(newSongs, 'id')) // filter only unique vals
  .then(newSongs => shuffle(newSongs, newSongs.length))
}

function getStreamUrl (arr) {
  return Promise.all(arr.map(song => axios.get(`https://api.soundcloud.com/tracks/${song.id}/?client_id=${CLIENT_ID_DUP2}`)
  .catch(err => console.log(err, 'THIS WAS AN ERROR getting streams BUT KEEP GOING LMAOOO'))))
  .then(arrOfSongStreams => arrOfSongStreams.filter(song => song))
  .then(arrOfSongStreams => arrOfSongStreams.map(song => song.data))
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
  else arr.length = 9
  return arr
}
