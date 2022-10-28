const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const senators = require('./routes/senators');
const states = require('./routes/states');
const representatives = require('./routes/representatives');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));