'use strict';
const mongoose = require('mongoose');
const uuid = require('node-uuid');

const UserSchema = mongoose.Schema({
    name : {
        type     : String,
        required : true,
    },
    password : {
        type     : String,
        required : true,
    },
    email : {
        type     : String,
        required : true,
    }
    token : {
        type : String,
    },
    age : {
        type     : Number,
        required : true,
        min      : 0,
        max      : 150,
    },

});

module.exports = {
    User    : mongoose.model('User', UserSchema),
};
