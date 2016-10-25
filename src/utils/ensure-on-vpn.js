import {execute} from './shell';
import logger from './logger';

module.exports = () => {
    let vpnCheckCommand = 'curl -s --connect-timeout 3 --head https://github.deere.com | head -n 1 | grep "HTTP/1.[01] [23].."',
        isOnVpn = execute(vpnCheckCommand).indexOf('Found') !== -1;

    logger.debug('isOnVpn: ' + isOnVpn);
    if (!isOnVpn) {
        logger.err('could not connect to Deere github.  Make sure you are on the VPN.');
        process.exit(1); //eslint-disable-line no-process-exit
    }
};
