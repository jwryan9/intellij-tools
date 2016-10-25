var chance,
    ensureOnMaster;

import shell from '../../../src/utils/shell';
import logger from '../../../src/utils/logger';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';
import proxyquire from 'proxyquire';
import Chance from 'chance';
chance = new Chance();

const GET_CURRENT_BRANCH_NAME_CMD = 'git rev-parse --symbolic-full-name --abbrev-ref HEAD',
    FIRST_CALL_TO_GET_BRANCH_NAME = 0,
    SECOND_CALL_TO_GET_BRANCH_NAME = 2;

describe('ensureOnMaster', () => {
    let sandbox;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        sandbox.stub(shell, 'execute');
        sandbox.stub(logger, 'err');

        ensureOnMaster = proxyquire('../../../src/utils/git/ensure-on-master', {});
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('when not on master but gets to master', () => {
        beforeEach(() => {
            shell.execute
                .onCall(FIRST_CALL_TO_GET_BRANCH_NAME)
                .returns(chance.string());
            shell.execute
                .onCall(SECOND_CALL_TO_GET_BRANCH_NAME)
                .returns('master');

            ensureOnMaster();
        });

        it('should execute shell commands', () => {
            expect(shell.execute).to.have.callCount(3);
        });

        it('should try to switch to master', () => {
            expect(shell.execute).to.be.calledWithExactly(GET_CURRENT_BRANCH_NAME_CMD);
            expect(shell.execute).to.be.calledWithExactly('git checkout master');
        });
    });

    describe('when not on master but gets to master and string contains a newline character', () => {
        beforeEach(() => {
            shell.execute
                .onCall(FIRST_CALL_TO_GET_BRANCH_NAME)
                .returns(chance.string());
            shell.execute
                .onCall(SECOND_CALL_TO_GET_BRANCH_NAME)
                .returns('master\n');

            ensureOnMaster();
        });

        it('should execute shell commands', () => {
            expect(shell.execute).to.have.callCount(3);
        });

        it('should try to switch to master', () => {
            expect(shell.execute).to.be.calledWithExactly(GET_CURRENT_BRANCH_NAME_CMD);
            expect(shell.execute).to.be.calledWithExactly('git checkout master');
            expect(logger.err).to.have.callCount(0);
        });
    });

    describe('when not on master but cannot get to master', () => {
        beforeEach(() => {
            shell.execute
                .withArgs(GET_CURRENT_BRANCH_NAME_CMD)
                .returns(chance.string());

            ensureOnMaster();
        });

        it('should execute shell commands', () => {
            expect(shell.execute).to.have.callCount(3);
        });

        it('should try to switch to master', () => {
            expect(shell.execute).to.be.calledWithExactly(GET_CURRENT_BRANCH_NAME_CMD);
            expect(shell.execute).to.be.calledWithExactly('git checkout master');
            shell.execute.reset();
            expect(logger.err).to.have.callCount(1);
            expect(logger.err).to.be.calledWithExactly('Could not get to Master branch. Please manually intervene.');
        });
    });

    describe('when fetching from local', () => {
        beforeEach(() => {
            shell.execute
                .withArgs(GET_CURRENT_BRANCH_NAME_CMD)
                .returns('master');

            ensureOnMaster();
        });

        it('should check the remote status', () => {
            expect(shell.execute).to.have.callCount(1);
            expect(shell.execute).to.be.calledWithExactly(GET_CURRENT_BRANCH_NAME_CMD);
        });
    });
});
