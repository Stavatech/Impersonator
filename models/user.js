const config = require('../config/config');
const auth = require('../utils/auth')[config.auth];

class User {
    constructor(credentials) {
        this.credentials = credentials;
        this.process = null;
    }

    login(success, error) {
        this.process = new auth.Process(this.credentials);
        this.process.open(success, error);
    }

    logout() {
        this.process.close();
    }

    runCommand(command, onStdOut, onStdErr, onError, onClose) {
        if (this.process === null) {
            throw new Error("No process is available. First call login().");
        }

        onStdOut = !onStdOut ? (data) => {} : onStdOut;
        onStdErr = !onStdErr ? (data) => {} : onStdErr;
        onError = !onError ? (error) => {} : onError;
        onClose = !onClose ? (code) => {} : onClose;

        this.process.setOnStdout(onStdOut);
        this.process.setOnStderr(onStdErr);
        this.process.setOnError(onError);
        this.process.setOnClose(onClose);

        this.process.run(command);
    }
};

module.exports = User;
