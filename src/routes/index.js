const Task = require('../models/task');

const helpers = require('../helpers/token');

module.exports = function(app, config, sessions) {

    require('./tokens')(app, config, sessions);
    require('./ping')(app, config, sessions);

    /**
     * Input: Receives JSON in the format: { "token": "<some auth token>": "command": "<the command to execute>" }.
     * Output: Returns the output and error streams along with the return code in the format: { "out": "<output stream>": "err": "<error stream>", "code": <return code> }
     */
    app.post('/', function(req, res) {
        let token = req.body.token;
        let proc = sessions[token];

        if (proc === undefined) {
            res.status(401);
            res.json({errorMessage: "Unauthorized"});
            return;
        } else {
            helpers.resetTokenTimeout(proc, sessions, token);
        }

        let response = {
            out: '',
            err: '',
            code: null
        };

        // callbacks
        let onStdOut = (out) => {
            response.out += out;
        };
        let onStdErr = (err) => {
            response.err += err;
        };
        let onError = (error) => {
            res.status(500);
        };
        let onClose = (code) => {
            response.code = code;
            if (response.code != 0) {
                res.status(400);
            }
            res.json(response);
        };

        let task = new Task(req.body.command, onStdOut, onStdErr, onError, onClose);

        proc.run(task);
    });
};
