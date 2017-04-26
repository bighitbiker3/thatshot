const Sequelize = require('sequelize')
const db = require('../_db')
module.exports = db.define('userSavants', {
  degree: {
    type: Sequelize.INTEGER
  }
})
