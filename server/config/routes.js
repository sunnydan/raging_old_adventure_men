// var mongoose = require('mongoose');
var path = require('path');
// add models and controller vars

module.exports = function(app){
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
}