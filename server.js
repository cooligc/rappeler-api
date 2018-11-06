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
Rabbit MQ Setup
*/

AMQPPublisher = require('./services/queuepublisher');
amqpPublisher = new AMQPPublisher('Hello');
amqpPublisher.publish({'name':'sitakant'});

var queueListener = require('./services/queuelistener');
amqpListener = new queueListener();
amqpListener.listen('Hello');

/*
Scheduler
*/
var scheduler = require("node-schedule");


var schedule = scheduler.scheduleJob('*/1 * * * *', function(fireDate){
  console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date());
});


/*var amqp = require('amqplib/callback_api');
var amqpConn = null;
function start() {
  amqp.connect(process.env.CLOUDAMQP_URL + "?heartbeat=60", function(err, conn) {
    if (err) {
      console.error("[AMQP]", err.message);
      return setTimeout(start, 1000);
    }
    conn.on("error", function(err) {
      if (err.message !== "Connection closing") {
        console.error("[AMQP] conn error", err.message);
      }
    });
    conn.on("close", function() {
      console.error("[AMQP] reconnecting");
      return setTimeout(start, 1000);
    });

    console.log("[AMQP] connected");
    amqpConn = conn;

    whenConnected();
  });
}

function whenConnected() {
  startPublisher();
  startWorker();
}


var pubChannel = null;
var offlinePubQueue = [];
function startPublisher() {
  amqpConn.createConfirmChannel(function(err, ch) {
    if (closeOnErr(err)) return;
    ch.on("error", function(err) {
      console.error("[AMQP] channel error", err.message);
    });
    ch.on("close", function() {
      console.log("[AMQP] channel closed");
    });

    pubChannel = ch;
    while (true) {
      var m = offlinePubQueue.shift();
      if (!m) break;
      publish(m[0], m[1], m[2]);
    }
  });
}

// method to publish a message, will queue messages internally if the connection is down and resend later
function publish(exchange, routingKey, content) {
  try {
    pubChannel.publish(exchange, routingKey, content, { persistent: true },
                       function(err, ok) {
                         if (err) {
                           console.error("[AMQP] publish", err);
                           offlinePubQueue.push([exchange, routingKey, content]);
                           pubChannel.connection.close();
                         }
                       });
  } catch (e) {
    console.error("[AMQP] publish", e.message);
    offlinePubQueue.push([exchange, routingKey, content]);
  }
}*/



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