import npm from './npm/npm';
import gulp from './gulp/gulp';
import logger from './logger';

module.exports = (bumpType) => {
    if (npm.listScripts().indexOf('  bump\n') > 0) {
        logger.debug('bumping via npm');
        npm.bump(bumpType);
    } else {
        logger.debug('bumping via gulp');
        gulp.bump(bumpType);
    }
};
