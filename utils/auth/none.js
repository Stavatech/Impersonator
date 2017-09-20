const Process = require('../../models/process');

let subprocess = require('child_process');

const getProcessHandle = (creds) => {
    return new Process(function(command) {
        return subprocess.spawn(command, { shell: true });
    });
};

const setStdOutCallback = (proc, callback) => {
    proc.stdout.on('data', (data) => {
        callback(data.toString());
    });
};

const setStdErrCallback = (proc, callback) => {
    proc.stderr.on('data', (data) => {
        callback(data.toString());
    });
};

const setErrorCallback = (proc, callback) => {
    proc.on('error', (err) => {
        callback(err);
    });
};

const setCloseCallback = (proc, callback) => {
    proc.on('close', (code) => {
        callback(code);
    });
};

module.exports = { 
    getProcessHandle,
    setStdOutCallback,
    setStdErrCallback,
    setErrorCallback,
    setCloseCallback
};
