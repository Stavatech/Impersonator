const functions = require('../utils/functions')

module.exports = function(app) {
    app.post('/', function(req, res) {
        functions.runCommand(req, res);
    });
    require('./tokens')(app);
    require('./ping')(app);
};
