'use strict';
const express  = require('express'),
      kafka    = require('kafka-node'),
      mongoose = require('mongoose'),
      api      = require('./api'),
      app      = express(),
      port     = 4000;

const HighLevelProducer = kafka.HighLevelProducer;
const client            = new kafka.Client('localhost:2181');
const producer          = new HighLevelProducer(client);

app.use('/api', api);

app.use((req, res, next) => {
    const request_details = {
        'path': req.path,
        'headers': req.headers,
        'method': req.method
    };
    const data = [{
        topic: 'requests',
        messages: JSON.stringify(request_details)
    }];
    producer.send(data, (err, data) => {
        if (err) {
            console.log('Error:', err);
            return;
        }
        console.log(data);
        next();
    });
});

mongoose.connect('localhost/app');

producer.on('ready', () => {
    console.log('Kafka producer is ready');
    mongoose.connection.once('open', () => {
        console.log('Mongoose is connected');
        app.listen(port, () => {
            console.log('Server starting on port', port);
        });
    });
});
