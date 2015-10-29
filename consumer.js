'use strict';

const kafka             = require('kafka-node');
const mongoose          = require('mongoose');
const HighLevelConsumer = kafka.HighLevelConsumer;
const client            = new kafka.Client('localhost:2181');
const consumer          = new HighLevelConsumer(client,
    [{ topic: 'requests' },],
    { groupId: 'mygroup'} // The consumer group that this consumer is part of.
);

consumer.on('message', function(message) {
    console.log('message', message);
    const value = JSON.parse(message.value);
    console.log('value:', value);
});

mongoose.connect('localhost/app');
mongoose.connection.once('open', () => {
    console.log('Mongoose is connected');
});
