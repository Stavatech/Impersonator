class Process {
    constructor(credentials) {
        this.credentials = credentials;
    }

    setOnStdout(callback) {
        this.onStdout = callback;
    }

    setOnStderr(callback) {
        this.onStderr = callback;
    }

    setOnError(callback) {
        this.onError = callback;
    }

    setOnClose(callback) {
        this.onClose = callback;
    }

    run(command) {
        throw new Error("Not implemented");
    }

    open(success, error) {
        throw new Error("Not implemented");
    }

    close() {
        throw new Error("Not implemented");
    }
};

module.exports = Process;