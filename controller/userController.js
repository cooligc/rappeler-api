var userController = function(user) {
    var post = function(req, res) {
        var user2 = new user(req.body);
        console.log('Users details '+JSON.stringify(req.body));

        if (!req.body.username) {
            res.status(400);
            res.send('Username is required')
        } else {
            console.log(user2);
            user2.save(function(err) {
            	if(err){	
	                console.log(err);
	                res.status(400).send('Please change username,email and mobile');
            	}else{
		            res.status(201).send(user2);
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
        user.find(query, function(err, users) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                //HATEOS
                var returnUsers = [];
                users.forEach(function(element, index, array) {
                    var newUser = element.toJSON();
                    newUser.links = {};
                    newUser.links.self = 'http://' + req.headers.host + '/api/users/' + newUser.username;
                    returnUsers.push(newUser);
                })
                res.json(returnUsers)
            }
        });
    }
    return {
        post: post,
        get: get
    }
}

module.exports = userController;