const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config');
const {logger, configureAccessLogs, configureErrorLogs} = require('./helpers/logging');

let app = express();
let sessions = {};

// set up access logs
configureAccessLogs(app);

// set up other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// routing
require('./routes')(app, config, sessions);

// set up error logs
configureErrorLogs(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    logger.error("Error happened");
    res.status(err.status || 500);
    res.send(err.message);
});

module.exports = app;
