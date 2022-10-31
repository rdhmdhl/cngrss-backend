const winston = require('winston');

require('express-async-errors');
require('winston-mongodb');

module.exports = function() {

// log uncaught exceptions into file
winston.exceptions.handle(
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

process.on('unhandledRejection', (ex) => {
    throw ex;
});

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB({
    db: 'mongodb://localhost/us-senate',
    level: 'info'
}));

}

