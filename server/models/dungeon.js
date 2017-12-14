var mongoose = require('mongoose');
var User = require('./user');
var Room = require('./room');
var Schema = mongoose.Schema;

var DungeonSchema = new mongoose.Schema({
    name: {type: String, required: 'dungeons need to have names'},
    rating: {type: Number, required: 'dungeons need to have ratings'},
    _rooms: {type: Schema.Types.ObjectId, ref: 'Room'},
    _user: {type: Schema.Types.ObjectId, ref: 'User'}
})