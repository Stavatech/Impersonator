const config = require('../config/config');
const auth = require('../utils/auth')[config.auth];
const Process = require('./process');

class User {
    constructor(credentials) {
        this.credentials = credentials;
        this.process = null;
    }
    
    runCommand(command, onStdOut, onStdErr, onError, onClose) {
        this.process = this.process === null ? auth.getProcessHandle(this.credentials) : this.process; 

        onStdOut = !onStdOut ? (data) => {} : onStdOut;
        onStdErr = !onStdErr ? (data) => {} : onStdErr;
        onError = !onError ? (error) => {} : onError;
        onClose = !onClose ? (code) => {} : onClose;

        let proc = this.process.run(command);
        
        auth.setStdOutCallback(proc, onStdOut);
        auth.setStdErrCallback(proc, onStdErr);
        auth.setErrorCallback(proc, onError);
        auth.setCloseCallback(proc, onClose);
    }
};

module.exports = User;