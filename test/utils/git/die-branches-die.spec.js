var chance,
    dieBranchesDie;

import shell from '../../../src/utils/shell';
import logger from '../../../src/utils/logger';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';
import proxyquire from 'proxyquire';
import _ from 'lodash';

import Chance from 'chance';
chance = new Chance();

describe('dieBranchesDie', () => {
    var sandbox,
        givenBranchName,

        ensureOnMasterStub,
        fetchStub,
        getBranchNameStub,
        popChangesStub,
        stashChangesStub;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        givenBranchName = chance.string();

        sandbox.stub(shell, 'execute');
        sandbox.stub(logger, 'debug');
        ensureOnMasterStub = sandbox.stub();
        fetchStub = sandbox.stub();
        getBranchNameStub = sandbox.stub().returns(givenBranchName);
        popChangesStub = sandbox.stub();
        stashChangesStub = sandbox.stub();

        dieBranchesDie = proxyquire('../../../src/utils/git/die-branches-die', {
            './ensure-on-master': ensureOnMasterStub,
            './fetch': fetchStub,
            './get-branch-name': getBranchNameStub,
            './pop-changes': popChangesStub,
            './stash-changes': stashChangesStub
        });
    });

    afterEach(() => {
        sandbox.restore();
    });


    describe('when killing old branches', () => {
        function generateOldBranches() {
            let oldBranches = [];

            _.times(chance.integer({min: 2, max: 10}), () => {
                oldBranches.push(chance.word());
            });

            return oldBranches;
        }

        describe('when invoking with no branches to delete', () => {
            beforeEach(() => {
                shell.execute.withArgs('git branch --merged | grep -v \'master\'').returns('');

                dieBranchesDie();
            });

            it('should call to execute', () => {
                expect(shell.execute).to.have.callCount(2);
            });

            it('should log', () => {
                expect(logger.debug).to.have.callCount(1);
                expect(logger.debug).to.be.calledWithExactly('removing old branches');
            });

            it('ensure on master', () => {
                expect(ensureOnMasterStub).to.be.calledWithExactly();
            });

            it('should remove cached copies of branches no longer on remote.', () => {
                expect(fetchStub).to.have.callCount(1);
                expect(fetchStub).to.be.calledWithExactly();
                expect(shell.execute.withArgs('git remote prune origin')).to.be.calledAfter(fetchStub);
            });
        });

        describe('when invoking with branches to delete', () => {
            let oldBranches;

            beforeEach(() => {
                oldBranches = generateOldBranches();

                shell.execute.withArgs('git branch --merged | grep -v \'master\'').returns(oldBranches.join('\n'));

                dieBranchesDie();
            });

            it('should call to execute', () => {
                expect(shell.execute).to.have.callCount(2 + oldBranches.length);
            });

            it('should log', () => {
                expect(logger.debug).to.have.callCount(1);
                expect(logger.debug).to.be.calledWithExactly('removing old branches');
            });

            it('ensure on master', () => {
                expect(ensureOnMasterStub).to.be.calledWithExactly();
            });

            it('should remove cached copies of branches no longer on remote.', () => {
                expect(fetchStub).to.have.callCount(1);
                expect(fetchStub).to.be.calledWithExactly();
                expect(shell.execute.withArgs('git remote prune origin')).to.be.calledAfter(fetchStub);
            });

            it('should remove branches that have been merged into master', () => {
                expect(shell.execute).to.be.calledWithExactly('git branch --merged | grep -v \'master\'');

                oldBranches.map((branch) => {
                    expect(shell.execute).to.be.calledWithExactly('git branch -d ' + branch);
                });
            });
        });
    });
});
