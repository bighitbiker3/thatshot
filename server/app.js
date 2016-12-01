'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = require('./routes')
const db = require('./db')
const path = require('path')
// const morgan = require('morgan') // comment out for prod?

// app.use(morgan('dev'))
app.use(express.static('dist'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.set('views', path.join(__dirname, '..', 'dist'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

console.log('listening on port 3000')

// require('./funStuff/savant').runSavant()
// require('./jobs/getSavantTracks')

require('./auth')(app, db)

app.use('/api', router)

app.get('/*', function (req, res) {
  res.render('index.html')
})

db.sync({})
// Savant()

app.listen(process.env.PORT || 3000)
