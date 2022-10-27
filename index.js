const mongoose = require('mongoose');
const express = require('express');
const senators = require('./routes/senators');
const states = require('./routes/states');
const representatives = require('./routes/representatives');
const app = express();

mongoose.connect('mongodb://localhost/us-senate')
    .then(() => console.log('connected to mongodb database...'))
    .catch(err => console.log('An error occured...', err));

app.use(express.json());

app.use('/api/senators', senators);
app.use('/api/states', states);
app.use('/api/representatives', representatives);

// port 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));