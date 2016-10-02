'use strict'
var Sequelize = require('sequelize')

var db = require('../_db')

module.exports = db.define('upvotes', {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  song_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})
