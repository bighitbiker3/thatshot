'use strict'
var db = require('./_db')
module.exports = db

var User = require('./models/user')
var Song = require('./models/song')
var Subscriber = require('./models/subscriber')
var scAuthToken = require('./models/scAuthToken')

// scAuthToken.sync({force: true})

Song.belongsToMany(User, {through: 'UpVotes', as: 'UpVotingUsers'})
User.belongsToMany(Song, {through: 'UpVotes', as: 'UpVotedSongs'})
Song.belongsTo(User, {foreignKey: 'userId'})
User.hasOne(scAuthToken)
User.hasMany(Song)
