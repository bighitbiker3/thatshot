'use strict';
var db = require('./_db');
var Sequelize = require('sequelize');
module.exports = db;


var User = require('./models/user')
var Song = require('./models/song')
var UpVotes = require('./models/upvotes')


User.hasMany(Song)
Song.belongsTo(User, {foreignKey: 'userId'})
