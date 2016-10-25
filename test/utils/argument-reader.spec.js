import logger from '../../src/utils/logger';
import logLevel from '../../src/utils/log-level';
import context from '../../src/utils/context';

import _ from 'lodash';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';
import {common} from 'deere-ui-test-utils';
import proxyquire from 'proxyquire';

var argumentReader;

describe('argumentReader', () => {
    var minimistStub,
        sandbox;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        sandbox.stub(process, 'exit');
        sandbox.stub(logger, 'debug');
        sandbox.stub(logger, 'trace');
        sandbox.stub(logger, 'warn');
        sandbox.stub(logLevel, 'setLogLevel');
        sandbox.stub(context, 'put');

        minimistStub = sandbox.stub();
        argumentReader = proxyquire('../../src/utils/argument-reader', {
            'minimist': minimistStub
        });
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('default', () => {
        let expectedInputArgs;

        beforeEach(() => {
            expectedInputArgs = [common.any.string()];
            minimistStub.returns(expectedInputArgs);

            argumentReader.read(common.any.string());
        });

        it('should read the input args', () => {
            expect(logger.debug).to.have.callCount(1);
            expect(logger.debug).to.be.calledWithExactly('inputArgs: ' + JSON.stringify(expectedInputArgs));
        });
    });

    describe('when update called with -h or --help flag', () => {
        beforeEach(() => {
            let args = [],
                inputArgs = {};

            inputArgs[_.sample('h', 'help')] = common.any.string();

            minimistStub.withArgs(args).returns(inputArgs);

            argumentReader.read(args);
        });

        it('should set the default logging level', () => {
            expect(logger.warn).to.have.callCount(4);
            expect(logger.warn).to.be.calledWithExactly('-v or --verbose to print summary');
            expect(logger.warn).to.be.calledWithExactly('-i or --install to install node modules');
            expect(logger.warn).to.be.calledWithExactly('-l or --level \<level\> to set logger level (DEBUG, TRACE, ERR)');
            expect(logger.warn).to.be.calledWithExactly('-d or --debug to set logger level to DEBUG');
        });

        it('should exit', () => {
            expect(process.exit).to.have.callCount(1);
            expect(process.exit).to.be.calledWithExactly(0);
        });
    });

    describe('when update called with -v or --verbose flag', () => {
        beforeEach(() => {
            let args = [],
                inputArgs = {};

            inputArgs[_.sample('v', 'verbose')] = common.any.string();

            minimistStub.withArgs(args).returns(inputArgs);

            argumentReader.read(args);
        });

        it('should set verbose flag to true', () => {
            expect(context.put).to.have.callCount(1);
            expect(context.put).to.be.calledWithExactly('verbose', true);
        });
    });

    describe('when update called with -i or --install flag', () => {
        beforeEach(() => {
            let args = [],
                inputArgs = {};

            inputArgs[_.sample('i', 'install')] = common.any.string();

            minimistStub.withArgs(args).returns(inputArgs);

            argumentReader.read(args);
        });


        it('should set verbose flag to true', () => {
            expect(context.put).to.have.callCount(1);
            expect(context.put).to.be.calledWithExactly('install', true);
        });
    });

    describe('when update called with -l or --level flag', () => {
        beforeEach(() => {
            let args = [],
                inputArgs = {};

            inputArgs[_.sample('l', 'level')] = common.any.string();

            minimistStub.withArgs(args).returns(inputArgs);

            argumentReader.read(args);
        });


        it('should set the default logging level', () => {
            expect(logLevel.setLogLevel).to.have.callCount(1);
            expect(logLevel.setLogLevel).to.be.calledWithExactly(logLevel.LOG_LEVEL.ERR);
        });
    });


    describe('when update called with -l or --level flag', () => {
        let selectedLogLevel;

        beforeEach(() => {
            let args = [],
                inputArgs = {};

            selectedLogLevel = _.sample(['TRACE', 'WARN', 'DEBUG', 'ERR']);
            inputArgs[_.sample('l', 'level')] = selectedLogLevel;

            minimistStub.withArgs(args).returns(inputArgs);

            argumentReader.read(args);
        });


        it('should set the default logging level', () => {
            expect(logLevel.setLogLevel).to.have.callCount(1);
            expect(logLevel.setLogLevel).to.be.calledWithExactly(selectedLogLevel);
        });
    });


    describe('when update called with -d or --debug flag', () => {
        beforeEach(() => {
            let args = [],
                inputArgs = {};

            inputArgs[_.sample('d', 'debug')] = common.any.string();

            minimistStub.withArgs(args).returns(inputArgs);

            argumentReader.read(args);
        });


        it('should set the default logging level', () => {
            expect(logLevel.setLogLevel).to.have.callCount(1);
            expect(logLevel.setLogLevel).to.be.calledWithExactly(logLevel.LOG_LEVEL.DEBUG);
        });
    });

    describe('when update called with -t or --trace flag', () => {
        beforeEach(() => {
            let args = [],
                inputArgs = {};

            inputArgs[_.sample('t', 'trace')] = common.any.string();

            minimistStub.withArgs(args).returns(inputArgs);

            argumentReader.read(args);
        });


        it('should set the default logging level', () => {
            expect(logLevel.setLogLevel).to.have.callCount(1);
            expect(logLevel.setLogLevel).to.be.calledWithExactly(logLevel.LOG_LEVEL.TRACE);
        });
    });
});
