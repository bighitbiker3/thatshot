'use strict'
var crypto = require('crypto')
var _ = require('lodash')
var Sequelize = require('sequelize')

var db = require('../_db')
var Song = require('./song')

module.exports = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: true

  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  is_savant: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  score: {
    type: Sequelize.VIRTUAL,
    allowNull: false,
    defaultValue: 0
  },
  soundcloud_id: {
    type: Sequelize.INTEGER
  },
  soundcloud_accessToken: {
    type: Sequelize.STRING,
    allowNull: false
  },
  soundcloud_refreshToken: {
    type: Sequelize.STRING,
    allowNull: false
  }

}, {
  instanceMethods: {
    sanitize: function () {
      return this.toJSON()
      // return _.omit(this.toJSON(), ['password', 'salt'])
    }
  },
  classMethods: {
    generateSalt: function () {
      return crypto.randomBytes(16).toString('base64')
    },
    encryptPassword: function (plainText, salt) {
      var hash = crypto.createHash('sha1')
      hash.update(plainText)
      hash.update(salt)
      let final = hash.digest('hex')
      return final
    }
  },
  hooks: {
    afterFind: function (user) {
      if (user && !Array.isArray(user)) {
        return Song.findAll({where: {userId: user.id}})
            .then(songArr => {
              user.set('score', songArr.reduce((a, b) => { return a + b.upvotes }, 0))
            })
      }
    }
  }
})
