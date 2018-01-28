const helpers = require('../../helpers/token');

module.exports = (app, config, sessions) => {
    /**
     * Input: Receives JSON in the format: { "username": "<username>": "password": "<password>" }.
     * Output: Returns a token that can be used to authenticate future requests
     */
    app.post('/tokens', function(req, res) {
        let proc = new config.Process(req.body);

        loginSuccess = () => {
            let token = helpers.generateToken(64);
            sessions[token] = proc;

            proc.ttl = req.body.ttl || config.defaultTTL;
            proc.timeout = helpers.expireToken(sessions, token, proc.ttl);

            res.send(token);
        };
        loginError = () => {
            res.status(401);
            res.json({errorMessage: "Unauthorized"});
        };

        proc.open(loginSuccess, loginError)
    });

    /**
     * Input: The token to be deleted as a URL path param: /token/<token>.
     * Output: n/a
     */
    app.delete('/tokens/:token', function(req, res) {
        helpers.clearToken(sessions, req.params.token);
        res.end();
    });
};
