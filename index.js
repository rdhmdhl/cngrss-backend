require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

const auth = require('./routes/auth');
const config = require('config');
const error = require('./middleware/error');
const mongoose = require('mongoose');
const representatives = require('./routes/representatives');
const senators = require('./routes/senators');
const states = require('./routes/states');
const users = require('./routes/users');
const express = require('express');

const app = express();


process.on('uncaughtException', (ex) => {
    console.log('we got an uncaught exception');
    winston.error(ex.message, ex)
})

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB({
    db: 'mongodb://localhost/us-senate',
    level: 'error'
}));

// throw new Error('something failed during startup');

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/us-senate')
    .then(() => console.log('connected to mongodb database...'))
    .catch(err => console.log('An error occured...', err));

app.use(express.json());

app.use('/api/senators', senators);
app.use('/api/states', states);
app.use('/api/representatives', representatives);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));