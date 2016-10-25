var popChanges;

import shell from '../../../src/utils/shell';
import logger from '../../../src/utils/logger';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';
import proxyquire from 'proxyquire';
import {common} from 'deere-ui-test-utils';
import _ from 'lodash';

describe('popChanges', () => {
    var sandbox;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        sandbox.stub(shell, 'execute');
        sandbox.stub(logger, 'debug');

        popChanges = proxyquire('../../../src/utils/git/pop-changes', {});
    });

    afterEach(() => {
        sandbox.restore();
    });


    describe('when popping stashed Changes', () => {
        function generateStashes() {
            let stashes = [];

            _.times(common.any.integer(2, 10), () => {
                stashes.push('stash@{' + common.any.string() + '}: ' + common.any.string() + ': ' + common.any.string());
            });

            return stashes;
        }

        describe('when last stash was from update script', () => {
            let stashedItemNumber;

            beforeEach(() => {
                stashedItemNumber = common.any.string();

                let stashes = generateStashes();
                stashes.push('stash@{' + stashedItemNumber + '}: ' + common.any.string() + ': ' + 'update-script-wip');
                stashes.reverse();

                shell.execute.withArgs('git stash list').returns(stashes.join('\n'));

                popChanges();
            });

            it('should pop the stashed changes', () => {
                expect(shell.execute).to.have.callCount(2);
                expect(shell.execute).to.be.calledWithExactly('git stash list');
                expect(shell.execute).to.be.calledWithExactly('git stash pop stash@{' + stashedItemNumber + '}');
            });

            it('should log', () => {
                expect(logger.debug).to.have.callCount(1);
                expect(logger.debug).to.be.calledWithExactly('Popping stashed changes');
            });
        });

        describe('when the last change was not a update script stash', () => {
            beforeEach(() => {
                shell.execute.withArgs('git stash list').returns(generateStashes().join('\n'));

                popChanges();
            });

            it('should not pop the last change', () => {
                expect(shell.execute).to.have.callCount(1);
                expect(shell.execute).to.be.calledWithExactly('git stash list');
            });

            it('should log', () => {
                expect(logger.debug).to.have.callCount(0);
            });
        });
    });
});
