'use strict'

var Sequelize = require('sequelize')
var db = require('../_db')

module.exports = db.define('subscriber', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
})
