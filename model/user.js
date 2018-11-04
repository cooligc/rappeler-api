var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var user = new schema({
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    gender:{
        type: String
    },
    mobile:{
        type: String,
        unique: true
    },
    email:{
        type: String,
        unique: true
    },
    username:{
        type: String,
        unique: true
    },
    password:{
        type: String
    }
});

module.exports = mongoose.model('user',user);