var updateMaster;

import shell from '../../../src/utils/shell';
import logger from '../../../src/utils/logger';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';
import proxyquire from 'proxyquire';
import {common} from 'deere-ui-test-utils';

describe('updateMaster', () => {
    let sandbox,
        remoteCheckStub;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        sandbox.stub(shell, 'execute');
        sandbox.stub(logger, 'debug');
        sandbox.stub(logger, 'err');
        sandbox.stub(process, 'exit');

        remoteCheckStub = sandbox.stub();
        updateMaster = proxyquire('../../../src/utils/git/update-master', {
            './remote-check': remoteCheckStub
        });
    });

    afterEach(() => {
        sandbox.restore();
    });


    describe('when updating master from upstream', () => {
        beforeEach(() => {
            remoteCheckStub.returns(true);

            updateMaster();
        });

        it('should log', () => {
            expect(logger.debug).to.have.callCount(1);
            expect(logger.debug).to.be.calledWithExactly('Updating the master branch');
        });

        it('should check the remote status', () => {
            expect(shell.execute).to.have.callCount(3);
            expect(shell.execute).to.be.calledWithExactly('git checkout master');
            expect(shell.execute).to.be.calledWithExactly('git rebase upstream/master');
            expect(shell.execute).to.be.calledWithExactly('git push origin master');
        });
    });


    describe('when updating master with conflicts', () => {
        beforeEach(() => {
            remoteCheckStub.returns(true);

            shell.execute
                .withArgs('git rebase upstream/master')
                .returns(common.any.string() + 'CONFLICT' + common.any.string());

            updateMaster();
        });

        it('should log', () => {
            expect(logger.debug).to.have.callCount(1);
            expect(logger.debug).to.be.calledWithExactly('Updating the master branch');
        });

        it('should check the remote status', () => {
            expect(shell.execute).to.have.callCount(2);
            expect(shell.execute).to.be.calledWithExactly('git checkout master');
            expect(shell.execute).to.be.calledWithExactly('git rebase upstream/master');
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

    describe('when updating master from local', () => {
        beforeEach(() => {
            remoteCheckStub.returns(false);

            updateMaster();
        });

        it('should check the remote status', () => {
            expect(shell.execute).to.have.callCount(2);
            expect(shell.execute).to.be.calledWithExactly('git checkout master');
            expect(shell.execute).to.be.calledWithExactly('git pull -r');
        });
    });

    describe('when updating master from local with merge conflicts', () => {
        beforeEach(() => {
            remoteCheckStub.returns(false);

            shell.execute
                .withArgs('git pull -r')
                .returns(common.any.string() + 'CONFLICT' + common.any.string());

            updateMaster();
        });

        it('should check the remote status', () => {
            expect(shell.execute).to.have.callCount(2);
            expect(shell.execute).to.be.calledWithExactly('git checkout master');
            expect(shell.execute).to.be.calledWithExactly('git pull -r');
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
