import logLevel from '../../src/utils/log-level';

import {expect} from 'chai';
import _ from 'lodash';
import {common} from 'deere-ui-test-utils';

const LOG_LEVELS = {
    DEBUG: 'DEBUG',
    ERR: 'ERR',
    TRACE: 'TRACE',
    WARN: 'WARN'
};

describe('logLevel', () => {
    let expectedLogLevel;

    describe('when selecting a good log level', () => {
        beforeEach(() => {
            expectedLogLevel = _.sample(LOG_LEVELS);

            logLevel.setLogLevel(expectedLogLevel);
        });

        it('should set the log level', () => {
            expect(process.env.LOGGER_LEVEL).to.equal(expectedLogLevel);
        });
    });


    describe('when selecting a bad log level', () => {
        beforeEach(() => {
            expectedLogLevel = common.any.string();

            logLevel.setLogLevel(expectedLogLevel);
        });

        it('should set the log level to a default of Err', () => {
            expect(process.env.LOGGER_LEVEL).to.equal(LOG_LEVELS.ERR);
        });
    });
});
