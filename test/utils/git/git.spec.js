var git;

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';
import proxyquire from 'proxyquire';

describe('git', () => {
    let sandbox,
        dbdStub,
        ensureOnMasterStub,
        fetchStub,
        getBranchNameStub,
        popChangesStub,
        updateMasterStub,
        updateOriginalBranchFromMasterStub,
        stashChangesStub,
        updateStub;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        dbdStub = sandbox.stub();
        ensureOnMasterStub = sandbox.stub();
        fetchStub = sandbox.stub();
        getBranchNameStub = sandbox.stub();
        popChangesStub = sandbox.stub();
        stashChangesStub = sandbox.stub();
        updateMasterStub = sandbox.stub();
        updateOriginalBranchFromMasterStub = sandbox.stub();
        updateStub = sandbox.stub();
        git = proxyquire('../../../src/utils/git/git', {
            './die-branches-die': dbdStub,
            './ensure-on-master': ensureOnMasterStub,
            './fetch': fetchStub,
            './get-branch-name': getBranchNameStub,
            './pop-changes': popChangesStub,
            './stash-changes': stashChangesStub,
            './update-original-branch-from-master': updateOriginalBranchFromMasterStub,
            './update-master': updateMasterStub,
            './update': updateStub
        });
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('killing unused branches', () => {
        beforeEach(() => {
            git.dieBranchesDie();
        });

        it('should call to kill branches', () => {
            expect(dbdStub).to.have.callCount(1);
            expect(dbdStub).to.be.calledWithExactly();
        });
    });
    describe('fetching', () => {
        beforeEach(() => {
            git.fetch();
        });

        it('should call to fetch', () => {
            expect(fetchStub).to.have.callCount(1);
            expect(fetchStub).to.be.calledWithExactly();
        });
    });

    describe('getting branch name', () => {
        beforeEach(() => {
            git.getBranchName();
        });

        it('should call to get branch name', () => {
            expect(getBranchNameStub).to.have.callCount(1);
            expect(getBranchNameStub).to.be.calledWithExactly();
        });
    });

    describe('popping changes', () => {
        beforeEach(() => {
            git.popChanges();
        });

        it('should call to pop changes', () => {
            expect(popChangesStub).to.have.callCount(1);
            expect(popChangesStub).to.be.calledWithExactly();
        });
    });

    describe('stashing changes', () => {
        beforeEach(() => {
            git.stashChanges();
        });

        it('should call to stash changes', () => {
            expect(stashChangesStub).to.have.callCount(1);
            expect(stashChangesStub).to.be.calledWithExactly();
        });
    });

    describe('update master', () => {
        beforeEach(() => {
            git.updateMaster();
        });

        it('should call to smart rebase', () => {
            expect(updateMasterStub).to.have.callCount(1);
            expect(updateMasterStub).to.be.calledWithExactly();
        });
    });

    describe('update Original Branch From Master', () => {
        beforeEach(() => {
            git.updateOriginalBranchFromMaster();
        });

        it('should call to smart rebase', () => {
            expect(updateOriginalBranchFromMasterStub).to.have.callCount(1);
            expect(updateOriginalBranchFromMasterStub).to.be.calledWithExactly();
        });
    });

    describe('update', () => {
        beforeEach(() => {
            git.update();
        });

        it('should call to update', () => {
            expect(updateStub).to.have.callCount(1);
            expect(updateStub).to.be.calledWithExactly();
        });
    });

    describe('ensure on master', () => {
        beforeEach(() => {
            git.ensureOnMaster();
        });

        it('should ensure on master', () => {
            expect(ensureOnMasterStub).to.have.callCount(1);
            expect(ensureOnMasterStub).to.be.calledWithExactly();
        });
    });
});
