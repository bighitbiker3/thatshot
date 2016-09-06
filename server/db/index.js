'use strict';
var db = require('./_db');
var Sequelize = require('sequelize');
module.exports = db;


var User = require('./models/user')
var Song = require('./models/song')
var UpVotes = require('./models/upvotes')
var UserSongs = db.define('userSongs', {
  isSavant: Sequelize.BOOLEAN
});

User.hasOne(Song, {foreignKey: 'postingUserId'})
User.belongsToMany(Song, {through: UserSongs})
