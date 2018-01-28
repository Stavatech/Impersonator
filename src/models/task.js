class Task{
    constructor(command, onStdOut, onStdErr, onError, onClose) {
        this.command = command;
        this.onStdOut = !onStdOut ? (data) => {} : onStdOut;
        this.onStdErr = !onStdErr ? (data) => {} : onStdErr;
        this.onError = !onError ? (error) => {} : onError;
        this.onClose = !onClose ? (code) => {} : onClose;
    }

    run(process) {
        process.run(this);
    }
}

module.exports = Task;
