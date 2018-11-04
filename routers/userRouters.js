var express = require('express');

var routes = function(user) {
    userRouter = express.Router();

    var userController = require('../controller/userController')(user);

    userRouter.route('/')
        .post(userController.post)
        .get(userController.get);

    userRouter.use('/:userId', function(req, res, next) {
        console.log('Getting data for userid=' + req.params.userId);
        user.findById(req.param.userId, function(err, user) {
            if (err) {
                console.log('Something went wrong');
                console.log(err);
                res.status(500).send(err);
            } else if (user) {
                console.log('user = ' + JSON.stringfy(user));
                req.user = user;
                next();
            } else {
                console.log('userId=' + req.param.userId + ' did not find in the database');
                res.status(404).send('No User found');
            }
        })
    });

    userRouter.route('/:userId')
        .get(function(req, res) {
            res.json(req.book);
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