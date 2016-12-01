'use strict'

var Sequelize = require('sequelize')
var db = require('../_db')

module.exports = db.define('savant', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
  permalink: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  avatar_url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  }

})
