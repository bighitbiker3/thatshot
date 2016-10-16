const Sequelize = require('sequelize')
const db = require('../_db')

module.exports = db.define('scAuthToken', {
  access_token: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

