'use strict';

const express    = require('express'),
      bodyParser = require('body-parser'),
      models     = require('./models'),
      api        = express();

api.use(bodyParser.json());

api.get('/', (req, res) => {
    res.send('Hello world');
});

// This method creates a user and stores it into the database based on the request body
api.post('/user', (req, res) => {
    const user = new models.User(req.body); // Create user model from request body
    user.validate((err) => { // Validate data
        if (err) {
            res.status(412).send(err.message);
            return;
        }
        user.save((err, docs) => {
            if (err) {
                res.status(412).send(err.message);
                return;
            }
            // Create user was successful, send response 201 CREATED
            res.status(201).send(docs);
        });
    });
});

// This method checks if the username and password is correct and sends back a token for
// the user who has the same username and password.
api.post('/token', (req, res) => {
    const token = new models.Token(req.body);
    // validate the request data
    token.validate((err) => {
        if (err) {
            res.status(412).send(err.message);
            return;
        }
        // Find the user who has the same username and password
        models.User.findOne(token, (err, user) => {
            if (err) {
                res.status(412).send(err.message);
                return;
            }
            // Check if the user was found
            if (!user) {
                res.status(410).send(err.message);
                return;
            }
            // Return the user token
            res.status(200).send({'token': user.token });
        });
    });
});

module.exports = api;
