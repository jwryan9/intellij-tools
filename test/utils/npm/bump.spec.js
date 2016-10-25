var bump;

import shell from '../../../src/utils/shell';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';

import proxyquire from 'proxyquire';

describe('bump', () => {
    let sandbox;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        sandbox.stub(shell, 'execute');

        bump = proxyquire('../../../src/utils/npm/bump', {});
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('when bumping', () => {
        beforeEach(() => {
            bump();
        });

        it('should shell out and bump', () => {
            expect(shell.execute).to.have.callCount(1);
            expect(shell.execute).to.be.calledWithExactly('npm run-script bump');
        });
    });
});
