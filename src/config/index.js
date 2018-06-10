let path = require('path');

let logDirectory = path.join(__dirname, 'logs');

let config = {
    port: 31000,
    defaultTTL: 604800,
    logging: {
        path: logDirectory
    },
    process: 'ssh'
};

module.exports = {
    port: config.port,
    defaultTTL: config.defaultTTL,
    logging: config.logging,
    Process: require('../models/impl/process/' + config.process).Process
};
