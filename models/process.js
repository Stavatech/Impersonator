class Process {
    constructor(runCommand) {
        this.runCommand = runCommand;
        this.proc = null;
    }

    run(command) {
        this.proc = this.runCommand(command);
        return this.proc;
    }


};

module.exports = Process;