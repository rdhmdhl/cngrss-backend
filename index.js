const mongoose = require('mongoose');
const express = require('express');
const senators = require('./routes/senators');
const states = require('./routes/states');
const app = express();

mongoose.connect('mongodb://localhost/us-senate')
    .then(() => console.log('connected to mongodb database...'))
    .catch(err => console.log('An error occured...', err));


app.use(express.json());

// senators route
app.use('/api/senators', senators);
// states route
app.use('/api/states', states);

// port 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));