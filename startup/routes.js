const express = require('express');
const representatives = require('../routes/representatives');
const senators = require('../routes/senators');
const states = require('../routes/states');
const users = require('../routes/users');
const error = require('../middleware/error');
const auth = require('../routes/auth');


module.exports = function(app){
app.use(express.json());
app.use('/api/senators', senators);
app.use('/api/states', states);
app.use('/api/representatives', representatives);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);
};