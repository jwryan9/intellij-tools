var update;

import logger from '../../../src/utils/logger';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';

import proxyquire from 'proxyquire';

import {common} from 'deere-ui-test-utils';

describe('update', () => {
    let sandbox,
        givenBranchName,

        fetchStub,
        getBranchNameStub,
        popChangesStub,
        updateMasterStub,
        updateOriginalBranchFromMasterStub,
        stashChangesStub;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        givenBranchName = common.any.string();

        sandbox.stub(logger, 'debug');


        fetchStub = sandbox.stub();
        getBranchNameStub = sandbox.stub().returns(givenBranchName);
        popChangesStub = sandbox.stub();
        stashChangesStub = sandbox.stub();
        updateMasterStub = sandbox.stub();
        updateOriginalBranchFromMasterStub = sandbox.stub();
        update = proxyquire('../../../src/utils/git/update', {
            './fetch': fetchStub,
            './get-branch-name': getBranchNameStub,
            './pop-changes': popChangesStub,
            './stash-changes': stashChangesStub,
            './update-original-branch-from-master': updateOriginalBranchFromMasterStub,
            './update-master': updateMasterStub
        });
    });

    afterEach(() => {
        sandbox.restore();
    });


    describe('when fetching from upstream', () => {
        beforeEach(() => {
            update();
        });

        it('should get branch names', () => {
            expect(getBranchNameStub).to.have.callCount(1);
            expect(getBranchNameStub).to.be.calledWithExactly();

            expect(logger.debug).to.have.callCount(1);
            expect(logger.debug).to.be.calledWithExactly('Starting Branch: ' + givenBranchName);
        });

        it('should stash changes', () => {
            expect(stashChangesStub).to.have.callCount(1);
            expect(stashChangesStub).to.be.calledWithExactly();

            expect(updateMasterStub).to.be.calledAfter(getBranchNameStub);
        });

        it('should fetch latest on master branch', () => {
            expect(fetchStub).to.have.callCount(1);
            expect(fetchStub).to.be.calledWithExactly();

            expect(updateMasterStub).to.be.calledAfter(getBranchNameStub);
            expect(updateMasterStub).to.be.calledAfter(stashChangesStub);
        });

        it('should update master', () => {
            expect(updateMasterStub).to.have.callCount(1);
            expect(updateMasterStub).to.be.calledWithExactly();

            expect(updateMasterStub).to.be.calledAfter(getBranchNameStub);
            expect(updateMasterStub).to.be.calledAfter(stashChangesStub);
            expect(updateMasterStub).to.be.calledAfter(fetchStub);
        });

        it('should update original branch from master', () => {
            expect(updateOriginalBranchFromMasterStub).to.have.callCount(1);
            expect(updateOriginalBranchFromMasterStub).to.be.calledWithExactly(givenBranchName);

            expect(updateOriginalBranchFromMasterStub).to.be.calledAfter(getBranchNameStub);
            expect(updateOriginalBranchFromMasterStub).to.be.calledAfter(stashChangesStub);
            expect(updateOriginalBranchFromMasterStub).to.be.calledAfter(fetchStub);
            expect(updateOriginalBranchFromMasterStub).to.be.calledAfter(updateMasterStub);
        });

        it('should pop stashes', () => {
            expect(popChangesStub).to.have.callCount(1);
            expect(popChangesStub).to.be.calledWithExactly();

            expect(popChangesStub).to.be.calledAfter(getBranchNameStub);
            expect(popChangesStub).to.be.calledAfter(stashChangesStub);
            expect(popChangesStub).to.be.calledAfter(fetchStub);
            expect(popChangesStub).to.be.calledAfter(updateMasterStub);
            expect(popChangesStub).to.be.calledAfter(updateOriginalBranchFromMasterStub);
        });
    });
});
