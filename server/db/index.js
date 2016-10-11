'use strict'
var db = require('./_db')
module.exports = db

var User = require('./models/user')
var Song = require('./models/song')

Song.belongsToMany(User, {through: 'UpVotes', as: 'UpVotingUsers'})
User.belongsToMany(Song, {through: 'UpVotes', as: 'UpVotedSongs'})
Song.belongsTo(User, {foreignKey: 'userId'})
User.hasMany(Song)
