'use strict'
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io').listen(server)
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = require('./routes')(io)
const db = require('./db')
const path = require('path')
const morgan = require('morgan') // comment out for prod?

app.use(morgan('dev'))
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

app.use('/images/:image', (req, res) => {
  console.log(req.params.image, 'hereeeeeeee');
  res.sendFile(path.join(__dirname, '..', `images/${req.params.image}`))
})

app.use('/api', router)

app.get('/*', function (req, res) {
  res.render('index.html')
})

db.sync(process.env === 'production' ? {/* nothing goes in here*/} : {})
// Savant()

server.listen(process.env.PORT || 3000)
