// var mongoose = require('mongoose');
var path = require('path');
var session = require('express-session');
// add models and controller vars

module.exports = function(app){
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
}