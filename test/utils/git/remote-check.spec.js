var remoteCheck;

import shell from '../../../src/utils/shell';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';
import proxyquire from 'proxyquire';
import {common} from 'deere-ui-test-utils';
import _ from 'lodash';

describe('remoteCheck', () => {
    let sandbox,
        actualResult;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        sandbox.stub(shell, 'execute');

        remoteCheck = proxyquire('../../../src/utils/git/remote-check', {});
    });

    afterEach(() => {
        sandbox.restore();
    });


    describe('when fetching from upstream', () => {
        beforeEach(() => {
            shell.execute
                .withArgs('git remote -v | sed -e \'s/\s.*$//\' | wc -l')
                .returns(common.any.integer(3));

            actualResult = remoteCheck();
        });

        it('should check the remote status', () => {
            expect(shell.execute).to.have.callCount(1);
            expect(shell.execute).to.be.calledWithExactly('git remote -v | sed -e \'s/\s.*$//\' | wc -l');

            expect(actualResult).to.equal(true);
        });
    });

    describe('when fetching from local', () => {
        beforeEach(() => {
            shell.execute
                .withArgs('git remote -v | sed -e \'s/\s.*$//\' | wc -l')
                .returns(_.sample([0, 1, 2]));

            actualResult = remoteCheck();
        });

        it('should check the remote status', () => {
            expect(shell.execute).to.have.callCount(1);
            expect(shell.execute).to.be.calledWithExactly('git remote -v | sed -e \'s/\s.*$//\' | wc -l');

            expect(actualResult).to.equal(false);
        });
    });
});
