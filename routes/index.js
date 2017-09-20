const functions = require('../utils/functions')

module.exports = function(app) {
    app.post('/', function(req, res) {
        functions.runCommand(req, res);
    });
    require('./ping')(app);
};
