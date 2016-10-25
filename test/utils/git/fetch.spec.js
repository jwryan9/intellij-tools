var fetch;

import shell from '../../../src/utils/shell';
import logger from '../../../src/utils/logger';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';
import proxyquire from 'proxyquire';


describe('fetch', () => {
    let sandbox,
        remoteCheckStub;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        sandbox.stub(shell, 'execute');
        sandbox.stub(logger, 'debug');

        remoteCheckStub = sandbox.stub();
        fetch = proxyquire('../../../src/utils/git/fetch', {
            './remote-check': remoteCheckStub
        });
    });

    afterEach(() => {
        sandbox.restore();
    });


    describe('when fetching from upstream', () => {
        beforeEach(() => {
            remoteCheckStub.returns(true);

            fetch();
        });

        it('should check the remote status', () => {
            expect(shell.execute).to.have.callCount(1);
            expect(shell.execute).to.be.calledWithExactly('git fetch upstream');
        });

        it('should log', () => {
            expect(logger.debug).to.have.callCount(1);
            expect(logger.debug).to.be.calledWithExactly('fetching from upstream');
        });
    });

    describe('when fetching from local', () => {
        beforeEach(() => {
            remoteCheckStub.returns(false);

            fetch();
        });

        it('should check the remote status', () => {
            expect(shell.execute).to.have.callCount(1);
            expect(shell.execute).to.be.calledWithExactly('git fetch');
        });

        it('should log', () => {
            expect(logger.debug).to.have.callCount(1);
            expect(logger.debug).to.be.calledWithExactly('fetching from origin');
        });
    });
});
