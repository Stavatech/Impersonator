const Process = require('../process');
const Client = require('ssh2').Client;

class SSH extends Process {
    constructor(credentials) {
        super(credentials);

        this.credentials = credentials;
        this.conn = new Client();
    }

    run(command) {
        this.conn.exec(command, (err, stream) => {
            if (err) {
                throw err;
            }

            stream.on('data', (data) => {
                this.onStdout(data.toString());
            }).stderr.on('data', (data) => {
                this.onStderr(data.toString());
            }).on('error', (err) => {
                this.onError(err);
            }).on('close', (code, signal) => {
                if (code === undefined) {
                    code = 0;
                }
                this.onClose(code);
            });
        });
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
}

module.exports = {
    Process: SSH
};
