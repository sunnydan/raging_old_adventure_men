// Create an Express App
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var session = require("express-session");
app.use(session({secret: "iwannabeagamedeveloper"}));
//Custom Modules
var avatarLib = require("./avatar.js")

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
    if(req.session.avatar) {
        console.log(req.session.avatar)
        res.render('mainmenu',{avatar:JSON.stringify(req.session.avatar)});
    }
    else res.render('mainmenu',{avatar:null});
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
app.get('/charagen',function(req,res){
    res.render('new_player',{
        races:avatarLib.races,
        gender:avatarLib.gender,
        hair_styles:avatarLib.hair_styles,
        hair_colors:avatarLib.hair_colors,
        beards:avatarLib.beards
    });
})
app.post('/avatars',function(req,res){
    let avatar = {
        reason:req.body.name,
        race:req.body.race,
        gender:req.body.gender,
        hair_style: req.body.hair_style,
        hair_color:req.body.hair_color,
        beard:req.body.beard
    };
    req.session.avatar = avatar
    res.redirect('/')
})
app.get("/clearAvatar",function(req,res){
    req.session.avatar=null;
    res.redirect('/')
})


app.listen(8000, function() {
    console.log("listening on port 8000");
});