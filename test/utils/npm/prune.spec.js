var prune;

import shell from '../../../src/utils/shell';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';

import proxyquire from 'proxyquire';

describe('prune', () => {
    let sandbox;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        sandbox.stub(shell, 'execute');

        prune = proxyquire('../../../src/utils/npm/prune', {});
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('when pruning', () => {
        beforeEach(() => {
            prune();
        });

        it('should shell out and prune', () => {
            expect(shell.execute).to.have.callCount(1);
            expect(shell.execute).to.be.calledWithExactly('npm prune');
        });
    });
});
