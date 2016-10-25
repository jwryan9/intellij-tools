var getBranchName;

import shell from '../../../src/utils/shell';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';
import proxyquire from 'proxyquire';

describe('getBranchName', () => {
    var sandbox;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        sandbox.stub(shell, 'execute');

        getBranchName = proxyquire('../../../src/utils/git/get-branch-name', {});
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('when getting the branch name', () => {
        beforeEach(() => {
            getBranchName();
        });

        it('should get the branch name', () => {
            expect(shell.execute).to.have.callCount(1);
            expect(shell.execute).to.be.calledWithExactly('git rev-parse --symbolic-full-name --abbrev-ref HEAD');
        });
    });
});
