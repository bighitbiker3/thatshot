'use strict'
var crypto = require('crypto')
var _ = require('lodash')
var Sequelize = require('sequelize')

var db = require('../_db')
var Song = require('./song')

module.exports = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  twitter_id: {
    type: Sequelize.STRING
  },
  facebook_id: {
    type: Sequelize.STRING
  },
  google_id: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true

  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isSavant: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  score: {
    type: Sequelize.VIRTUAL,
    allowNull: false,
    defaultValue: 0
  }

}, {
  instanceMethods: {
    sanitize: function () {
      return _.omit(this.toJSON(), ['password', 'salt'])
    },
    correctPassword: function (candidatePassword) {
      return this.Model.encryptPassword(candidatePassword, this.salt) === this.password
    },
    changePassword: function (password) {
      return this.setDataValue('password', this.Model.encryptPassword(password, this.salt))
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
    beforeCreate: function (user) {
      user.salt = user.Model.generateSalt()
      user.password = user.Model.encryptPassword(user.password, user.salt)
    },
    beforeUpdate: function (user) {
      if (user.changed('password')) {
        user.salt = user.Model.generateSalt()
        user.password = user.Model.encryptPassword(user.password, user.salt)
      }
    },
    afterFind: function (user) {
      if (user) {
        return Song.findAll({where: {userId: user.id}})
            .then(songArr => {
              user.set('score', songArr.reduce((a, b) => { return a + b.upvotes }, 0))
            })
      }
    }
  }
})
