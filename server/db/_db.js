var path = require('path')
var Sequelize = require('sequelize')

var env = require(path.join(__dirname, '../env'))
var db = new Sequelize(env.DATABASE_URL, { host: '127.0.0.1', dialect: 'postgres', logging: env.LOGGING })

module.exports = db
