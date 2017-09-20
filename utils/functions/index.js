const User = require('../../models/user');

const runCommand = (req, res) => {
    let user = new User(req.body);

    let response = {
        out: '',
        err: '',
        code: null
    };

    user.runCommand(req.body.command, (out) => {
            response.out += out;
        }, (err) => {
            response.err += err;
        }, (error) => {
            res.status(500);
        }, (code) => {
            response.code = code;
            if (response.code != 0) {
                res.status(400);
            }
            res.json(response);
        }
    );
};

module.exports = {
    runCommand
};
