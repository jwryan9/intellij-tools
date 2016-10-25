import {execute, executeAndCaptureErrors} from '../shell';
import logger from '../logger';

module.exports = () => {
    let npml = execute('npm list --depth=0'),
        lines = npml.split('\n'),
        depStringsToUnlink = lines.filter((line) => {
            return line.indexOf('>') > 0;
        }),
        depsToUnlink = depStringsToUnlink.map((depString) => {
            let namePlusVersion = depString.split('── ')[1];
            return namePlusVersion.split('@')[0];
        });

    depsToUnlink.forEach((depToUnlink) => {
        execute('npm unlink ' + depToUnlink);
    });

    let retVal = executeAndCaptureErrors('npm i');
    if (retVal.error.indexOf('invalid') > 0 || retVal.error.indexOf('404 Not Found') > 0) {
        logger.err('failed to npm install all deps. run npml to find out what is wrong.');
        process.exit(1); //eslint-disable-line no-process-exit
    }
};
