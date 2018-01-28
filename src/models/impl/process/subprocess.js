const Process = require('../../process');
const subprocess = require('child_process');

class Subprocess extends Process {
    run(task) {
        let proc = subprocess.spawn(task.command, { shell: true });

        proc.stdout.on('data', (data) => {
            task.onStdOut(data.toString());
        });
        proc.stderr.on('data', (data) => {
            task.onStdErr(data.toString());
        });
        proc.on('error', (err) => {
            task.onError(err);
        });
        proc.on('close', (code) => {
            task.onClose(code);
        });
    }

    open(success, error) {
        success();
    }

    close() {}
}

module.exports = {
    Process: Subprocess
};
