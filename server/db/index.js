'use strict'
const db = require('./_db')
module.exports = db

const User = require('./models/user')
const Song = require('./models/song')
const Subscriber = require('./models/subscriber')
const scAuthToken = require('./models/scAuthToken')
const Savant = require('./models/savant')

// scAuthToken.sync({force: true})

Song.belongsToMany(User, {through: 'UpVotes', as: 'UpVotingUsers'})
Song.belongsTo(User, {foreignKey: 'userId'})

User.belongsToMany(Song, {through: 'UpVotes', as: 'UpVotedSongs'})
User.hasOne(scAuthToken)
User.hasMany(Song)
User.hasMany(Savant)
