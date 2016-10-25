import {execute, executeAndCaptureErrors} from '../../src/utils/shell';
import sh from 'shelljs';
import context from '../../src/utils/context';
import logger from '../../src/utils/logger';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';

import {common} from 'deere-ui-test-utils';

describe('execute', () => {
    var sandbox,
        command,
        expectedOutput,
        expectedErrorOutput,
        actualOutput;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        expectedOutput = common.any.string();
        expectedErrorOutput = common.any.string();
        sandbox.stub(sh, 'exec').returns({
            stdout: expectedOutput,
            stderr: expectedErrorOutput
        });

        sandbox.stub(logger, 'trace');
        sandbox.stub(context, 'get');

        command = 'pwd';
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('when executing', () => {
        describe('when verbose', () => {
            beforeEach(() => {
                context.get.withArgs('verbose').returns(true);
                actualOutput = execute(command);
            });

            it('should execute a command using a shell runner and spit the stdout back to the calling function', () => {
                expect(sh.exec).to.have.callCount(1);
                expect(sh.exec).to.be.calledWithExactly(command, {});

                expect(actualOutput).to.equal(expectedOutput);
            });

            it('should log', () => {
                expect(logger.trace).to.have.callCount(1);
                expect(logger.trace).to.be.calledWithExactly('command: ' + command);
            });
        });

        describe('when silent', () => {
            beforeEach(() => {
                context.get.withArgs('verbose').returns(false);

                actualOutput = execute(command);
            });

            it('should execute a command using a shell runner and spit the stdout back to the calling function', () => {
                expect(sh.exec).to.have.callCount(1);
                expect(sh.exec).to.be.calledWithExactly(command, {silent: true});

                expect(actualOutput).to.equal(expectedOutput);
            });

            it('should log', () => {
                expect(logger.trace).to.have.callCount(1);
                expect(logger.trace).to.be.calledWithExactly('command: ' + command);
            });
        });
    });

    describe('when executing and capturing errors', () => {
        describe('when verbose', () => {
            beforeEach(() => {
                context.get.withArgs('verbose').returns(true);
                actualOutput = executeAndCaptureErrors(command);
            });

            it('should execute a command using a shell runner and spit the stdout back to the calling function', () => {
                expect(sh.exec).to.have.callCount(1);
                expect(sh.exec).to.be.calledWithExactly(command, {});

                expect(actualOutput).to.deep.equal({
                    results: expectedOutput,
                    error: expectedErrorOutput
                });
            });

            it('should log', () => {
                expect(logger.trace).to.have.callCount(1);
                expect(logger.trace).to.be.calledWithExactly('command: ' + command);
            });
        });

        describe('when silent', () => {
            beforeEach(() => {
                context.get.withArgs('verbose').returns(false);

                actualOutput = executeAndCaptureErrors(command);
            });

            it('should execute a command using a shell runner and spit the stdout back to the calling function', () => {
                expect(sh.exec).to.have.callCount(1);
                expect(sh.exec).to.be.calledWithExactly(command, {silent: true});

                expect(actualOutput).to.deep.equal({
                    results: expectedOutput,
                    error: expectedErrorOutput
                });
            });

            it('should log', () => {
                expect(logger.trace).to.have.callCount(1);
                expect(logger.trace).to.be.calledWithExactly('command: ' + command);
            });
        });
    });
});
