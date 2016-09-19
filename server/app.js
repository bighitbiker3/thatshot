'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var router = require('./routes');
var db = require('./db');
var path = require('path');
var morgan = require('morgan')

app.use(morgan('dev'))
app.use(express.static('dist'));
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, '..', 'dist'));
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');


console.log("listening on port 3000");


require('./auth')(app, db);

app.use('/api', router);

app.get('/*', function (req, res) {
    res.render('index.html');
});



db.sync({});

app.listen(3000);
