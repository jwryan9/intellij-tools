import {execute} from '../shell';

module.exports = (bumpType) => {
    execute('gulp bump:' + bumpType);
};
