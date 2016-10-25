import logger from '../../src/utils/logger';
import {LOG_LEVEL} from '../../src/utils/log-level';

import {common} from 'deere-ui-test-utils';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';
import _ from 'lodash';

describe('logger', () => {
    var sandbox,
        oldEnvs;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        oldEnvs = process.env;
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        process.env = oldEnvs;
        sandbox.restore();
    });

    describe('ERR', () => {
        let message;

        beforeEach(() => {
            sandbox.spy(console, 'log');
        });

        describe('when logging with level set to anything', () => {
            beforeEach(() => {
                process.env.LOGGER_LEVEL = common.any.string();

                message = common.any.string();
                logger.err(message);
            });

            it('should print a message to console', () => {
                expect(console.log).to.have.callCount(1); //eslint-disable-line no-console
                expect(console.log).to.be.calledWithExactly(message); //eslint-disable-line no-console
            });
        });
    });

    describe('WARN', () => {
        let message;

        beforeEach(() => {
            sandbox.spy(console, 'log');
        });

        describe('when logging with level set to warn', () => {
            beforeEach(() => {
                process.env.LOGGER_LEVEL = _.sample([
                    LOG_LEVEL.WARN,
                    LOG_LEVEL.DEBUG,
                    LOG_LEVEL.TRACE
                ]);

                message = common.any.string();
                logger.warn(message);
            });

            it('should print a message to console', () => {
                expect(console.log).to.have.callCount(1); //eslint-disable-line no-console
                expect(console.log).to.be.calledWithExactly(message); //eslint-disable-line no-console
            });
        });

        describe('when logging with level set to something else', () => {
            beforeEach(() => {
                process.env.LOGGER_LEVEL = common.any.string();

                message = common.any.string();
                logger.warn(message);
            });

            it('should NOT print a message to console', () => {
                expect(console.log).to.have.callCount(0); //eslint-disable-line no-console
            });
        });
    });

    describe('DEBUG', () => {
        let message;

        beforeEach(() => {
            sandbox.stub(console, 'log');
        });

        describe('when logging with level set to debug', () => {
            beforeEach(() => {
                process.env.LOGGER_LEVEL = _.sample([
                    LOG_LEVEL.DEBUG,
                    LOG_LEVEL.TRACE
                ]);
                message = common.any.string();
                logger.debug(message);
            });

            it('should print a message to console', () => {
                expect(console.log).to.have.callCount(1); //eslint-disable-line no-console
                expect(console.log).to.be.calledWithExactly(message); //eslint-disable-line no-console
            });
        });

        describe('when logging with level set to something else', () => {
            beforeEach(() => {
                process.env.LOGGER_LEVEL = common.any.string();

                message = common.any.string();
                logger.debug(message);
            });

            it('should NOT print a message to console', () => {
                expect(console.log).to.have.callCount(0); //eslint-disable-line no-console
            });
        });
    });

    describe('TRACE', () => {
        let message;

        beforeEach(() => {
            sandbox.stub(console, 'log');
        });

        describe('when logging with level set to trace', () => {
            beforeEach(() => {
                process.env.LOGGER_LEVEL = LOG_LEVEL.TRACE;

                message = common.any.string();
                logger.trace(message);
            });

            it('should print a message to console', () => {
                expect(console.log).to.have.callCount(1); //eslint-disable-line no-console
                expect(console.log).to.be.calledWithExactly(message); //eslint-disable-line no-console
            });
        });

        describe('when logging with level set to something else', () => {
            beforeEach(() => {
                process.env.LOGGER_LEVEL = common.any.string();

                message = common.any.string();
                logger.trace(message);
            });

            it('should NOT print a message to console', () => {
                expect(console.log).to.have.callCount(0); //eslint-disable-line no-console
            });
        });
    });
});
