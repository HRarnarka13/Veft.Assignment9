'use strict';
const kafka             = require('kafka-node'),
      mongoose          = require('mongoose'),
      uuid              = require('node-uuid'),
      models            = require('./models'),
      HighLevelConsumer = kafka.HighLevelConsumer,
      client            = new kafka.Client('localhost:2181'),
      consumer          = new HighLevelConsumer(client,
    [{ topic: 'users' },],
    { groupId: 'mygroup'} // The consumer group that this consumer is part of.
);

mongoose.connect('localhost/app');
// connect Mongoose
mongoose.connection.once('open', () => {
    console.log('Mongoose is connected');
    // get consumer message
    consumer.on('message', function(message) {
        // console.log('message', message);
        const value = JSON.parse(message.value);
        console.log('value:', value);
        const token = uuid.v4();
        models.User.update({ _id: value._id }, { token: token }, (err) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log("successfuly added token for user:", value.username);
            }
        });
    });
});
