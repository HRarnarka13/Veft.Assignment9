'use strict';
const mongoose = require('mongoose');
const uuid = require('node-uuid');

const UserSchema = mongoose.Schema({
    username : {
        type     : String,
        required : true,
        unique   : true,
    },
    password : {
        type     : String,
        required : true,
    },
    email : {
        type     : String,
        required : true,
        unique: true,
    },
    age : {
        type     : Number,
        required : true,
        min      : 0,
        max      : 150,
    },
});

const TokenSchema = mongoose.Schema({
    username : {
        type     : String,
        required : true,
    },
    password : {
        type     : String,
        required : true,
    },
});

module.exports = {
    User    : mongoose.model('User', UserSchema),
    Token   : mongoose.model('Token', TokenSchema),
};
