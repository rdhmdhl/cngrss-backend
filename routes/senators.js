const express = require('express');
const fs = require('fs');
const Joi = require('joi');
const senators = require('..solution1');



const router = express.Router();

var results = [senators];

router.get('/', (req, res) => {
        res.send(`State: ${senator.state_name} Name: ${senator.name}`)
})

// router.post('/', (req, res) => {
//     // validate reqest, if error return status 400 message 
//     // const {error} = validateSenator(req.body);
//     // if (error) return res.status(400).send(error.details[0].message) 
    
//     res.send(`State: ${result.state_name} Name: ${result.first_name} ${result.last_name} Date of birth: ${result.date_of_birth}`);
// });


// validate senators function that is used in http methods such as get and put above
// function validateSenator(results) {
//     const schema = Joi.object({state_name: Joi.string().min(3).required()});

//     return schema.validate(results);
// };

// route perameters
router.get('/:state', (req, res) => {
    const senator = results.find(c => c.name === parseInt(req.params.id));
    if (!senator) return res.status(404).send('The senator with the given name was not found');
    res.send(senator);
});


module.exports = router;