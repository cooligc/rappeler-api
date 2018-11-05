var mongoose = require('mongoose'),
    schema = mongoose.Schema;
var uuid = require('node-uuid');

var reminder = new schema({
    _id: { type: String, default: uuid.v1},
    time:{
        type: String,
        require: true
    },
    timeZone:{
        type: String
    },
    username:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    prefComm:{
        type: String,
        require: true,
    },
    status:{
        type: String
    },
    isRepeated: {
        type: Boolean
    }
});

module.exports = mongoose.model('reminder',reminder);