'use strict';

cosnt exprss = require('express'),
      bodyParser = require('body-parser'),
      api = express();

api.use(bodyParser.json());

api.get('/', (req, res) => {
    res.send('Hello world');
});

api.post('/user', (req, res) => {
    res.send("Ok");
});

api.post('/token', (req, res) => {
    res.send("Ok");
});

module.exports = api;
