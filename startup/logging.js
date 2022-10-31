// use winston 2.4.0 to not get warnings about 
// write logs with no transports
const winston = require('winston');

require('express-async-errors');
require('winston-mongodb');

module.exports = function() {

// log uncaught exceptions into file
winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true}),
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

