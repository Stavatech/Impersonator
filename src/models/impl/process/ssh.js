const Process = require('../../process');
const Client = require('ssh2').Client;

class SSH extends Process {
    constructor(credentials) {
        super(credentials);

        this.conn = new Client();

        this.queue = [];
        this.busy = false;
    }

    open(success, error) {
        this.conn.on('ready', () => {
            success();
        });
        this.conn.on('error', (err) => {
            error();
        });

        this.conn.connect(this.credentials);
    }

    close() {
        this.conn.end();
    }

    run(task) {
        // add the task to the queue (the SSH process can only run one command at a time)
        this.queue.push(task);
        this.runFromQueue();
    }

    runFromQueue() {
        if (!this.busy && this.queue.length > 0) {
            let task = this.queue.shift();
            this.toggleBusy(true);

            this.conn.exec(task.command, (err, stream) => {
                if (err) {
                    throw err;
                }

                stream.on('data', (data) => {
                    task.onStdOut(data.toString());
                });
                stream.stderr.on('data', (data) => {
                    task.onStdErr(data.toString());
                });
                stream.on('error', (err) => {
                    task.onError(err);
                });
                stream.on('close', (code, signal) => {
                    if (code === undefined) {
                        code = 0;
                    }
                    task.onClose(code);
                    this.toggleBusy(false);
                });
            });
        }
    }

    toggleBusy(toggle) {
        this.busy = toggle;
        this.runFromQueue();
    }
}

module.exports = {
    Process: SSH
};
