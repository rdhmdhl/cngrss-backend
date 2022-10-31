const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://localhost/us-senate')
    .then(() => winston.info('connected to mongodb database...'))
}