'use strict';
const express  = require('express'),
      kafka    = require('kafka-node'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      models     = require('./models'),
      app      = express(),
      port     = 4000;

const HighLevelProducer = kafka.HighLevelProducer;
const client            = new kafka.Client('localhost:2181');
const producer          = new HighLevelProducer(client);

app.use(bodyParser.json());

// This method creates a user and stores it into the database based on the request body
app.post('/users', (req, res) => {
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
            const data = [{
                topic   : 'users',
                messages: JSON.stringify(user)
            }];
            // Send message to consumer
            producer.send(data, (err, data) => {
                if (err) {
                    console.log('Error:', err);
                } else {
                    console.log(data);
                }
                // Create user was successful, send response 201 CREATED
                res.status(201).send(docs);
            });
        });
    });
});

// This method checks if the username and password is correct and sends back a token for
// the user who has the same username and password.
app.post('/token', (req, res) => {
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
            // Return the user token to client
            res.status(200).send({'token': user.token });
        });
    });
});

// Connect Mongoose
mongoose.connect('localhost/app');
mongoose.connection.once('open', () => {
    console.log('Mongoose is connected');
    // Connect kafka producer
    producer.on('ready', () => {
        console.log('Kafka producer is ready');
        // Connect server
        app.listen(port, () => {
            console.log('Server starting on port', port);
        });
    });
});
