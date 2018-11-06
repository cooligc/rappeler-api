AMQPListener = function(){
	console.log('Listener instance created');
}

AMQPListener.prototype.listen = function(queue){
	console.log('Queue name = '+queue);
}


module.exports=AMQPListener;