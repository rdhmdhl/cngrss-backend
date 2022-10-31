// function ONLY catches errors in the request processing pipeline
// ignores anything outside the context of express
// if something goes wrong in startup, this function will not be executed
// index.js has code for uncaught exceptions that will be logged to logfile.log

const winston = require('winston')
module.exports = function(err, req, res, next) {
    winston.error(err.message, { metadata: {
        name: err.name,
        stack: err.stack
    }});

    res.status(500).send('something failed')
}