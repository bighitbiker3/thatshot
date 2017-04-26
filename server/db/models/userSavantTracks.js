const Sequelize = require('sequelize')
const db = require('../_db')
module.exports = db.define('userSavantTracks', {
  posted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  posted_date: {
    type: Sequelize.DATE
  }
})
