import sh from 'shelljs';
import context from './context';
import logger from './logger';

module.exports = {
    execute(command) {
        let opts = {};

        if (!context.get('verbose')) {
            opts.silent = true;
        }

        logger.trace('command: ' + command);

        return sh.exec(command, opts).stdout;
    },

    executeAndCaptureErrors(command) {
        let executedStatment,
            opts = {};

        if (!context.get('verbose')) {
            opts.silent = true;
        }

        logger.trace('command: ' + command);

        executedStatment = sh.exec(command, opts);

        return {
            results: executedStatment.stdout,
            error: executedStatment.stderr
        };
    }
};
