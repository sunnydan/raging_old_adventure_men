// Create an Express App
var express = require('express');
var app = express();
var session = require("express-session");
app.use(session({secret: "iwannabeagamedeveloper"}));

// Require path
var path = require('path');
// Setting our Static Folder Directories
app.use(express.static(path.join(__dirname, './static')));
app.use(express.static(path.join(__dirname, './node_modules')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

// var mongoose = require('mongoose');
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
//mongoose.connect('mongodb://localhost/basic_mongoose');

// Use native promises
// mongoose.Promise = global.Promise;

app.get('/', function(req, res) {
    res.render('mainmenu');
})

app.get('/game', function(req, res) {
    res.render('game');
})

app.get('/createroom', function(req, res) {
    res.render('createroom');
})

app.get('/createchar', function (req, res) {
    res.render('createchar');
})


app.listen(8000, function() {
    console.log("listening on port 8000");
});