'use strict'
const db = require('./_db')
module.exports = db

const User = require('./models/user')
const Song = require('./models/song')
const Subscriber = require('./models/subscriber')
const UserSavantTracks = require('./models/userSavantTracks')
const Savant = require('./models/savant')


Song.belongsToMany(User, {through: 'UpVotes', as: 'UpVotingUsers'})
Song.belongsToMany(User, {through: UserSavantTracks, as: 'UserSavantTracks'})
Song.belongsTo(User, {foreignKey: 'userId'})

User.belongsToMany(Song, {through: 'UpVotes', as: 'UpVotedSongs'})
User.belongsToMany(Song, {through: UserSavantTracks, as: 'UserSavantTracks'})
User.belongsToMany(Savant, {through: 'userSavants'})

UserSavantTracks.belongsTo(User)
UserSavantTracks.belongsTo(Song)
