const Process = require('../process');
const subprocess = require('child_process');

class Unauthenticated extends Process {
    run(command) {
        let proc = subprocess.spawn(command, { shell: true });

        proc.stdout.on('data', (data) => {
            this.onStdout(data.toString());
        });
        proc.stderr.on('data', (data) => {
            this.onStderr(data.toString());
        });
        proc.on('error', (err) => {
            this.onError(err);
        });
        proc.on('close', (code) => {
            this.onClose(code);
        });
    }

    open(success, error) {
        success();
    }

    close() {}
}

module.exports = {
    Process: Unauthenticated
};
