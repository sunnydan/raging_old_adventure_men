var mongoose = require('mongoose');
var uniqueVal = require('mongoose-unique-validator');
var bcrypt = require('bcrypt');
var Room = require('./room');
var Dungeon = require('./dungeon');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    userName: {type: String, unique:true, required: [true, 'User Name can not be empty']},
    password: {type: String, required: [true, 'Password can not be empty']},
    pwConfirm: {type: String, required: [true, 'PPassword confirmation must not be empty'], validate: {
        validator: function(value){
            return value === this.password;
        },
        message: 'Password and password confirmation must match'
    }},
    _rooms: [{type: mongoose.Schema.Types.ObjectId, ref: 'Room'}],
    _dungeons: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dungeon'}],
    {timestamps:true});
    UserSchema.plugin(uniqueVal);
    UserSchema.methods.hash = function(password){
        return bcrypt.hashSync(password,bcrypt.genSaltSync(8));
    }
        
    UserSchema.methods.match = function(formPass,password){
        return bcrypt.compareSync(formPass,password);
    }
    
    UserSchema.pre("save", function(done){
        console.log('pre');
        this.password = this.hash(this.password);
        this.password_confirmation = undefined;
        done();
})
mongoose.model('User', UserSchema);