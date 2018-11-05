var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

var mongo_url = process.env.DB || 'mongodb://localhost:27017/rappeler'

/*if(process.env.ENV == 'Test'){
    db = mongoose.connect();
}else{
    db = mongoose.connect();
}*/ 
db = mongoose.connect(mongo_url);

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var apiRouter = express.Router();

/*
Application models
*/
var user = require('./model/user');
var reminder = require('./model/reminder')

/*
Application Routes
*/
var userApi = require('./routers/userRouters')(user);
var reminderApi = require('./routers/reminderRouter')(reminder);



/*
Route Registration
*/
app.use('/api/users',userApi);
app.use('/api/reminders',reminderApi);

/*
Application bootstrap
*/
app.listen(port,function(){
	console.log('Reppler Application running on port='+port);
})

module.exports=app;