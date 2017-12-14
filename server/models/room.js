var mongoose = require('mongoose');
var user = require('./user');
var dungeon = require('./dungeon');
var Schema = mongoose.Schema;


var RoomSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: [true, 'room must have a name']},
    rating: {type: Number, required: [true, 'the room must have a rating']},
    northtype: {type: String},
    southtype: {type: String},
    easttype: {type: String},
    westtype: {type: String},
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    _dungeon: {type: Schema.Types.ObjectId, ref: 'Dungeon'}
});
mongoose.model('Room', RoomSchema);