var db = require('../_db')
var Sequelize = require('sequelize')
var UpVotes = require('./upvotes')

module.exports = db.define('song', {
  artwork_url: {
    type: Sequelize.STRING,
    allowNull: true

  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: true
  },
  tag_list: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  trackId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
  permalink_url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  reposts_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  artist: {
    type: Sequelize.STRING,
    allowNull: false
  },
  artist_uri: {
    type: Sequelize.STRING,
    allowNull: false
  },
  artist_permalink: {
    type: Sequelize.STRING,
    allowNull: false
  },
  stream_url: {
    type: Sequelize.STRING,
    allowNull: true
  },
  artist_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  waveform_url: {
    type: Sequelize.STRING,
    allowNull: true
  },
  upvotes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  playback_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  instanceMethods: {
    upvote: function () {
      let newUpvotes = this.upvotes + 1
      return this.set('upvotes', newUpvotes)
    }
  },
  indexes: [
    {
      type: 'FULLTEXT',
      fields: ['createdAt'],
      concurrently: true
    }
  ]
})
