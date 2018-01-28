class Process {
    constructor(credentials) {
        this.credentials = credentials;
    }

    open(success, error) {
        throw new Error("Not implemented");
    }

    close() {
        throw new Error("Not implemented");
    }

    run(task) {
        throw new Error("Not implemented");
    }
};

module.exports = Process;