var express = require('express');

var routes = function(user) {
    userRouter = express.Router();

    var userController = require('../controller/userController')(user);

    userRouter.route('/')
        .post(userController.post)
        .get(userController.get);

    userRouter.use('/:username', function(req, res, next) {
    	username = req.params.username;
        console.log('Getting data for username=' + username);
        user.find({'username':username}, function(err, user) {
            if (err) {
                console.log('Something went wrong');
                console.log(err);
                res.status(500).send(err);
            } else if (user) {
                console.log('user = ' + JSON.stringify(user));
                req.user = user;
                next();
            } else {
                console.log('username=' + username + ' did not find in the database');
                res.status(404).send('No User found');
            }
        })
    });

    userRouter.route('/:username')
        .get(function(req, res) {
            res.json(req.user);
        })
        .put(function(req, res) {
            req.user.firstName = req.body.firstName;
            req.user.lastName = req.body.lastName;
            req.user.gender = req.body.gender;
            req.user.mobile = req.body.mobile;
            req.user.email = req.body.email;
            req.user.username = req.body.username;
            req.user.password = req.body.password;
            console.log('Going to update the data ' + JSON.stringify(req.body));
            req.user.save(function(err) {
                console.log(err);
            });
            res.json(req.user)
        });
        return userRouter;
};

module.exports = routes;