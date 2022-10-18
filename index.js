// const puppeteer = require('puppeteer');
// const fs = require('fs/promises');
//

const express = require('express');

const senators = require('./routes/senators');

const app = express();

app.use(express.json());

// use senators route
app.use('/api/senators', senators);

// port 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));