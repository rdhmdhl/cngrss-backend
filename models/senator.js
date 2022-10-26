// const Joi = require('joi');
const mongoose = require('mongoose');

// create a model and specify the name of the collection: "Senator" -- singular
// enter schema for the second perameter 
var Senator = (mongoose.model('Senator', new mongoose.Schema({
    name: String,
    name_slug: String,
    title: String,
    state_name: String,
    party: String,
    date_of_birth: String,
    entered_office: String,
    term_end: String
})
));


// console.log(Senator);
exports.Senator = Senator;