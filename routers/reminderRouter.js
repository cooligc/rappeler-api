var express = require('express');

var routes = function(reminder) {
    reminderRouter = express.Router();

    var reminderController = require('../controller/reminderController')(reminder);

    reminderRouter.route('/')
        .post(reminderController.post)
        .get(reminderController.get);

    reminderRouter.use('/:id', function(req, res, next) {
        reminderId = req.params.id;
        console.log('Getting data for reminder id=' + reminderId);
        reminder.findById(reminderId, function(err, reminder) {
            if (err) {
                console.log('Something went wrong');
                console.log(err);
                res.status(500).send(err);
            } else if (reminder) {
                console.log('reminder = ' + JSON.stringify(reminder));
                req.reminder = reminder;
                next();
            } else {
                console.log('Reminder Id=' + reminderId + ' did not find in the database');
                res.status(404).send('No Reminder found');
            }
        })
    });

    reminderRouter.route('/:id')
        .get(function(req, res) {
            res.json(req.reminder);
        })
        .put(function(req, res) {
            req.reminder.time = req.body.time;
            req.reminder.timezone = req.body.timezone;
            req.reminder.username = req.body.username;
            req.reminder.description = req.body.description;
            req.reminder.prefComm = req.body.prefComm;
            console.log('Going to update the data ' + JSON.stringify(req.body));
            req.reminder.save(function(err) {
                console.log(err);
            });
            res.json(req.reminder)
        });
        return reminderRouter;
};

module.exports = routes;