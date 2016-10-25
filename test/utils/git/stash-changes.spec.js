var stashChanges;

import shell from '../../../src/utils/shell';
import logger from '../../../src/utils/logger';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';
import proxyquire from 'proxyquire';


describe('stashChanges', () => {
    var sandbox;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        sandbox.stub(shell, 'execute');
        sandbox.stub(logger, 'debug');

        stashChanges = proxyquire('../../../src/utils/git/stash-changes', {});
    });

    afterEach(() => {
        sandbox.restore();
    });


    describe('when stashing Changes', () => {
        describe('when there is something to stash', () => {
            beforeEach(() => {
                shell.execute.withArgs('git status | grep -c \'nothing to commit\'').returns('0');

                stashChanges();
            });

            it('should stash the changes', () => {
                expect(shell.execute).to.have.callCount(2);
                expect(shell.execute).to.be.calledWithExactly('git status | grep -c \'nothing to commit\'');
                expect(shell.execute).to.be.calledWithExactly('git stash save \'update-script-wip\'');
            });

            it('should Not indicate that we have stashed changes', () => {
                expect(logger.debug).to.have.callCount(1);
                expect(logger.debug).to.be.calledWithExactly('Stashing your changes');
            });
        });

        describe('when there is nothing to stash', () => {
            beforeEach(() => {
                shell.execute.withArgs('git status | grep -c \'nothing to commit\'').returns('1\n');

                stashChanges();
            });

            it('should not stash the changes', () => {
                expect(shell.execute).to.have.callCount(1);
            });

            it('should Not indicate that we have stashed changes', () => {
                expect(logger.debug).to.have.callCount(0);
            });
        });
    });
});
