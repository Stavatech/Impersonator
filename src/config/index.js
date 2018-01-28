let config = {
    port: 31000,
    process: 'ssh',
    defaultTTL: 604800
};

module.exports = {
    port: config.port,
    defaultTTL: config.defaultTTL,
    Process: require('../models/impl/process/' + config.process).Process,
};
