import { execute } from '../shell';

module.exports = () => {
    let lineCount = execute('git remote -v | sed -e \'s/\s.*$//\' | wc -l');

    if (lineCount > 2) {
        return true;
    }

    return false;
};
