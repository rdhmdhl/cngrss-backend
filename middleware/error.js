const winston = require('winston')
module.exports = function(err, req, res, next) {
    winston.error(err.message, { metadata: {
        name: err.name,
        stack: err.stack
    }});

    res.status(500).send('something failed')
}