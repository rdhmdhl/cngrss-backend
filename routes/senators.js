const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


// create a model and specify the name of the collection: "Senator" -- singular
// enter schema for the second perameter 
var Senator = (mongoose.model('Senator', new mongoose.Schema({
    name: String,
    title: String,
    state_name: String,
    party: String,
    date_of_birth: String,
    entered_office: String,
    term_end: String
}
)));

// async function getSenator(){
//    return await Senator
//         .find({ state_name: 'California' })
//         .sort('name')
//         .select('name title state_name party, date_of_birth entered_office term_end')
// }

// async function run(){
//     const senators = await getSenator();
//     console.log(senators)
// }

// run();

// to get more infomation enter more values in the .select method,
// to view all values (pictures, links, ect) remove the .select method
router.get('/', async (req, res) => {
        const senators = await Senator.find().sort('state_name').select('name title state_name party, date_of_birth entered_office term_end');
        res.send(senators)
});

// router.post('/', async (req, res) => {
//     // validate reqest, if error return status 400 message 
//     const {error} = validateSenator(req.body);
//     if (error) return res.status(400).send(error.details[0].message) 
    
//     let senator = new Senator({ name: req.body.name });        
//     senator = await senator.save();

//     res.send(senator);
// });

router.put('/:id', async (req, res) => {
    const {error} = validateSenator(req.body);
    if (error) return res.status(400).send(error.details[0].message); 
    
    const senator = await Senator.findByIdAndUpdate(req.params.id, {name: req.body.name }, {
        new: true
    })

    if (!senator) return res.status(404).send('The senator with the given ID was not found');

    res.send(senator);
});

// router.delete('/:id', async (req, res) => {
//     const senator = await Senator.findByIdAndRemove(req.params.id);
    
//     if (!senator) return res.status(404).send('The senator with the given ID was not found');

//     res.send(senator);
// });

router.get('/:id', async (req, res) => {
    // const {error} = validateID(req.body);
    // if (error) return res.status(400).send(error.details[0].message); 

    const senator = await Senator.findById(req.params.id);
    
    if (!senator) return res.status(404).send('the senator with the given ID was not found');

    res.send(senator);
});


// // validate senators function that is used in http methods such as get and put above

// function validateSenator(req, res) {
//     const schema = Joi.object({ name: Joi.string() .min(6) .required()});
    
//     const validation = schema.validate(req.body);
//     res.send(validation)
// }; 

// function validateID(senator) {
//     const schema = Joi.object(
//         { _id: Joi.string().min(3).max(25)});
        
//     return schema.validate(senator);
//   }

function validateSenator(senator) {
    const schema = Joi.object(
        { name: Joi.string().min(3).max(20).required()});
        
    return schema.validate(senator);
  }
  

module.exports = router;