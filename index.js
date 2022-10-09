// const puppeteer = require('puppeteer');
// const fs = require('fs/promises');
const fs = require('fs');
const express = require('express');
const Joi = require('joi');
const csv = require('csv-parser');


var results = [];

function readCSVFile() {
    fs.createReadStream('./senate.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {

    });
};

readCSVFile();

console.log(results);

const app = express();

app.use(express.json());

app.get('/api/senators', (req, res) => {
    res.send(results)
    
})

// app.post('/api/senators', (req, res) => {
//     // validate reqest, if error return status 400 message 
//     const {error} = validateSenator(req.body);
//     if (error) return res.status(400).send(error.details[0].message) 
    
//     res.send(`State: ${result.state_name} Name: ${result.first_name} ${result.last_name} Date of birth: ${result.date_of_birth}`);
// });


// validate senators function that is used in http methods such as get and put above
// function validateSenator(results) {
//     const schema = Joi.object({state_name: Joi.string().min(3).required()});

//     return schema.validate(results);
// };

// // route perameters
// app.get('/api/senators/:state', (req, res) => {
//     const genre = genres.find(c => c.id === parseInt(req.params.id));
//     if (!genre) return res.status(404).send('The genre with the given id was not found');
//     res.send(genre);
// });

// port 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));