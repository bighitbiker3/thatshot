'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var router = require('./routes');
var db = require('./db');
var path = require('path');
var app = express();

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, '..', 'dist'));
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');


console.log("listening on port 3000");

var auth = require('./auth')(app, db)
app.use('/api', router)

app.get('/*', function (req, res) {
    res.render('index.html');
});



db.sync();

app.listen(3000);
