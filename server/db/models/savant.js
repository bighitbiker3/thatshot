'use strict'

var Sequelize = require('sequelize')
var db = require('../_db')

module.exports = db.define('savant', {
  soundcloud_id: {
    type: Sequelize.INTEGER,
    allowNull: false
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
    type: Sequelize.TEXT
  },
  city: {
    type: Sequelize.STRING
  }

})
