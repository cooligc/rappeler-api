var reminderController = function(reminder) {
    var post = function(req, res) {
        var reminder2 = new reminder(req.body);
        console.log('Reminder details '+JSON.stringify(req.body));
        //TODO More nos of check
        if (!req.body.description) {
            res.status(400);
            res.send('Description is required')
        } else {
            console.log(reminder2);
            reminder2.save(function(err) {
            	if(err){	
	                console.log(err);
	                res.status(400).send('Unable to process your request. Please try after sometime');
            	}else{
		            res.status(201).send(reminder2);
            	}
            });
        }

    }

    var get = function(req, res) {
        var query = {};
        if (req.query.username) {
            query.username = req.query.username;
        }
        console.log('Query '+ JSON.stringify(query));
        reminder.find(query, function(err, reminders) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                //HATEOS
                var allReminders = [];
                reminders.forEach(function(element, index, array) {
                    var newReminder = element.toJSON();
                    newReminder.links = {};
                    newReminder.links.self = 'http://' + req.headers.host + '/api/reminders/' + newReminder._id;
                    newReminder.links.user = 'http://' + req.headers.host + '/api/users/' + newReminder.username;
                    allReminders.push(newReminder);
                })
                res.json(allReminders)
            }
        });
    }
    return {
        post: post,
        get: get
    }
}

module.exports = reminderController;