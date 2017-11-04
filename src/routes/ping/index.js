module.exports = function(app) {
    app.get('/ping', function(req, res) {
        res.send('This is an Impersonator instance')
    });
};
