'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = require('./routes');
var Models = require('./db');
var path = require('path')


app.use(express.static('dist'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, '..', 'dist'));
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');


console.log("listening on port 3000");

app.use('/api', router)

app.get('/*', function (req, res) {
    res.render('index.html');
});



Models.sync();

app.listen(3000);
