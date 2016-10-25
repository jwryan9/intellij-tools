var updateOriginalBranchFromMaster;

import shell from '../../../src/utils/shell';
import logger from '../../../src/utils/logger';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';
import proxyquire from 'proxyquire';
import {common} from 'deere-ui-test-utils';

describe('updateOriginalBranchFromMaster', () => {
    let sandbox;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        sandbox.stub(shell, 'execute');
        sandbox.stub(logger, 'debug');
        sandbox.stub(logger, 'err');
        sandbox.stub(process, 'exit');

        updateOriginalBranchFromMaster = proxyquire('../../../src/utils/git/update-original-branch-from-master', {});
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('when updating original branch from master', () => {
        let givenBranchName;

        beforeEach(() => {
            givenBranchName = common.any.string();
            updateOriginalBranchFromMaster(givenBranchName);
        });

        it('should log', () => {
            expect(logger.debug).to.have.callCount(1);
            expect(logger.debug).to.be.calledWithExactly('Rebasing original branch from local master');
        });

        it('should update', () => {
            expect(shell.execute).to.have.callCount(2);
            expect(shell.execute).to.be.calledWithExactly('git checkout ' + givenBranchName);
            expect(shell.execute).to.be.calledWithExactly('git rebase master');
        });
    });

    describe('when updating original branch from master with conflicts', () => {
        let givenBranchName;

        beforeEach(() => {
            shell.execute
                .withArgs('git rebase master')
                .returns(common.any.string() + 'CONFLICT' + common.any.string());

            givenBranchName = common.any.string();
            updateOriginalBranchFromMaster(givenBranchName);
        });

        it('should log', () => {
            expect(logger.debug).to.have.callCount(1);
            expect(logger.debug).to.be.calledWithExactly('Rebasing original branch from local master');
        });

        it('should update', () => {
            expect(shell.execute).to.have.callCount(2);
            expect(shell.execute).to.be.calledWithExactly('git checkout ' + givenBranchName);
            expect(shell.execute).to.be.calledWithExactly('git rebase master');
        });

        it('should log', () => {
            expect(logger.err).to.have.callCount(1);
            expect(logger.err).to.be.calledWithExactly('You have conflicts that need addressing.');
        });

        it('should exit', () => {
            expect(process.exit).to.have.callCount(1);
            expect(process.exit).to.be.calledWithExactly(1);
        });
    });
});
