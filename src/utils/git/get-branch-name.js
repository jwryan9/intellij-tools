import { execute } from '../shell';

module.exports = () => {
    return execute('git rev-parse --symbolic-full-name --abbrev-ref HEAD');
};
