// const Joi = require('joi');
const mongoose = require('mongoose');


// create a model and specify the name of the collection: "Senator" -- singular
// enter schema for the second perameter 
var State = (mongoose.model('State', new mongoose.Schema({
    name: String,
})));

exports.State = State;
// exports.validate = validateStates;