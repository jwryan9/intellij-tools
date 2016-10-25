var bump,
    chance;


import shell from '../../../src/utils/shell';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';

import proxyquire from 'proxyquire';

import Chance from 'chance';
chance = new Chance();

describe('bump', () => {
    let sandbox;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        sandbox.stub(shell, 'execute');

        bump = proxyquire('../../../src/utils/gulp/bump', {});
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('when bumping', () => {
        var expectedBumpType;

        beforeEach(() => {
            expectedBumpType = chance.string();
            bump(expectedBumpType);
        });

        it('should shell out and bump', () => {
            expect(shell.execute).to.have.callCount(1);
            expect(shell.execute).to.be.calledWithExactly('gulp bump:' + expectedBumpType);
        });
    });
});
