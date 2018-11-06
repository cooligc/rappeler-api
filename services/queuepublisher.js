var amqp = require('amqplib/callback_api');
var amqpConn = null;

const AMQP_URL = process.env.CLOUDAMQP_URL || 'amqp://test:test@localhost'

/*AMQPPublisher = function(queueName){
	console.log('Queue Name = '+ queueName);
	this.queueName = queueName;
	console.log('Publisher instantiate for queue = '+ this.queueName);
}

AMQPPublisher.prototype.publish = function(queue, data){
	console.log('Publishing the data to '+ queue + ' data='+JSON.stringify(data));
}

AMQPPublisher.prototype.start = function(data){
	console.log('Starting to publish the data to Queue ')
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
    this.publish(this.queueName,data)
  });
}*/

class AMQPPublisher {
    constructor(queueName) {
        this._queueName = queueName;
    }

    set queueName(queueName) {
        this._queueName = queueName;
    }

    get queueName() {
        return this._queueName;
    }

    publish(data) {

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
            amqpConn =  conn;
        });

        console.log('Connections '+ amqpConn);

        console.log('Publishing the data to ' + this.queueName + ' data=' + JSON.stringify(data));


        amqpConn.createConfirmChannel(function(err, queueName) {
            if (closeOnErr(err)) return;
            ch.on("error", function(err) {
                console.error("[AMQP] channel error", err.message);
            });
            ch.on("close", function() {
                console.log("[AMQP] channel closed");
            });

            pubChannel = ch;
            while (true) {
                var [exchange, routingKey, content] = offlinePubQueue.shift();
                publish(exchange, routingKey, content);
            }
        });

    }

    _health(data) {
        console.log('Starting to publish the data to Queue ')
        return amqp.connect(process.env.CLOUDAMQP_URL + "?heartbeat=60", function(err, conn) {
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
            return conn;
        });
    }
}


module.exports=AMQPPublisher;