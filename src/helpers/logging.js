const morgan = require('morgan');
const fs = require('fs');
const rfs = require('rotating-file-stream');
const uuid = require('node-uuid');

const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const expressWinston = require('express-winston');

const config = require('../config');


const assignRequestId = (req, res, next) => {
    req.id = uuid.v4();
    next();
};

const accessLog = new DailyRotateFile({
    filename: 'logs/access-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxFiles: '14d'
});

const applicationLog = new DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxFiles: '14d'
});

const logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console(),
        applicationLog
    ]
});

const configureAccessLogs = (app) => {
    let logDirectory = config.logging.path;
    
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
    
    app.use(assignRequestId);
    
    app.use(expressWinston.logger({
      transports: [accessLog, new winston.transports.Console()],
      msg: "reqId={{req.id}},"
    }));
};

const configureErrorLogs = (app) => {
    app.use(expressWinston.errorLogger({
      transports: [applicationLog],
      msg: "reqId={{req.id}},"
    }));
};

module.exports = { 
    configureAccessLogs,
    configureErrorLogs,
    logger
};
