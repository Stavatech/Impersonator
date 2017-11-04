const crypto = require('crypto');
const base64url = require('base64url');

const User = require('../../models/user');

const generateToken = (size) => {
    return base64url(crypto.randomBytes(size));
}

module.exports = (app) => {
    app.post('/tokens', function(req, res) {
        let user = new User(req.body);
        user.login(() => {
            let token = generateToken(64);
            global.users[token] = user;
            res.send(token);
        }, () => {
            res.status(401);
            res.json({errorMessage: "Unauthorized"});
        });
    });

    app.delete('/tokens/:token', function(req, res) {
        const token = req.params.token;
        const user = global.users[token];

        if (user) {
            user.logout();
            delete global.users[token];
        }

        res.end();
    });
};
