module.exports = function(app, config, sessions) {

    /**
     * Input: n/a.
     * Output: A vaguely descriptive message.
     */
    app.get('/ping', function(req, res) {
        res.set('Content-Type', 'text/plain');

        let tokens = Object.keys(sessions);
        let sessionList = [];

        tokens.forEach((token, index) => {
            let proc = sessions[token];

            let count = index + 1;
            let user = proc.credentials.username
            let expiryTime = new Date(proc.timeout.expiryTime).toLocaleString();

            sessionList.push(`${count}) ${user}, session expiry: ${expiryTime}`);
        });

        let description = [
            `This is an Impersonator instance with ${sessionList.length} active sessions.`,
            sessionList.length > 0 ? `Sessions:\n${sessionList.join('\n')}` : ''
        ].join('\n\n');

        res.send(description);
    });
};
