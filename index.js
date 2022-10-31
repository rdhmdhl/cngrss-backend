require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('./startup/routes')(app);

winston.exceptions.handle(
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

process.on('unhandledRejection', (ex) => {
    throw ex;
});

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB({
    db: 'mongodb://localhost/us-senate',
    level: 'error'
}));

// testing errors
// throw new Error('something failed during startup');
const p = Promise.reject(new Error('something failed bad'));
p.then(() => console.log('done'));

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/us-senate')
    .then(() => console.log('connected to mongodb database...'))
    .catch(err => console.log('An error occured...', err));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));