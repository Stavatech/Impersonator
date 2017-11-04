module.exports = function(app) {
    require('./tokens')(app);
    require('./ping')(app);

    app.post('/', function(req, res) {
        let user = global.users[req.body.token];

        if (user === undefined) {
            res.status(401);
            res.json({errorMessage: "Unauthorized"});
            return;
        }

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
    });
};
